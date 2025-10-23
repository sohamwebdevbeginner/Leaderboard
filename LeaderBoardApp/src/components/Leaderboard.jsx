import React, { useState, useEffect } from "react";
import bgImage from "../assets/img.jpg"; 

const SPREADSHEET_ID = "1pAc8AlCdPFduk1cblYitu9fz3eg8_05OfFsQg2GF48I";
const RANGE = "A2:B";
const API_KEY = "AIzaSyAz29IHMSH1ZUUzMNn3rtq4FApM28TsBN4";
const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

const Leaderboard = () => {
  const [teams, setTeams] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const info = await response.json();
      const rows = info.values || [];
      const structured = rows
        .map((val) => ({
          name: val[0],
          score: Number(val[1] || 0),
        }))
        .sort((a, b) => b.score - a.score);

      setTeams(structured);
    } catch (e) {
      console.error("Error occurred while fetching the leaderboard.", e);
    }
  };

  useEffect(() => {
    let check_mounted = true;
    const repeat = async () => {
      if (!check_mounted) return;
      await fetchData();
      setTimeout(repeat, 5000);
    };
    repeat();
    return () => {
      check_mounted = false;
    };
  }, []);

  const getMedalEmoji = (idx) => {
    if (idx === 0) return "🥇";
    if (idx === 1) return "🥈";
    if (idx === 2) return "🥉";
    return "";
  };

  const rank_color = (idx) => {
    if (idx === 0) return "from-yellow-700 to-yellow-500";
    if (idx === 1) return "from-gray-600 to-gray-400";
    if (idx === 2) return "from-orange-700 to-orange-500";
    return "from-slate-700 to-slate-800";
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-gray-100"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* 🔹 Dark transparent overlay to balance visibility */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* 🔹 Main content */}
      <div className="relative z-10 max-w-4xl mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-cyan-400 mb-2 drop-shadow-lg">
            🐫 Live Leaderboard 🐫
          </h1>
        </div>

        {/* 🔹 Frosted glass leaderboard box */}
        <div className="bg-transparent rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="px-6 py-4 bg-transparent backdrop-blur-sm">
            <div className="flex justify-between items-center text-2xl font-bold text-cyan-200">
              <span className="w-18">Rank</span>
              <span className="flex-1 text-left">Team Name</span>
              <span className="w-24 text-right">Score</span>
            </div>
          </div>

          {/* 🔹 Rows */}
          <div className="divide-y divide-white/20">
            {teams.map((team, idx) => (
              <div
                key={team.name}
                className={`bg-gradient-to-r ${rank_color(
                  idx
                )} bg-opacity-40 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl`}
              >
                <div className="px-6 py-4 flex justify-between items-center">
                  <div className="w-18 flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">
                      {idx + 1}
                    </span>
                    <span className="text-2xl">{getMedalEmoji(idx)}</span>
                  </div>

                  <div className="flex-1 text-left">
                    <span className="text-xl font-semibold text-cyan-100">
                      {team.name}
                    </span>
                  </div>

                  <div className="w-24 text-right">
                    <span className="text-2xl font-bold text-white">
                      {team.score}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {teams.length === 0 && (
            <div className="px-6 py-12 text-center text-gray-300">
              <p className="text-lg">Loading leaderboard data...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
