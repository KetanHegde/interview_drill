import React from "react";
import { useAuth } from "../hooks/useAuth";
import { FiTarget, FiTrendingUp, FiShield } from "react-icons/fi";

const Landing: React.FC = () => {
  const { login } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Master Security Skills with
            <span className="text-primary-600"> UPIVOT</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Test your cybersecurity knowledge with interactive drills, track
            your progress, and compete with others.
          </p>

          <button
            onClick={login}
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl"
          >
            🚀 Sign in with Google
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <FiTarget className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Interactive Drills</h3>
            <p className="text-gray-600">
              Practice with real-world security scenarios
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <FiTrendingUp className="w-12 h-12 text-success mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">
              Monitor your learning journey and scores
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <FiShield className="w-12 h-12 text-warning mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Security Focus</h3>
            <p className="text-gray-600">
              Learn the latest cybersecurity concepts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
