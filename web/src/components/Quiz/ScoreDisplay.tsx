import React from "react";
import { Attempt, Drill } from "../../types/drill";
import { FiTrendingUp, FiRefreshCw, FiHome, FiTarget } from "react-icons/fi";

interface ScoreDisplayProps {
  attempt: Attempt;
  drill: Drill;
  onRetry: () => void;
  onBackToDashboard: () => void;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  attempt,
  drill,
  onRetry,
  onBackToDashboard,
}) => {
  const getScoreColor = (score: number): string => {
    if (score >= 80) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = (score: number): string => {
    if (score >= 90) return "Outstanding! 🎉";
    if (score >= 80) return "Great job! 👏";
    if (score >= 70) return "Good work! 👍";
    if (score >= 60) return "Not bad! 👌";
    if (score >= 50) return "Keep trying! 💪";
    return "Need more practice! 📚";
  };

  const getPerformanceFeedback = (score: number): string => {
    if (score >= 80)
      return "You demonstrated excellent understanding of the concepts.";
    if (score >= 60)
      return "You showed good knowledge with room for improvement.";
    return "Consider reviewing the topics and trying again.";
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        {/* Score Circle */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary-50 to-primary-100 mb-4">
            <span
              className={`text-4xl font-bold ${getScoreColor(attempt.score)}`}
            >
              {attempt.score}%
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {getScoreMessage(attempt.score)}
          </h1>
          <p className="text-gray-600">
            {getPerformanceFeedback(attempt.score)}
          </p>
        </div>

        {/* Quiz Info */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {drill.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center justify-center gap-2">
              <FiTarget className="w-5 h-5 text-primary-600" />
              <div>
                <p className="text-sm text-gray-600">Difficulty</p>
                <p className="font-medium text-gray-900 capitalize">
                  {drill.difficulty}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 flex items-center justify-center text-primary-600">
                📝
              </div>
              <div>
                <p className="text-sm text-gray-600">Questions</p>
                <p className="font-medium text-gray-900">
                  {attempt.answers.length}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FiTrendingUp className="w-5 h-5 text-primary-600" />
              <div>
                <p className="text-sm text-gray-600">Score</p>
                <p className={`font-medium ${getScoreColor(attempt.score)}`}>
                  {attempt.score}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onRetry}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
          >
            <FiRefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <button
            onClick={onBackToDashboard}
            className="flex bg-white items-center justify-center gap-2 px-6 py-3 border border-gray-400 text-black hover:bg-gray-50 rounded-lg font-medium transition-colors"
          >
            <FiHome className="w-4 h-4" />
            Back to Dashboard
          </button>
        </div>

        {/* Timestamp */}
        <div className="mt-6 text-sm text-gray-500">
          Completed on{" "}
          {new Date(attempt.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;
