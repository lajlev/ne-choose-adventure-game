import { useState } from "react";
import story from "./story";
import "./App.css";

function App() {
  const [sceneKey, setSceneKey] = useState("start");
  const [history, setHistory] = useState([]);
  const scene = story[sceneKey];

  function handleChoice(choice) {
    setHistory((prev) => [...prev, sceneKey]);
    setSceneKey(choice.next);
  }

  function handleRestart() {
    setHistory([]);
    setSceneKey("start");
  }

  function handleBack() {
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setSceneKey(prev);
  }

  return (
    <div className="game">
      <h1>The Dark Forest</h1>

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
                {choice.text}
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
