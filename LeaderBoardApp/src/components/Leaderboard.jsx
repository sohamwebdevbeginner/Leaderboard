import React, { useState, useEffect } from "react";
import bgImage from "../assets/img.jpg"; 

const SPREADSHEET_ID = "1pAc8AlCdPFduk1cblYitu9fz3eg8_05OfFsQg2GF48I";
const RANGE = "A2:B";
const API_KEY = "AIzaSyAz29IHMSH1ZUUzMNn3rtq4FApM28TsBN4";
const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;

const Leaderboard = () => {
  const [sohamTeams, setSohamTeams] = useState([]);

  const fetchSohamTeams = async () => {
    try {
      const response = await fetch(url);
      const info = await response.json();
      const rows = info.values || [];
      const structuredSohamTeams = rows.map((val) => ({
        name: val[0],
        score: Number(val[1] || 0),
      }))
          .sort((a, b) => b.score - a.score);
      setSohamTeams(structuredSohamTeams);
    } catch (e) {
      console.error("Error occurred while fetching the Soham leaderboard.", e);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const repeatFetch = async () => {
      if (!isMounted) return;
      await fetchSohamTeams();
      setTimeout(repeatFetch, 5000);
    };
    repeatFetch();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center text-gray-100"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 max-w-4xl mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-cyan-400 mb-2 drop-shadow-lg">
            🐫 Live Soham Leaderboard 🐫
          </h1>
        </div>

        <div className="bg-transparent rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="px-6 py-4 bg-transparent backdrop-blur-sm">
            <div className="flex justify-between items-center text-2xl font-bold text-cyan-200">
              <span className="flex-1 text-left">Team Name</span>
              <span className="w-24 text-right">Score</span>
            </div>
          </div>

          <div className="divide-y divide-white/20">
            {sohamTeams.map((ssTeam, idx) => (
              <div
                key={ssTeam.name}
                className="bg-opacity-40 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl"
              >
                <div className="px-6 py-4 flex justify-between items-center">
                  <div className="flex-1 text-left">
                    <span className="text-xl font-semibold text-cyan-100">
                      {ssTeam.name}
                    </span>
                  </div>

                  <div className="w-24 text-right">
                    <span className="text-2xl font-bold text-white">
                      {ssTeam.score}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sohamTeams.length === 0 && (
            <div className="px-6 py-12 text-center text-gray-300">
              <p className="text-lg">Loading Soham leaderboard data...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
