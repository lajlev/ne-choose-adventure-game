import { useState } from "react";
import story, { INITIAL_STATS } from "./story";
import "./App.css";

const STAT_CONFIG = {
  health: { label: "Health", icon: "❤️" },
  happiness: { label: "Happy", icon: "😊" },
  friends: { label: "Friends", icon: "👫" },
  dollars: { label: "Dollars", icon: "💵" },
};

function applyStats(current, changes) {
  if (!changes) return current;
  const next = { ...current };
  for (const [key, delta] of Object.entries(changes)) {
    next[key] = Math.max(0, (next[key] || 0) + delta);
  }
  return next;
}

function formatDelta(val) {
  return val > 0 ? `+${val}` : `${val}`;
}

function App() {
  const [sceneKey, setSceneKey] = useState("start");
  const [stats, setStats] = useState(INITIAL_STATS);
  const [history, setHistory] = useState([]);
  const [lastChanges, setLastChanges] = useState(null);
  const scene = story[sceneKey];

  function handleChoice(choice) {
    setHistory((prev) => [...prev, { sceneKey, stats }]);
    const changes = choice.stats || {};
    setStats((s) => applyStats(s, changes));
    setLastChanges(choice.stats || null);
    setSceneKey(choice.next);
  }

  function handleRestart() {
    setHistory([]);
    setStats(INITIAL_STATS);
    setLastChanges(null);
    setSceneKey("start");
  }

  function handleBack() {
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setSceneKey(prev.sceneKey);
    setStats(prev.stats);
    setLastChanges(null);
  }

  const finalStats = scene.ending
    ? applyStats(stats, scene.endingStats)
    : stats;

  return (
    <div className="game">
      <h1>Teen Life</h1>

      <div className="stats-bar">
        {Object.entries(STAT_CONFIG).map(([key, { label, icon }]) => {
          const val = finalStats[key];
          const delta = lastChanges?.[key];
          return (
            <div className="stat" key={key}>
              <span className="stat-icon">{icon}</span>
              <span className="stat-value">{val}</span>
              {delta && (
                <span className={`stat-delta ${delta > 0 ? "pos" : "neg"}`}>
                  {formatDelta(delta)}
                </span>
              )}
              <span className="stat-label">{label}</span>
            </div>
          );
        })}
      </div>

      <div className="scene">
        <p className="scene-text">{scene.text}</p>

        {scene.ending ? (
          <div className="ending">
            <p className="ending-title">{scene.endingTitle}</p>
            <p className="ending-label">
              {scene.endingType === "good" ? "Good Ending" : "Neutral Ending"}
            </p>
            <button onClick={handleRestart}>Play Again</button>
          </div>
        ) : (
          <div className="choices">
            {scene.choices.map((choice, i) => (
              <button key={i} onClick={() => handleChoice(choice)}>
                <span className="choice-text">{choice.text}</span>
                {choice.stats && (
                  <span className="choice-stats">
                    {Object.entries(choice.stats).map(([key, val]) => (
                      <span
                        key={key}
                        className={`choice-stat ${val > 0 ? "pos" : "neg"}`}
                      >
                        {STAT_CONFIG[key].icon}
                        {formatDelta(val)}
                      </span>
                    ))}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {history.length > 0 && !scene.ending && (
          <button className="back-btn" onClick={handleBack}>
            Go Back
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
