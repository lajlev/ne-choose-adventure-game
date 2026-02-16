import { useState, useEffect, useCallback, useRef } from "react";
import { INITIAL_STATS } from "./story";
import {
  generateScene,
  generatePersonality,
  generateProfileImage,
} from "./generateScene";
import "./App.css";

const STAT_CONFIG = {
  health: { label: "Helbred", icon: "❤️", color: "#eb5757", max: 100 },
  happiness: { label: "Humør", icon: "😊", color: "#f2c94c", max: 100 },
  friends: { label: "Venner", icon: "👫", color: "#56ccf2", max: 20 },
  kroner: { label: "Kroner", icon: "💰", color: "#6fcf97", max: 500 },
};

const DAY_NAMES = [
  "Mandag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lørdag",
  "Søndag",
];

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

function StatCard({ value, delta, config }) {
  const [animate, setAnimate] = useState(false);
  const prevValue = useRef(value);
  const fillPct = Math.min(100, (value / config.max) * 100);

  useEffect(() => {
    if (value !== prevValue.current) {
      setAnimate(true);
      prevValue.current = value;
      const t = setTimeout(() => setAnimate(false), 800);
      return () => clearTimeout(t);
    }
  }, [value]);

  const glowClass = animate
    ? delta > 0
      ? "stat-glow-pos"
      : delta < 0
        ? "stat-glow-neg"
        : ""
    : "";

  return (
    <div className={`stat ${glowClass}`}>
      <div
        className="stat-fill"
        style={{
          height: `${fillPct}%`,
          background: `linear-gradient(to top, ${config.color}33, ${config.color}11)`,
        }}
      />
      <span className={`stat-icon ${animate ? "stat-icon-bounce" : ""}`}>
        {config.icon}
      </span>
      <span className="stat-value">{value}</span>
      {delta && (
        <span
          className={`stat-delta ${delta > 0 ? "pos" : "neg"} stat-delta-pop`}
        >
          {formatDelta(delta)}
        </span>
      )}
      <span className="stat-label">{config.label}</span>
      <div className="stat-bar" style={{ "--bar-color": config.color }}>
        <div
          className="stat-bar-fill"
          style={{ width: `${fillPct}%`, background: config.color }}
        />
      </div>
    </div>
  );
}

// ── Screens ──

const SCREEN_API_KEY = "api_key";
const SCREEN_PROFILE = "profile";
const SCREEN_GAME = "game";
const SCREEN_ENDING = "ending";

