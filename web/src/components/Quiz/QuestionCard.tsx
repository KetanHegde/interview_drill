import React from "react";
import { Question } from "../../types/drill";
import { FiEdit3, FiTarget } from "react-icons/fi";

interface QuestionCardProps {
  question: Question;
  answer: string;
  onAnswerChange: (answer: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answer,
  onAnswerChange,
  questionNumber,
  totalQuestions,
}) => {
  const progressPercentage = (questionNumber / totalQuestions) * 100;

  return (
    <div className="relative bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Progress bar */}
      <div className="h-1 bg-slate-100">
        <div
          className="h-full bg-gradient-to-r from-slate-900 to-slate-700 transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="p-8">
        {/* Question header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded-xl">
                <FiTarget className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <span className="text-sm font-semibold text-slate-900">
                  Question {questionNumber}
                </span>
                <span className="text-sm text-slate-500 ml-2">
                  of {totalQuestions}
                </span>
              </div>
            </div>
            <div className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
              {Math.round(progressPercentage)}% Complete
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-4">
            {question.prompt}
          </h2>
        </div>

        {/* Answer input section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <FiEdit3 className="w-4 h-4 text-slate-600" />
            <label
              htmlFor="answer"
              className="text-sm font-semibold text-slate-700"
            >
              Your Answer
            </label>
          </div>

          <div className="relative">
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => onAnswerChange(e.target.value)}
              placeholder="Share your thoughts and insights here..."
              className="w-full px-4 py-4 bg-slate-50/50 border border-slate-500 rounded-xl focus:outline-none resize-none text-slate-900 placeholder-slate-400"
              rows={8}
              aria-describedby="answer-help"
            />

            {/* Character count */}
            <div className="absolute bottom-3 right-3 text-xs text-slate-400 bg-white/80 px-2 py-1 rounded-lg">
              {answer.length} characters
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
