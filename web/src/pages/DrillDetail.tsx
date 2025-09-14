import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuestionCard from "../components/Quiz/QuestionCard";
import ScoreDisplay from "../components/Quiz/ScoreDisplay";
import Loading from "../components/common/Loading";
import { Drill, Answer, Attempt } from "../types/drill";
import { FiArrowLeft, FiClock, FiTarget } from "react-icons/fi";
import toast from "react-hot-toast";

const DrillDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [drill, setDrill] = useState<Drill | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [result, setResult] = useState<Attempt | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      fetchDrill(id);
    }
  }, [id]);

  const fetchDrill = async (drillId: string): Promise<void> => {
    try {
      const response = await fetch(`/api/drills/${drillId}`);
      if (!response.ok) {
        throw new Error("Drill not found");
      }
      const drillData: Drill = await response.json();
      setDrill(drillData);

      // Initialize answers array
      const initialAnswers: Answer[] = drillData.questions.map((q) => ({
        qid: q.id,
        text: "",
      }));
      setAnswers(initialAnswers);
    } catch (error) {
      console.error("Failed to fetch drill:", error);
      toast.error("Failed to load drill");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const updateAnswer = (questionId: string, answerText: string): void => {
    setAnswers((prev) =>
      prev.map((answer) =>
        answer.qid === questionId ? { ...answer, text: answerText } : answer
      )
    );
  };

  const nextQuestion = (): void => {
    if (drill && currentQuestion < drill.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const prevQuestion = (): void => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const submitAttempt = async (): Promise<void> => {
    if (!drill || !id) return;

    // Check if all questions are answered
    const unansweredQuestions = answers.filter(
      (answer) => answer.text.trim() === ""
    );
    if (unansweredQuestions.length > 0) {
      toast.error("Please answer all questions before submitting");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/attempts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          drillId: id,
          answers: answers,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit attempt");
      }

      const attemptResult: Attempt = await response.json();
      setResult(attemptResult);
      toast.success(`Quiz completed! Score: ${attemptResult.score}%`);
    } catch (error) {
      console.error("Failed to submit attempt:", error);
      toast.error("Failed to submit attempt");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loading />;
  if (!drill) return <div>Drill not found</div>;

  if (result) {
    return (
      <div className="max-w-4xl mx-3 my-5 sm:mx-auto">
        <ScoreDisplay
          attempt={result}
          drill={drill}
          onRetry={() => {
            setResult(null);
            setCurrentQuestion(0);
            setAnswers(drill.questions.map((q) => ({ qid: q.id, text: "" })));
          }}
          onBackToDashboard={() => navigate("/dashboard")}
        />
      </div>
    );
  }

  const currentQ = drill.questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-3 my-5 md:mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-600 text-black/80  mb-4 bg-transparent border-0"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {drill.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <FiTarget className="w-4 h-4" />
              <span>{drill.difficulty}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiClock className="w-4 h-4" />
              <span>{drill.questions.length} questions</span>
            </div>
          </div>
          {/* Tips section */}
          <div
            className="bg-blue-50/50 border border-blue-100 rounded-xl mt-4 p-4"
            id="answer-help"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">
                  💡 Pro Tips for Better Scores
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Include specific examples and relevant details</li>
                  <li>• Use key terminology related to the topic</li>
                  <li>• Structure your answer clearly and logically</li>
                  <li>• Keywords are matched case-insensitively</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Question */}
      <QuestionCard
        question={currentQ}
        answer={answers.find((a) => a.qid === currentQ.id)?.text || ""}
        onAnswerChange={(text: string) => updateAnswer(currentQ.id, text)}
        questionNumber={currentQuestion + 1}
        totalQuestions={drill.questions.length}
      />

      {/* Navigation */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className="px-6 py-2 border bg-white border-gray-500 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {currentQuestion === drill.questions.length - 1 ? (
          <button
            onClick={submitAttempt}
            disabled={isSubmitting}
            className="px-8 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Quiz"}
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default DrillDetail;
