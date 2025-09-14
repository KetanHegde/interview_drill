const Attempt = require("../models/Attempt");
const Drill = require("../models/Drill");

exports.submitAttempt = async (req, res) => {
  try {
    const { drillId, answers } = req.body;

    const drill = await Drill.findById(drillId);
    if (!drill) {
      return res.status(404).json({ message: "Drill not found" });
    }

    // 2. CALCULATE SCORE BEFORE SAVING
    const score = calculateScore(drill, answers);

    // 3. CREATE ATTEMPT WITH CALCULATED SCORE
    const attempt = await Attempt.create({
      userId: req.user.id,
      drillId,
      answers,
      score,
      createdAt: new Date(),
    });

    // await attempt.populate("drillId", "title difficulty");

    res.status(201).json(attempt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SCORING FUNCTION - ADD THIS
const calculateScore = (drill, answers) => {
  let totalKeywords = 0;
  let matchedKeywords = 0;

  // For each question in the drill
  drill.questions.forEach((question) => {
    // Find user's answer for this question
    const userAnswer = answers.find((a) => a.qid === question.id);

    if (userAnswer) {
      totalKeywords += question.keywords.length;

      // Case-insensitive keyword matching
      const answerText = userAnswer.text.toLowerCase();
      question.keywords.forEach((keyword) => {
        if (answerText.includes(keyword.toLowerCase())) {
          matchedKeywords++;
        }
      });
    }
  });

  // Score = % keywords hit across 5 questions
  return totalKeywords > 0
    ? Math.round((matchedKeywords / totalKeywords) * 100)
    : 0;
};

exports.getAttempts = async (req, res) => {
  const limit = parseInt(req.query.limit) || 5;
  const attempts = await Attempt.find({ userId: req.user.id })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate("drillId", "title");
  res.json(attempts);
};
