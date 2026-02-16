export const INITIAL_STATS = {
  health: 70,
  happiness: 60,
  friends: 3,
  dollars: 20,
};

const story = {
  start: {
    text: "It's Monday morning. Your alarm goes off way too early. You have a math test today that you barely studied for. What do you do?",
    choices: [
      {
        text: "Drag yourself out of bed and cram before school",
        next: "cram",
        stats: { health: -5, happiness: -5 },
      },
      {
        text: "Skip school and go back to sleep",
        next: "skip_school",
        stats: { health: +10, happiness: +5, dollars: -5 },
      },
    ],
  },

  cram: {
    text: "You chug some coffee and speed-read your notes. At school, you manage a B- on the test. Not bad! Your friend Maya catches you in the hall. 'Hey, a bunch of us are going to the mall after school. You in?'",
    choices: [
      {
        text: "Go to the mall with friends",
        next: "mall",
        stats: { happiness: +10, friends: +1, dollars: -15 },
      },
      {
        text: "Head home to rest, you're exhausted",
        next: "rest_home",
        stats: { health: +10, happiness: +5 },
      },
    ],
  },

  skip_school: {
    text: "You sleep until noon — it feels amazing. But then you see 12 missed texts. Your friend Jordan says the teacher is furious. You also missed a group project meeting. Your phone buzzes again — it's your mom asking why the school called.",
    choices: [
      {
        text: "Sneak out before mom gets home and meet Jordan",
        next: "sneak_out",
        stats: { happiness: +5, friends: +1, health: -5 },
      },
      {
        text: "Stay home and face the consequences",
        next: "face_mom",
        stats: { happiness: -10, health: +5 },
      },
    ],
  },

  mall: {
    text: "The mall is packed. You grab food court pizza with Maya, Jordan, and a few others. Someone suggests checking out the new thrift store. Then Maya whispers, 'I think I saw someone shoplifting over there...'",
    choices: [
      {
        text: "Mind your own business and keep shopping",
        next: "keep_shopping",
        stats: { dollars: -10, happiness: +5 },
      },
      {
        text: "Tell a store employee what you saw",
        next: "tell_employee",
        stats: { happiness: -5, friends: -1 },
      },
    ],
  },

  rest_home: {
    text: "You crash on the couch and binge a show. Around 6pm, you get a text from a classmate: 'Hey, I'm starting a small tutoring business. Want to help? I'll split the money.' Could be cool, but it means less free time.",
    choices: [
      {
        text: "Say yes to the tutoring gig",
        next: "tutoring",
        stats: { dollars: +20, friends: +1, happiness: -5 },
      },
      {
        text: "Pass on it and enjoy your evening",
        next: "chill_evening",
        stats: { happiness: +10, health: +5 },
      },
    ],
  },

  sneak_out: {
    text: "You meet Jordan at the park. They're stressed about the group project too. 'We can still pull it together if we work tonight,' Jordan says. But you also notice a pickup basketball game happening nearby.",
    choices: [
      {
        text: "Work on the project with Jordan",
        next: "project_work",
        stats: { friends: +1, happiness: -5, dollars: +5 },
      },
      {
        text: "Join the basketball game first",
        next: "basketball",
        stats: { health: +10, happiness: +10, friends: +2 },
      },
    ],
  },

  face_mom: {
    text: "Mom is disappointed but appreciates your honesty. She grounds you for the week but says, 'At least you told the truth.' Later that night, you study hard and actually start understanding the math. Your phone buzzes — a classmate is selling concert tickets cheap.",
    choices: [
      {
        text: "Buy the concert tickets (you'll figure out the grounding later)",
        next: "concert_tickets",
        stats: { dollars: -15, happiness: +15 },
      },
      {
        text: "Stay focused and keep studying",
        next: "study_hard",
        stats: { happiness: +5, health: +5 },
      },
    ],
  },

  keep_shopping: {
    text: "You find an awesome vintage jacket at the thrift store. The group hangs out until the mall closes, laughing and trying on ridiculous outfits. It's one of those perfect afternoons. On the bus home, Maya says, 'We should do this every week.'",
    ending: true,
    endingTitle: "The Good Times",
    endingType: "good",
  },

  tell_employee: {
    text: "The employee thanks you, but it turns out it was just a kid putting something back on the wrong shelf. Maya gives you a weird look. 'Why'd you snitch like that?' The vibe is a bit off for the rest of the day, but you know you tried to do the right thing. On the walk home, a different friend, Alex, texts you: 'Hey, heard what happened. Respect.'",
    ending: true,
    endingTitle: "Doing the Right Thing",
    endingType: "neutral",
  },

  tutoring: {
    text: "The tutoring gig takes off! You and your classmate help three younger kids with math every Tuesday and Thursday. Within a couple weeks, you've made decent money, gotten better at math yourself, and even made new friends. Your teacher notices and writes you a recommendation letter.",
    ending: true,
    endingTitle: "The Side Hustle",
    endingType: "good",
  },

  chill_evening: {
    text: "You spend the evening drawing, listening to music, and texting friends. It's nothing special, but it feels exactly right. Sometimes the best days are the quiet ones. You go to bed early and wake up feeling great for once.",
    ending: true,
    endingTitle: "Peace and Quiet",
    endingType: "good",
  },

  project_work: {
    text: "You and Jordan crank out an amazing presentation at the library. The teacher is impressed enough to only dock a few points for the missed meeting. Jordan buys you a smoothie as thanks. 'You really saved us,' they say. You head home tired but proud.",
    ending: true,
    endingTitle: "Teamwork Pays Off",
    endingType: "good",
  },

  basketball: {
    text: "The game is incredible — you nail a three-pointer and everyone cheers. You make friends with some kids from another school. But when you check your phone, Jordan's sent five messages. The project is due tomorrow and it's barely started. You rush to Jordan's house and pull an all-nighter. You're wrecked the next day, but the project gets a passing grade.",
    ending: true,
    endingTitle: "Living on the Edge",
    endingType: "neutral",
    endingStats: { health: -15, friends: -1 },
  },

  concert_tickets: {
    text: "You buy the tickets and hide them under your mattress. Two weeks later, you convince mom to let you go by acing a surprise quiz. The concert is UNREAL. You scream every lyric and make friends with the people next to you. Totally worth the risk.",
    ending: true,
    endingTitle: "Worth the Risk",
    endingType: "good",
    endingStats: { friends: +2 },
  },

  study_hard: {
    text: "You study every night that week. When the next test comes, you crush it — 95%. Mom lifts the grounding early. 'I'm proud of you,' she says. It feels better than you expected. You celebrate by treating yourself to your favorite takeout.",
    ending: true,
    endingTitle: "The Comeback",
    endingType: "good",
    endingStats: { dollars: -10, happiness: +10 },
  },
};

export default story;
