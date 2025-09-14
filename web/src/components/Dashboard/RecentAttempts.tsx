import React from "react";
import { Answer } from "../../types/drill";
import {
  FiClock,
  FiTrendingUp,
  FiBookOpen,
} from "react-icons/fi";

interface AttemptResponse {
  _id: string;
  userId: string;
  drillId: {
    title: string;
  };
  answers: Answer[];
  score: number;
  createdAt: string;
}

interface RecentAttemptsProps {
  attempts: AttemptResponse[];
}

const RecentAttempts: React.FC<RecentAttemptsProps> = ({ attempts }) => {

  const getScoreConfig = (score: number) => {
    if (score >= 90)
      return {
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        icon: "🏆",
      };
    if (score >= 80)
      return {
        color: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-200",
        icon: "🎯",
      };
    if (score >= 60)
      return {
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-200",
        icon: "📈",
      };
    return {
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
    };
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 rounded-xl">
            <FiTrendingUp className="w-5 h-5 text-slate-600" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900">
            Recent Attempts
          </h3>
        </div>

      
      </div>

      {/* Content */}
      {attempts.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center">
            <FiBookOpen className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-600 text-lg font-medium mb-2">
            No attempts yet
          </p>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            Start taking drills to track your progress and see your performance
            analytics
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {attempts.slice(0, 5).map((attempt) => {
            const scoreConfig = getScoreConfig(attempt.score);

            return (
              <div
                key={attempt._id}
                className="group flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-xl transition-all duration-200 hover:shadow-sm"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Index indicator */}

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm text-start text-wrap mr-2 font-semibold text-slate-900 mb-1 truncate group-hover:text-slate-800">
                      {attempt.drillId.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <FiClock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs text-slate-500 font-medium">
                        {formatDate(attempt.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score badge */}
                <div
                  className={`flex items-center gap-2 px-2 py-2 rounded-lg border ${scoreConfig.bg} ${scoreConfig.border}`}
                >
                  <span className="text-lg">{scoreConfig.icon}</span>
                  <span className={`text-sm font-bold ${scoreConfig.color}`}>
                    {attempt.score}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentAttempts;
