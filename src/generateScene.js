function getAgeContext(age) {
  const a = parseInt(age, 10);
  if (!a || a < 3) {
    // Default / unknown age — generic adult
    return {
      label: "voksenlivs",
      setting: "arbejde, venner, familie, økonomi, helbred, sociale situationer",
      morningActivities: "formiddagsscener handler om at stå op, arbejde, morgenmad osv.",
      afternoonActivities: "eftermiddags/aften-scener handler om fritid, venner, hobbyer, aftensaktiviteter",
      weekendNote: "I weekend-scener (lørdag/søndag) skal tonen være mere afslappet — ingen arbejde, mere fritid og sociale ting",
      toneNote: "Hold tonen relaterbar, levende og realistisk for en voksen",
      exampleChoice: "🍳 Lav en ordentlig morgenmad før arbejde",
    };
  }
  if (a <= 5) {
    return {
      label: "børnelivs",
      setting: "børnehave/dagpleje, leg, familie, fantasi, venner, eventyr i hverdagen",
      morningActivities: "formiddagsscener handler om at blive vækket, morgenmad med familien, aflevering i børnehave, leg med de andre børn",
      afternoonActivities: "eftermiddags/aften-scener handler om at blive hentet, lege derhjemme, aftenmad, godnathistorie",
      weekendNote: "I weekend-scener (lørdag/søndag) er der ingen børnehave — fokus på familietid, legepladsen, udflugter",
      toneNote: "Hold tonen varm, tryg, fantasifuld og alderssvarende for et lille barn. Beskriv verden gennem barnets nysgerrige øjne",
      exampleChoice: "🧸 Leg med bamse i sandkassen",
    };
  }
  if (a <= 9) {
    return {
      label: "børnelivs",
      setting: "skole (indskoling), venner, leg, familie, hobbyer, fantasi og hverdagseventyr",
      morningActivities: "formiddagsscener handler om at stå op, morgenmad, cykle/gå i skole, undervisning, frikvarter",
      afternoonActivities: "eftermiddags/aften-scener handler om SFO/fritidsklub, lege med venner, hobbyer, lektier, aftenmad med familien",
      weekendNote: "I weekend-scener (lørdag/søndag) er der ingen skole — fokus på leg, familietid, sports-/fritidsaktiviteter, overnatning hos venner",
      toneNote: "Hold tonen sjov, eventyrlig og alderssvarende for et skolebarn. Verden er fuld af muligheder og opdagelser",
      exampleChoice: "⚽ Spil fodbold med klassekammeraterne i frikvarteret",
    };
  }
  if (a <= 12) {
    return {
      label: "børnelivs",
      setting: "skole (mellemtrin), venner, hobbyer, familie, sport, begyndende selvstændighed",
      morningActivities: "formiddagsscener handler om at stå op, skole, undervisning, gruppearbejde, frikvarter",
      afternoonActivities: "eftermiddags/aften-scener handler om fritidsaktiviteter, sport, venner, gaming, lektier, familietid",
      weekendNote: "I weekend-scener (lørdag/søndag) er der ingen skole — fokus på sport, venner, familieudflugter, hobbyer",
      toneNote: "Hold tonen energisk, nysgerrig og alderssvarende for en tweenie. Balancen mellem at være barn og at ville være stor",
      exampleChoice: "🎮 Tag med vennerne ned og spil i klubben",
    };
  }
  if (a <= 17) {
    return {
      label: "teenagelivs",
      setting: "skole/gymnasium, venner, fester, familie, kærlighed, fritidsjob, identitet, sociale medier",
      morningActivities: "formiddagsscener handler om at stå op, skole/gymnasium, undervisning, frikvarter, kantinen",
      afternoonActivities: "eftermiddags/aften-scener handler om fritid, venner, fester, fritidsjob, hobbyer, aftensaktiviteter",
      weekendNote: "I weekend-scener (lørdag/søndag) er der ingen skole — fokus på fester, venner, fritidsjob, afslapning",
      toneNote: "Hold tonen relaterbar, levende og alderssvarende for en teenager. Drama, identitet, venskaber og forandring",
      exampleChoice: "🎮 Bliv hjemme og spil hele aftenen",
    };
  }
  if (a <= 25) {
    return {
      label: "ungdomslivs",
      setting: "uddannelse/universitet/første job, venner, kæreste, økonomi, flytning hjemmefra, fester, selvstændighed",
      morningActivities: "formiddagsscener handler om at stå op, forelæsninger/arbejde, morgenmad, transport",
      afternoonActivities: "eftermiddags/aften-scener handler om studiegrupper, venner, byture, bijob, dating, fritid",
      weekendNote: "I weekend-scener (lørdag/søndag) er der fri — fokus på byture, venner, afslapning, brunch, hobbyer",
      toneNote: "Hold tonen energisk og relaterbar for en ung voksen. Frihed, ansvar, usikkerhed og muligheder",
      exampleChoice: "📚 Bliv hjemme og læs op til eksamen",
    };
  }
  if (a <= 40) {
    return {
      label: "voksenlivs",
      setting: "arbejde/karriere, familie, børn, parforhold, økonomi, bolig, venner, work-life balance",
      morningActivities: "formiddagsscener handler om at stå op, gøre børn klar, transport, arbejde, møder",
      afternoonActivities: "eftermiddags/aften-scener handler om at hente børn, madlavning, familietid, venner, hobbyer, parforhold",
      weekendNote: "I weekend-scener (lørdag/søndag) er der fri fra arbejde — fokus på familieaktiviteter, venner, hus/have, afslapning",
      toneNote: "Hold tonen realistisk og genkendelig for en travl voksen. Jonglering mellem ansvar, drømme og hverdagens glæder",
      exampleChoice: "👔 Forbered dig grundigt til det store møde",
    };
  }
  if (a <= 60) {
    return {
      label: "livs",
      setting: "karriere, familie, voksne børn, parforhold, økonomi, helbred, livsændringer, nye mål",
      morningActivities: "formiddagsscener handler om arbejde, morgenrutiner, motion, planlægning",
      afternoonActivities: "eftermiddags/aften-scener handler om familiebesøg, venner, hobbyer, madlavning, afslapning",
      weekendNote: "I weekend-scener (lørdag/søndag) er der fri — fokus på hobbyer, familiesammenkomster, rejser, haven",
      toneNote: "Hold tonen reflekterende og varm. Livserfaring, nye kapitler, balance mellem pligt og passion",
      exampleChoice: "🏡 Brug weekenden på haveprojektet",
    };
  }
  // 61+
  return {
    label: "livs",
    setting: "pension/seniortilværelse, børnebørn, helbred, hobbyer, rejser, frivilligt arbejde, livsvisdom",
    morningActivities: "formiddagsscener handler om morgenkaffe, gåture, lægebesøg, indkøb, besøge venner",
    afternoonActivities: "eftermiddags/aften-scener handler om hobbyer, børnebørn, havearbejde, TV, madlavning, sociale klubber",
    weekendNote: "Weekend-scener kan ligne hverdage — men med mere familiebesøg, udflugter og rolige aktiviteter",
    toneNote: "Hold tonen varm, humoristisk og livsbekræftende. Visdom, nostalgi, nye opdagelser og livets små glæder",
    exampleChoice: "👴 Tag børnebørnene med i Tivoli",
  };
}

