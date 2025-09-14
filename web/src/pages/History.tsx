import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import Loading from "../components/common/Loading";
import { Attempt, Drill } from "../types/drill";
import { FiClock, FiFilter } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const History: React.FC = () => {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [filteredAttempts, setFilteredAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<"date" | "score">("date");
  const [filterScore, setFilterScore] = useState<
    "all" | "high" | "medium" | "low"
  >("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAttempts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [attempts, sortBy, filterScore]);

  const fetchAttempts = async (): Promise<void> => {
    try {
      const response = await fetch("/api/attempts?limit=5", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch attempts");
      }

      const attemptsData: Attempt[] = await response.json();
      setAttempts(attemptsData);
    } catch (error) {
      console.error("Failed to fetch attempts:", error);
      toast.error("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (): void => {
    let filtered = [...attempts];

    // Apply score filter
    if (filterScore !== "all") {
      filtered = filtered.filter((attempt) => {
        if (filterScore === "high") return attempt.score >= 80;
        if (filterScore === "medium")
          return attempt.score >= 50 && attempt.score < 80;
        if (filterScore === "low") return attempt.score < 50;
        return true;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else {
        return b.score - a.score;
      }
    });

    setFilteredAttempts(filtered);
  };

  const getScoreColor = (score: number): string => {
    if (score >= 80) return "text-green-600 bg-green-100";
    if (score >= 50) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDrillTitle = (attempt: Attempt): string => {
    if (typeof attempt.drillId === "object" && attempt.drillId !== null) {
      return (attempt.drillId as Drill).title;
    }
    return "Unknown Drill";
  };

  const getDrillDifficulty = (attempt: Attempt): string => {
    if (typeof attempt.drillId === "object" && attempt.drillId !== null) {
      return (attempt.drillId as Drill).difficulty;
    }
    return "";
  };

  if (loading) return <Loading />;

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quiz History</h1>
          <p className="text-gray-600 mt-2">
            Track your progress and review past attempts
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <FiFilter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Filters:
              </span>
            </div>

            <div className="flex flex-col gap-3 md:flex-row">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "date" | "score")}
                className="px-3 py-2 bg-white/80 border border-gray-200 rounded-lg text-sm font-medium shadow-sm 
               text-black focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
               hover:border-gray-400 transition-colors duration-200"
              >
                <option
                  value="date"
                  className="bg-white text-black font-medium py-2 px-3"
                >
                  Sort by Date
                </option>
                <option
                  value="score"
                  className="bg-white text-black font-medium py-2 px-3"
                >
                  Sort by Score
                </option>
              </select>

              <select
                value={filterScore}
                onChange={(e) =>
                  setFilterScore(
                    e.target.value as "all" | "high" | "medium" | "low"
                  )
                }
                className="px-3 py-2 bg-white/80 border border-gray-200 rounded-lg text-sm font-medium shadow-sm 
               text-black focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
               hover:border-gray-400 transition-colors duration-200"
              >
                <option
                  value="all"
                  className="bg-white text-black font-medium py-2 px-3"
                >
                  All Scores
                </option>
                <option
                  value="high"
                  className="bg-white text-black font-medium py-2 px-3"
                >
                  High (80%+)
                </option>
                <option
                  value="medium"
                  className="bg-white text-black font-medium py-2 px-3"
                >
                  Medium (50-79%)
                </option>
                <option
                  value="low"
                  className="bg-white text-black font-medium py-2 px-3"
                >
                  Low (&lt;50%)
                </option>
              </select>
            </div>

            <div className="text-sm text-gray-500">
              Showing latest {filteredAttempts.length} attempts
            </div>
          </div>
        </div>

        {/* Attempts List */}
        <div className="space-y-4 ">
          {filteredAttempts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No attempts found
              </h3>
              <p className="text-gray-600 mb-4">
                Start taking some drills to see your history here!
              </p>
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg"
              >
                Browse Drills
              </button>
            </div>
          ) : (
            filteredAttempts.map((attempt) => (
              <div
                key={attempt._id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {getDrillTitle(attempt)}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <FiClock className="w-4 h-4" />
                        {formatDate(attempt.createdAt)}
                      </span>

                      {getDrillDifficulty(attempt) && (
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            getDrillDifficulty(attempt) === "easy"
                              ? "bg-green-100 text-green-800"
                              : getDrillDifficulty(attempt) === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {getDrillDifficulty(attempt).charAt(0).toUpperCase() +
                            getDrillDifficulty(attempt).slice(1)}
                        </span>
                      )}

                      <span>{attempt.answers.length} questions answered</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`inline-flex items-center px-3 py-2 rounded-full text-lg font-bold ${getScoreColor(
                        attempt.score
                      )}`}
                    >
                      {attempt.score}%
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default History;
