import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout/Layout";
import DrillCard from "../components/Dashboard/DrillCard";
import RecentAttempts from "../components/Dashboard/RecentAttempts";
import Loading from "../components/common/Loading";
import { Drill, Answer } from "../types/drill";
import toast from "react-hot-toast";
import { FiSearch, FiChevronDown } from "react-icons/fi";

interface AttemptResponse {
  _id: string;
  userId: string;
  drillId: { title: string };
  answers: Answer[];
  score: number;
  createdAt: string;
}

interface DashboardStats {
  totalAttempts: number;
  averageScore: number;
  recentAttempts: AttemptResponse[];
}

const Dashboard: React.FC = () => {
  const [drills, setDrills] = useState<Drill[]>([]);
  const [filteredDrills, setFilteredDrills] = useState<Drill[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Filters
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<string>("all");
  const [tags, setTags] = useState<string[]>([]);
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setTagDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      const [drillsResponse, attemptsResponse] = await Promise.all([
        fetch("/api/drills"),
        fetch("/api/attempts?limit=5", {
          credentials: "include",
        }),
      ]);

      if (!drillsResponse.ok || !attemptsResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const drillsData: Drill[] = await drillsResponse.json();
      const attemptsData: AttemptResponse[] = await attemptsResponse.json();

      setDrills(drillsData);
      setFilteredDrills(drillsData);
      setStats({
        totalAttempts: attemptsData.length,
        averageScore:
          attemptsData.length > 0
            ? Math.round(
                attemptsData.reduce((acc, attempt) => acc + attempt.score, 0) /
                  attemptsData.length
              )
            : 0,
        recentAttempts: attemptsData,
      });
    } catch (error) {
      console.error("Failed to fetch data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  // Apply filters whenever search/difficulty/tags change
  useEffect(() => {
    let filtered = [...drills];

    if (search) {
      filtered = filtered.filter((drill) =>
        drill.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (difficulty !== "all") {
      filtered = filtered.filter((drill) => drill.difficulty === difficulty);
    }

    if (tags.length > 0) {
      filtered = filtered.filter((drill) =>
        drill.tags.some((tag) => tags.includes(tag))
      );
    }

    setFilteredDrills(filtered);
  }, [search, difficulty, tags, drills]);

  if (loading) return <Loading />;

  const allTags = [...new Set(drills.flatMap((d) => d.tags))];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Choose a drill to test your skills
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Drills Section */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              {/* Search */}
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full text-black border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Difficulty filter */}
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="text-black border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              {/* Tags filter */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setTagDropdownOpen(!tagDropdownOpen)}
                  className="text-black flex items-center justify-between border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
                >
                  {tags.length > 0
                    ? `${tags.length} tag(s) selected`
                    : "Filter by Tags"}
                  <FiChevronDown className="ml-2 text-gray-500" />
                </button>

                {tagDropdownOpen && (
                  <div className="absolute z-10 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg p-2 max-h-60 overflow-y-auto">
                    {allTags.map((t) => (
                      <label
                        key={t}
                        className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={tags.includes(t)}
                          onChange={() =>
                            setTags((prev) =>
                              prev.includes(t)
                                ? prev.filter((tag) => tag !== t)
                                : [...prev, t]
                            )
                          }
                        />
                        <span className="text-sm text-gray-700">{t}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Drill list */}
            {filteredDrills.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {filteredDrills.map((drill) => (
                  <DrillCard key={drill._id} drill={drill} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center">No drills found.</p>
            )}
          </div>

          {/* Recent Attempts */}
          <div className="lg:col-span-1">
            <RecentAttempts attempts={stats?.recentAttempts || []} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