function App() {
  // Core state
  const [screen, setScreen] = useState(SCREEN_API_KEY);
  const [apiKey, setApiKey] = useState(
    () => localStorage.getItem("openai_key") || "",
  );
  const [keyInput, setKeyInput] = useState("");

  // Player profile
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    gender: "",
    friends: "",
    family: "",
    town: "",
  });
  const [gameDays, setGameDays] = useState(7);

  // Game state
  const [scene, setScene] = useState(null);
  const [stats, setStats] = useState(INITIAL_STATS);
  const [history, setHistory] = useState([]);
  const [sceneNumber, setSceneNumber] = useState(1);
  const [lastChanges, setLastChanges] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sceneVisible, setSceneVisible] = useState(false);

  // Personality profile state
  const [personality, setPersonality] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  // Skip to profile screen if key already saved
  useEffect(() => {
    if (apiKey && screen === SCREEN_API_KEY) {
      setScreen(SCREEN_PROFILE);
    }
  }, []);

  const totalScenes = gameDays * 2;

  const fetchScene = useCallback(
    async (currentStats, currentHistory, currentSceneNumber, currentProfile) => {
      setLoading(true);
      setError(null);
      setSceneVisible(false);
      try {
        const data = await generateScene(
          apiKey,
          currentStats,
          currentHistory,
          currentProfile,
          currentSceneNumber,
          totalScenes,
        );
        setScene(data);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setSceneVisible(true));
        });
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [apiKey, totalScenes],
  );

  // ── Handlers ──

  function handleSaveKey() {
    const trimmed = keyInput.trim();
    if (!trimmed) return;
    localStorage.setItem("openai_key", trimmed);
    setApiKey(trimmed);
    setScreen(SCREEN_PROFILE);
  }

  function handleClearKey() {
    localStorage.removeItem("openai_key");
    setApiKey("");
    setKeyInput("");
    setScreen(SCREEN_API_KEY);
    resetGame();
  }

  function handleProfileChange(field, value) {
    setProfile((p) => ({ ...p, [field]: value }));
  }

  function handleStartGame() {
    if (!profile.name.trim()) return;
    resetGame();
    setScreen(SCREEN_GAME);
    fetchScene(INITIAL_STATS, [], 1, profile);
  }

  function handleChoice(choice) {
    const changes = choice.stats || {};
    const newStats = applyStats(stats, changes);
    const newHistory = [
      ...history,
      { choiceText: choice.text, sceneText: scene.text },
    ];
    const nextSceneNumber = sceneNumber + 1;
    setStats(newStats);
    setHistory(newHistory);
    setLastChanges(choice.stats || null);
    setSceneNumber(nextSceneNumber);
    setScene(null);
    fetchScene(newStats, newHistory, nextSceneNumber, profile);
  }

  async function handleEnding() {
    setScreen(SCREEN_ENDING);
    setProfileLoading(true);
    try {
      const personalityData = await generatePersonality(
        apiKey,
        stats,
        history,
        profile,
        gameDays,
      );
      setPersonality(personalityData);

      // Generate image in parallel once we have the prompt
      try {
        const imageUrl = await generateProfileImage(
          apiKey,
          personalityData.imagePrompt,
        );
        setProfileImage(imageUrl);
      } catch {
        // Image generation can fail (billing, etc.) — continue without it
        setProfileImage(null);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setProfileLoading(false);
    }
  }

  function handleRestart() {
    resetGame();
    setScreen(SCREEN_PROFILE);
  }

  function resetGame() {
    setScene(null);
    setStats(INITIAL_STATS);
    setHistory([]);
    setSceneNumber(1);
    setLastChanges(null);
    setError(null);
    setPersonality(null);
    setProfileImage(null);
    setProfileLoading(false);
    setSceneVisible(false);
  }

  function renderSceneText(text) {
    const paragraphs = text.split(/\n\n|\n/).filter(Boolean);
    return paragraphs.map((p, i) => (
      <p className="scene-text" key={i}>
        {p}
      </p>
    ));
  }

  // Current day/time info
  const currentDay = Math.floor((sceneNumber - 1) / 2) + 1;
  const isAfternoon = sceneNumber % 2 === 0;
  const dayName = DAY_NAMES[(currentDay - 1) % 7];
  const weekNumber = Math.floor((currentDay - 1) / 7) + 1;
  const timeLabel = isAfternoon ? "Eftermiddag" : "Formiddag";
  const timeIcon = isAfternoon ? "🌆" : "🌅";

  // ── API Key Screen ──

  if (screen === SCREEN_API_KEY) {
    return (
      <div className="game">
        <h1>Livet ✨</h1>
        <div className="scene api-key-screen">
          <p className="scene-text" style={{ textAlign: "center" }}>
            Dette spil bruger AI til at generere en unik historie om dit liv
            — uanset alder. Indtast din OpenAI API-nøgle for at komme i gang.
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
            Fortsæt
          </button>
          <p className="key-hint">
            Din nøgle gemmes kun i din browser og sendes direkte til OpenAI.
          </p>
        </div>
      </div>
    );
  }

  // ── Profile Setup Screen ──

  if (screen === SCREEN_PROFILE) {
    return (
      <div className="game">
        <h1>Livet ✨</h1>
        <div className="scene profile-screen">
          <h2 className="profile-heading">🎭 Opret din karakter</h2>

          <div className="profile-form">
            <div className="profile-field">
              <label>Navn *</label>
              <input
                type="text"
                placeholder="Dit navn"
                value={profile.name}
                onChange={(e) => handleProfileChange("name", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleStartGame()}
              />
            </div>

            <div className="profile-row">
              <div className="profile-field">
                <label>Alder</label>
                <input
                  type="number"
                  placeholder="25"
                  min="3"
                  max="99"
                  value={profile.age}
                  onChange={(e) => handleProfileChange("age", e.target.value)}
                />
              </div>
              <div className="profile-field">
                <label>Køn</label>
                <select
                  value={profile.gender}
                  onChange={(e) =>
                    handleProfileChange("gender", e.target.value)
                  }
                >
                  <option value="">Vælg...</option>
                  {parseInt(profile.age, 10) >= 18 ? (
                    <>
                      <option value="mand">Mand</option>
                      <option value="kvinde">Kvinde</option>
                    </>
                  ) : (
                    <>
                      <option value="dreng">Dreng</option>
                      <option value="pige">Pige</option>
                    </>
                  )}
                  <option value="ikke-binær">Ikke-binær</option>
                </select>
              </div>
            </div>

            <div className="profile-field">
              <label>Antal dage</label>
              <div className="days-selector">
                {[3, 5, 7, 10, 14].map((d) => (
                  <button
                    key={d}
                    className={`days-btn ${gameDays === d ? "days-btn-active" : ""}`}
                    onClick={() => setGameDays(d)}
                    type="button"
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="profile-field">
              <label>Hjemby</label>
              <input
                type="text"
                placeholder="f.eks. København, Aarhus, Odense..."
                value={profile.town}
                onChange={(e) => handleProfileChange("town", e.target.value)}
              />
            </div>

            <div className="profile-field">
              <label>Venners navne</label>
              <input
                type="text"
                placeholder="f.eks. Emma, Noah, Freja..."
                value={profile.friends}
                onChange={(e) =>
                  handleProfileChange("friends", e.target.value)
                }
              />
            </div>

            <div className="profile-field">
              <label>Families navne</label>
              <input
                type="text"
                placeholder="f.eks. Mor: Anne, Far: Lars, Søster: Ida..."
                value={profile.family}
                onChange={(e) =>
                  handleProfileChange("family", e.target.value)
                }
              />
            </div>
          </div>

          <button
            className="key-btn start-btn"
            onClick={handleStartGame}
            disabled={!profile.name.trim()}
          >
            🚀 Start Eventyret
          </button>

          <button className="change-key-btn" onClick={handleClearKey}>
            Skift API-nøgle
          </button>
        </div>
      </div>
    );
  }

  // ── Ending / Personality Profile Screen ──

  if (screen === SCREEN_ENDING) {
    return (
      <div className="game">
        <h1>Livet ✨</h1>

        <div className="scene ending-screen">
          {scene && renderSceneText(scene.text)}

          {scene && (
            <div className="ending">
              <p className="ending-title">{scene.endingTitle}</p>
              <p className="ending-label">
                {scene.endingType === "good"
                  ? "🌟 God Afslutning"
                  : scene.endingType === "bad"
                    ? "💀 Dårlig Afslutning"
                    : "🌀 Neutral Afslutning"}
              </p>
              <p className="ending-steps">
                {gameDays} dage — {history.length} valg
              </p>
            </div>
          )}

          <div className="profile-result">
            {profileLoading && (
              <div className="loading">
                <div className="spinner" />
                <p>Analyserer din personlighed...</p>
              </div>
            )}

            {!profileLoading && error && (
              <div className="error">
                <p>Noget gik galt:</p>
                <p className="error-detail">{error}</p>
              </div>
            )}

            {!profileLoading && personality && (
              <div className="personality-card">
                <h2 className="personality-title">{personality.title}</h2>

                {profileImage && (
                  <div className="personality-image-wrap">
                    <img
                      className="personality-image"
                      src={profileImage}
                      alt="Din personlighedsprofil"
                    />
                  </div>
                )}

                <div className="personality-traits">
                  {personality.traits.map((trait, i) => (
                    <span className="trait-badge" key={i}>
                      {trait}
                    </span>
                  ))}
                </div>

                <p className="personality-desc">{personality.description}</p>

                <div className="final-stats">
                  <h3>📊 Endelige Stats</h3>
                  <div className="stats-bar">
                    {Object.entries(STAT_CONFIG).map(([key, config]) => (
                      <StatCard
                        key={key}
                        value={stats[key]}
                        delta={null}
                        config={config}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <button className="restart-btn" onClick={handleRestart}>
            🔄 Spil Igen
          </button>
        </div>
      </div>
    );
  }

  // ── Game Screen ──

  return (
    <div className="game">
      <h1>Livet ✨</h1>

      <div className="stats-bar">
        {Object.entries(STAT_CONFIG).map(([key, config]) => (
          <StatCard
            key={key}
            value={stats[key]}
            delta={lastChanges?.[key]}
            config={config}
          />
        ))}
      </div>

      <div className="day-tracker">
        <span className="day-icon">{timeIcon}</span>
        <span className="day-label">
          Uge {weekNumber} — {dayName} {timeLabel}
        </span>
        <span className="day-progress">
          Dag {currentDay}/{gameDays}
        </span>
      </div>

      <div className="scene">
        {loading && (
          <div className="loading">
            <div className="spinner" />
            <p>Genererer din historie...</p>
          </div>
        )}

        {error && !loading && (
          <div className="error">
            <p>Noget gik galt:</p>
            <p className="error-detail">{error}</p>
            <button
              onClick={() =>
                fetchScene(stats, history, sceneNumber, profile)
              }
            >
              Prøv Igen
            </button>
          </div>
        )}

        {!loading && !error && scene && (
          <div
            className={`scene-content ${sceneVisible ? "scene-fade-in" : ""}`}
          >
            {renderSceneText(scene.text)}

            {scene.ending ? (
              <div className="ending">
                <p className="ending-title">{scene.endingTitle}</p>
                <p className="ending-label">
                  {scene.endingType === "good"
                    ? "🌟 God Afslutning"
                    : scene.endingType === "bad"
                      ? "💀 Dårlig Afslutning"
                      : "🌀 Neutral Afslutning"}
                </p>
                <button onClick={handleEnding}>
                  🔮 Se Din Personlighedsprofil
                </button>
              </div>
            ) : (
              <div className="choices">
                {scene.choices.map((choice, i) => (
                  <button
                    key={i}
                    onClick={() => handleChoice(choice)}
                    style={{ animationDelay: `${i * 0.1}s` }}
                    className="choice-btn"
                  >
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
          </div>
        )}
      </div>

      <button className="change-key-btn" onClick={handleClearKey}>
        Skift API-nøgle
      </button>
    </div>
  );
}

export default App;