function buildSystemPrompt(age) {
  const ctx = getAgeContext(age);
  return `Du er en fortæller i et ${ctx.label}eventyrspil. Du genererer interaktive scener om realistisk liv i Danmark — ${ctx.setting}.

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
- Hver valgtekst SKAL starte med en relevant emoji (f.eks. "${ctx.exampleChoice}")
- Scenetekst SKAL bruge emojis naturligt (2-4 per scene) og adskille afsnit med \\n\\n
- Stat-ændringer skal være heltal mellem -20 og +20, inkluder kun ikke-nul stats
- Hvert valg skal påvirke 1-3 stats meningsfuldt
- De 3 valg skal føles ægte forskellige — ét risikofyldt/dristigt, ét sikkert/forsigtigt, ét socialt/kreativt
- ${ctx.toneNote}
- Brug spillerens navn, venners navne og familiemedlemmers navne naturligt i historien
- Hvis spilleren har angivet skole/arbejde, brug det som den primære setting for formiddagsscener — korrekte navne, kollegaer/klassekammerater, realistiske situationer derfra
- Hvis spilleren har angivet fritidsinteresser, integrer dem naturligt i scener — de kan dukke op som aktiviteter, samtaleemner, eller valgmuligheder
- Referer til spillerens hjemby når det passer
- Referer til karakterer og begivenheder fra tidligere i historien for kontinuitet
- Hver scene repræsenterer en halv dag (formiddag eller eftermiddag/aften)
- Scenen SKAL passe til tidspunktet: ${ctx.morningActivities}. ${ctx.afternoonActivities}
- Overvej spillerens nuværende stats — lavt helbred = træt/syg, få kroner = pengemangel, mange venner = populær osv.
- Spillet varer præcis {{TOTAL_DAYS}} dage ({{TOTAL_SCENES}} halve dage / scener). Du SKAL ALDRIG slutte historien før scene {{TOTAL_SCENES}}. På PRÆCIS scene {{TOTAL_SCENES}} SKAL du lave en afslutning.
- ${ctx.weekendNote}
- Hvis spillet er længere end 7 dage, kan historien bygge videre på relationer og konsekvenser fra tidligere uger
- For afslutningsscener: sæt "ending": true og tilføj "endingTitle" (kreativ titel med emoji) og "endingType" ("good", "neutral" eller "bad"). Afslutningsscener har ingen choices — brug tom array []
- Afslutningsscenetekst skal opsummere perioden dramatisk og tilfredsstillende med emojis
- Gør valg meningsfulde med ægte afvejninger`;
}

