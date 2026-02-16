const SYSTEM_PROMPT = `You are a teen life story game narrator. You generate interactive story scenes about realistic teen life — school, friends, family, money, health, social situations.

You MUST respond with valid JSON matching this exact schema:
{
  "text": "The scene description (2-4 sentences, second person 'you')",
  "choices": [
    {
      "text": "Choice description (short, 5-12 words)",
      "stats": { "health": 0, "happiness": 0, "friends": 0, "dollars": 0 }
    },
    {
      "text": "Choice description",
      "stats": { "health": 0, "happiness": 0, "friends": 0, "dollars": 0 }
    }
  ],
  "ending": false
}

Rules:
- Always give exactly 2 choices
- Stat changes should be integers between -20 and +20, only include non-zero stats
- Each choice should meaningfully affect 1-3 stats
- Keep the tone relatable and age-appropriate for teens
- Reference characters and events from earlier in the story for continuity
- After the player has made 4+ choices, you may create an ending scene. After 6+ choices you MUST end the story
- For ending scenes set "ending": true and add "endingTitle" (creative 2-4 word title) and "endingType" ("good", "neutral", or "bad"). Ending scenes have no choices array — use an empty array []
- Make choices feel meaningful with real trade-offs
- Consider the player's current stats when writing — low health means they're tired/sick, low dollars means they're broke, etc.`;

export async function generateScene(apiKey, stats, history) {
  const userMessage = `Current stats: Health=${stats.health}, Happiness=${stats.happiness}, Friends=${stats.friends}, Dollars=${stats.dollars}

Choices made so far (${history.length} total):
${history.length === 0 ? "None — this is the opening scene. Start a new teen life day." : history.map((h, i) => `${i + 1}. "${h.choiceText}" → ${h.sceneText}`).join("\n")}

Generate the next scene.`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      response_format: { type: "json_object" },
      temperature: 0.9,
      max_tokens: 500,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI API error (${res.status}): ${err}`);
  }

  const data = await res.json();
  const content = data.choices[0].message.content;
  return JSON.parse(content);
}
