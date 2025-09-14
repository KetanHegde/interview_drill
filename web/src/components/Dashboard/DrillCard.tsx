import React from "react";
import { useNavigate } from "react-router-dom";
import { Drill } from "../../types/drill";
import { FiTarget, FiTag, FiArrowRight } from "react-icons/fi";

interface DrillCardProps {
  drill: Drill;
}

const DrillCard: React.FC<DrillCardProps> = ({ drill }) => {
  const navigate = useNavigate();

  const getDifficultyConfig = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          border: "border-emerald-200",
          ring: "ring-emerald-100",
        };
      case "medium":
        return {
          bg: "bg-amber-50",
          text: "text-amber-700",
          border: "border-amber-200",
          ring: "ring-amber-100",
        };
      case "hard":
        return {
          bg: "bg-red-50",
          text: "text-red-700",
          border: "border-red-200",
          ring: "ring-red-100",
        };
      default:
        return {
          bg: "bg-slate-50",
          text: "text-slate-700",
          border: "border-slate-200",
          ring: "ring-slate-100",
        };
    }
  };

  const difficultyConfig = getDifficultyConfig(drill.difficulty);

  return (
    <div className="group relative bg-white/80 backdrop-blur-sm border border-slate-300 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 p-6 overflow-hidden hover:-translate-y-1">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent pointer-events-none" />

      {/* Content container */}
      <div className="relative z-10">
        {/* Header section */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-slate-900 mb-3 line-clamp-2 group-hover:text-slate-800 transition-colors">
              {drill.title}
            </h3>

            <div className="flex items-center gap-3 mb-4">
              <span
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border ${difficultyConfig.bg} ${difficultyConfig.text} ${difficultyConfig.border}`}
              >
                {drill.difficulty.charAt(0).toUpperCase() +
                  drill.difficulty.slice(1)}
              </span>

              <div className="flex items-center gap-1.5 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full">
                <FiTarget className="w-4 h-4" />
                <span className="font-medium">{drill.questions.length}</span>
                <span className="text-slate-500">questions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tags section */}
        <div className="flex flex-wrap gap-2 mb-6">
          {drill.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50/80 border border-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors hover:bg-blue-100/80"
            >
              <FiTag className="w-3.5 h-3.5" />
              {tag}
            </span>
          ))}
        </div>

        {/* Action button */}
        <button
          className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group/btn shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/30"
          onClick={() => navigate(`/drill/${drill._id}`)}
        >
          <span>Start Drill</span>
          <FiArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};

export default DrillCard;