function buildProfilePrompt(age) {
  const a = parseInt(age, 10);
  let ageDesc = "en person";
  if (a && a <= 5) ageDesc = "et lille barn";
  else if (a && a <= 12) ageDesc = "et barn";
  else if (a && a <= 17) ageDesc = "en teenager";
  else if (a && a <= 25) ageDesc = "en ung voksen";
  else if (a && a <= 60) ageDesc = "en voksen";
  else if (a && a > 60) ageDesc = "en senior";

  return `Du er en personlighedsanalytiker. Baseret på ${ageDesc}s valg i løbet af en periode, skal du skabe en personlighedsprofil.

Du SKAL svare med valid JSON:
{
  "title": "En kreativ titel for personlighedstypen med emoji (f.eks. '🦁 Den Modige Leder')",
  "traits": ["egenskab1", "egenskab2", "egenskab3", "egenskab4", "egenskab5"],
  "description": "En kort, positiv og opløftende personlighedsbeskrivelse på 3-4 sætninger på dansk. Vær specifik om hvad valgene afslører om personligheden. Brug emojis.",
  "imagePrompt": "A fun exaggerated caricature drawing of ${a && a <= 5 ? "a small child" : a && a <= 12 ? "a child" : a && a <= 17 ? "a teenager" : a && a <= 25 ? "a young adult" : a && a <= 60 ? "an adult" : a && a > 60 ? "an elderly person" : "a person"} who embodies [personality type]. Caricature style with big head, expressive oversized features, and humorous exaggeration. [Include specific visual details based on the personality traits — e.g. adventurous type holding a skateboard, bookworm surrounded by floating books, social butterfly with many hands reaching out]. Hand-drawn pen and ink caricature style with watercolor splashes of vibrant color. White background. No text or words."
}

Analyser disse valg og stats og lav en profil:`;
}

export async function generateScene(apiKey, stats, history, playerProfile, sceneNumber, totalScenes) {
  const totalDays = totalScenes / 2;
  const profileStr = [
    `Navn: ${playerProfile.name}`,
    playerProfile.age ? `Alder: ${playerProfile.age}` : null,
    playerProfile.gender ? `Køn: ${playerProfile.gender}` : null,
    playerProfile.occupation ? `Skole/Arbejde: ${playerProfile.occupation}` : null,
    playerProfile.hobbies ? `Fritidsinteresser: ${playerProfile.hobbies}` : null,
    playerProfile.town ? `Hjemby: ${playerProfile.town}` : null,
    playerProfile.friends ? `Venner: ${playerProfile.friends}` : null,
    playerProfile.family ? `Familie: ${playerProfile.family}` : null,
  ].filter(Boolean).join("\n");

  const prompt = buildSystemPrompt(playerProfile.age)
    .replace("{{PLAYER_PROFILE}}", profileStr)
    .replace(/\{\{TOTAL_DAYS\}\}/g, totalDays)
    .replace(/\{\{TOTAL_SCENES\}\}/g, totalScenes);

  const day = Math.floor((sceneNumber - 1) / 2) + 1;
  const timeOfDay = sceneNumber % 2 === 1 ? "formiddag" : "eftermiddag/aften";
  const dayNames = ["mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag", "søndag"];
  const dayName = dayNames[(day - 1) % 7];
  const weekNumber = Math.floor((day - 1) / 7) + 1;

  const userMessage = `Nuværende stats: Helbred=${stats.health}, Humør=${stats.happiness}, Venner=${stats.friends}, Kroner=${stats.kroner}

Scene ${sceneNumber} af ${totalScenes} — Uge ${weekNumber}, Dag ${day} (${dayName}), ${timeOfDay}
${sceneNumber === totalScenes ? "⚠️ DETTE ER DEN SIDSTE SCENE! Du SKAL lave en afslutning med ending: true!" : `Der er ${totalScenes - sceneNumber} scener tilbage.`}

Valg indtil nu (${history.length} i alt):
${history.length === 0 ? "Ingen — dette er åbningsscenen. Start " + totalDays + " nye dage i " + (playerProfile.town || "byen") + " på en mandag morgen." : history.map((h, i) => `${i + 1}. "${h.choiceText}"`).join("\n")}

Generer næste scene. Husk: 3 valgmuligheder, emojis, dansk, afsnit adskilt af \\n\\n.${sceneNumber === totalScenes ? " AFSLUT HISTORIEN!" : ""}`;

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

export async function generatePersonality(apiKey, stats, history, playerProfile, totalDays) {
  const choicesSummary = history.map((h, i) => `${i + 1}. "${h.choiceText}"`).join("\n");

  const userMessage = `Spiller: ${playerProfile.name}${playerProfile.age ? `, ${playerProfile.age} år` : ""}
Endelige stats: Helbred=${stats.health}, Humør=${stats.happiness}, Venner=${stats.friends}, Kroner=${stats.kroner}

Valg i løbet af ${totalDays} dage:
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
        { role: "system", content: buildProfilePrompt(playerProfile.age) },
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
