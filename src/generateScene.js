const SYSTEM_PROMPT = `Du er en fortæller i et teenagelivs-eventyrspil. Du genererer interaktive scener om realistisk teenageliv i Danmark — skole, venner, familie, penge, helbred, sociale situationer.

VIGTIGT: Alt tekst SKAL være på dansk. Skriv levende, relaterbart dansk med emojis.

Spilleren har følgende profil:
{{PLAYER_PROFILE}}

Du SKAL svare med valid JSON der matcher dette skema:
{
  "text": "Scenebeskrivelsen i flere afsnit adskilt af \\n\\n. Brug emojis. 3-5 sætninger. Brug spillerens navn og deres venner/families navne naturligt.",
  "choices": [
    {
      "text": "Valgbeskrivelse med emoji i starten (kort, 5-15 ord)",
      "stats": { "health": 0, "happiness": 0, "friends": 0, "kroner": 0 }
    }
  ],
  "ending": false
}

Regler:
- Giv ALTID præcis 3 valgmuligheder
- Hver valgtekst SKAL starte med en relevant emoji (f.eks. "🎮 Bliv hjemme og spil hele aftenen")
- Scenetekst SKAL bruge emojis naturligt (2-4 per scene) og adskille afsnit med \\n\\n
- Stat-ændringer skal være heltal mellem -20 og +20, inkluder kun ikke-nul stats
- Hvert valg skal påvirke 1-3 stats meningsfuldt
- De 3 valg skal føles ægte forskellige — ét risikofyldt/dristigt, ét sikkert/forsigtigt, ét socialt/kreativt
- Hold tonen relaterbar, levende og alderssvarende for teenagere
- Brug spillerens navn, venners navne og familiemedlemmers navne naturligt i historien
- Referer til spillerens hjemby når det passer
- Referer til karakterer og begivenheder fra tidligere i historien for kontinuitet
- Hver scene repræsenterer en halv dag (formiddag eller eftermiddag/aften)
- Scenen SKAL passe til tidspunktet: formiddagsscener handler om at stå op, skole, morgenmad osv. Eftermiddags/aften-scener handler om fritid, venner, aftensaktiviteter
- Overvej spillerens nuværende stats — lavt helbred = træt/syg, få kroner = pengemangel, mange venner = populær osv.
- Spillet varer præcis 7 dage (14 halve dage / scener). Du SKAL ALDRIG slutte historien før scene 14. På PRÆCIS scene 14 SKAL du lave en afslutning.
- For afslutningsscener: sæt "ending": true og tilføj "endingTitle" (kreativ titel med emoji) og "endingType" ("good", "neutral" eller "bad"). Afslutningsscener har ingen choices — brug tom array []
- Afslutningsscenetekst skal opsummere ugen dramatisk og tilfredsstillende med emojis
- Gør valg meningsfulde med ægte afvejninger`;

const PROFILE_PROMPT = `Du er en personlighedsanalytiker. Baseret på en teenagers valg i løbet af en uge, skal du skabe en personlighedsprofil.

Du SKAL svare med valid JSON:
{
  "title": "En kreativ titel for personlighedstypen med emoji (f.eks. '🦁 Den Modige Leder')",
  "traits": ["egenskab1", "egenskab2", "egenskab3", "egenskab4", "egenskab5"],
  "description": "En kort, positiv og opløftende personlighedsbeskrivelse på 3-4 sætninger på dansk. Vær specifik om hvad valgene afslører om personligheden. Brug emojis.",
  "imagePrompt": "A colorful, stylized digital illustration portrait representing a [personality type] teenager. [Include specific visual metaphors based on the personality traits]. Vibrant colors, modern art style, positive mood, no text."
}

Analyser disse valg og stats og lav en profil:`;

export async function generateScene(apiKey, stats, history, playerProfile, sceneNumber) {
  const profileStr = [
    `Navn: ${playerProfile.name}`,
    playerProfile.age ? `Alder: ${playerProfile.age}` : null,
    playerProfile.gender ? `Køn: ${playerProfile.gender}` : null,
    playerProfile.town ? `Hjemby: ${playerProfile.town}` : null,
    playerProfile.friends ? `Venner: ${playerProfile.friends}` : null,
    playerProfile.family ? `Familie: ${playerProfile.family}` : null,
  ].filter(Boolean).join("\n");

  const prompt = SYSTEM_PROMPT.replace("{{PLAYER_PROFILE}}", profileStr);

  const day = Math.floor((sceneNumber - 1) / 2) + 1;
  const timeOfDay = sceneNumber % 2 === 1 ? "formiddag" : "eftermiddag/aften";
  const dayNames = ["mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag", "søndag"];
  const dayName = dayNames[day - 1] || "søndag";

  const userMessage = `Nuværende stats: Helbred=${stats.health}, Humør=${stats.happiness}, Venner=${stats.friends}, Kroner=${stats.kroner}

Scene ${sceneNumber} af 14 — Dag ${day} (${dayName}), ${timeOfDay}
${sceneNumber === 14 ? "⚠️ DETTE ER DEN SIDSTE SCENE! Du SKAL lave en afslutning med ending: true!" : `Der er ${14 - sceneNumber} scener tilbage.`}

Valg indtil nu (${history.length} i alt):
${history.length === 0 ? "Ingen — dette er åbningsscenen. Start en ny uge i " + (playerProfile.town || "byen") + " på en mandag morgen." : history.map((h, i) => `${i + 1}. "${h.choiceText}"`).join("\n")}

Generer næste scene. Husk: 3 valgmuligheder, emojis, dansk, afsnit adskilt af \\n\\n.${sceneNumber === 14 ? " AFSLUT HISTORIEN!" : ""}`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: userMessage },
      ],
      response_format: { type: "json_object" },
      temperature: 0.9,
      max_tokens: 600,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI API fejl (${res.status}): ${err}`);
  }

  const data = await res.json();
  const content = data.choices[0].message.content;
  return JSON.parse(content);
}

export async function generatePersonality(apiKey, stats, history, playerProfile) {
  const choicesSummary = history.map((h, i) => `${i + 1}. "${h.choiceText}"`).join("\n");

  const userMessage = `Spiller: ${playerProfile.name}${playerProfile.age ? `, ${playerProfile.age} år` : ""}
Endelige stats: Helbred=${stats.health}, Humør=${stats.happiness}, Venner=${stats.friends}, Kroner=${stats.kroner}

Valg i løbet af ugen:
${choicesSummary}

Lav en personlighedsprofil baseret på disse valg. Svar på dansk (undtagen imagePrompt som skal være på engelsk).`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: PROFILE_PROMPT },
        { role: "user", content: userMessage },
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
      max_tokens: 500,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI API fejl (${res.status}): ${err}`);
  }

  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}

export async function generateProfileImage(apiKey, imagePrompt) {
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: imagePrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`DALL-E fejl (${res.status}): ${err}`);
  }

  const data = await res.json();
  return data.data[0].url;
}
