import { useState, useEffect, useCallback } from "react";
import { INITIAL_STATS } from "./story";
import { generateScene } from "./generateScene";
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
  const [apiKey, setApiKey] = useState(
    () => localStorage.getItem("openai_key") || "",
  );
  const [keyInput, setKeyInput] = useState("");
  const [scene, setScene] = useState(null);
  const [stats, setStats] = useState(INITIAL_STATS);
  const [history, setHistory] = useState([]);
  const [lastChanges, setLastChanges] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchScene = useCallback(
    async (currentStats, currentHistory) => {
      setLoading(true);
      setError(null);
      try {
        const data = await generateScene(apiKey, currentStats, currentHistory);
        setScene(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [apiKey],
  );

  useEffect(() => {
    if (apiKey && !scene && !loading) {
      fetchScene(INITIAL_STATS, []);
    }
  }, [apiKey, scene, loading, fetchScene]);

  function handleSaveKey() {
    const trimmed = keyInput.trim();
    if (!trimmed) return;
    localStorage.setItem("openai_key", trimmed);
    setApiKey(trimmed);
  }

  function handleClearKey() {
    localStorage.removeItem("openai_key");
    setApiKey("");
    setKeyInput("");
    setScene(null);
    setHistory([]);
    setStats(INITIAL_STATS);
    setLastChanges(null);
  }

  function handleChoice(choice) {
    const changes = choice.stats || {};
    const newStats = applyStats(stats, changes);
    const newHistory = [
      ...history,
      { choiceText: choice.text, sceneText: scene.text },
    ];
    setStats(newStats);
    setHistory(newHistory);
    setLastChanges(choice.stats || null);
    setScene(null);
    fetchScene(newStats, newHistory);
  }

  function handleRestart() {
    setHistory([]);
    setStats(INITIAL_STATS);
    setLastChanges(null);
    setScene(null);
    fetchScene(INITIAL_STATS, []);
  }

  // API key entry screen
  if (!apiKey) {
    return (
      <div className="game">
        <h1>Teen Life</h1>
        <div className="scene api-key-screen">
          <p className="scene-text">
            This game uses AI to generate a unique story every time you play.
            Enter your OpenAI API key to get started.
          </p>
          <input
            className="key-input"
            type="password"
            placeholder="sk-..."
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSaveKey()}
          />
          <button className="key-btn" onClick={handleSaveKey}>
            Start Game
          </button>
          <p className="key-hint">
            Your key is stored in your browser only and sent directly to OpenAI.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="game">
      <h1>Teen Life</h1>

      <div className="stats-bar">
        {Object.entries(STAT_CONFIG).map(([key, { label, icon }]) => {
          const val = stats[key];
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
        {loading && (
          <div className="loading">
            <div className="spinner" />
            <p>Generating your story...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>Something went wrong:</p>
            <p className="error-detail">{error}</p>
            <button onClick={() => fetchScene(stats, history)}>
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && scene && (
          <>
            <p className="scene-text">{scene.text}</p>

            {scene.ending ? (
              <div className="ending">
                <p className="ending-title">{scene.endingTitle}</p>
                <p className="ending-label">
                  {scene.endingType === "good"
                    ? "Good Ending"
                    : scene.endingType === "bad"
                      ? "Bad Ending"
                      : "Neutral Ending"}
                </p>
                <p className="ending-steps">
                  Finished in {history.length} choices
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
                        {Object.entries(choice.stats)
                          .filter(([, v]) => v !== 0)
                          .map(([key, val]) => (
                            <span
                              key={key}
                              className={`choice-stat ${val > 0 ? "pos" : "neg"}`}
                            >
                              {STAT_CONFIG[key]?.icon}
                              {formatDelta(val)}
                            </span>
                          ))}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <button className="change-key-btn" onClick={handleClearKey}>
        Change API Key
      </button>
    </div>
  );
}

export default App;
