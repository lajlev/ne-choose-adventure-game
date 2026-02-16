const story = {
  start: {
    text: "You wake up in a dark forest. The trees tower above you, their branches blocking out most of the moonlight. A narrow path splits in two directions.",
    choices: [
      { text: "Take the left path toward a faint glow", next: "glow" },
      { text: "Take the right path into deeper darkness", next: "darkness" },
    ],
  },
  glow: {
    text: "You follow the glow and find a small cottage with warm light spilling from its windows. Smoke curls from the chimney. The door is slightly ajar.",
    choices: [
      { text: "Knock on the door", next: "knock" },
      { text: "Peek through the window first", next: "peek" },
    ],
  },
  darkness: {
    text: "The path grows narrower. You hear running water ahead. Suddenly, you stumble upon an old stone bridge over a rushing river. On the bridge sits a cloaked figure.",
    choices: [
      { text: "Approach the figure and say hello", next: "greet" },
      { text: "Try to sneak past them", next: "sneak" },
    ],
  },
  knock: {
    text: "An old woman opens the door with a kind smile. 'Come in, traveler! I've been expecting you.' She offers you a warm bowl of stew and a seat by the fire.",
    choices: [
      { text: "Accept her hospitality", next: "accept" },
      { text: "Ask how she was expecting you", next: "question" },
    ],
  },
  peek: {
    text: "Through the window you see shelves lined with glowing bottles, strange maps on the walls, and a black cat staring directly at you. The cat meows loudly.",
    choices: [
      { text: "Quickly knock on the door before you're caught", next: "knock" },
      { text: "Back away slowly and return to the forest", next: "forest_return" },
    ],
  },
  greet: {
    text: "The figure lowers their hood, revealing an elf with silver hair. 'Few dare to walk this path at night. You have courage.' They offer you a small, glowing stone. 'Take this — you'll need it where you're going.'",
    choices: [
      { text: "Take the stone and cross the bridge", next: "stone_cross" },
      { text: "Refuse politely and ask for directions instead", next: "directions" },
    ],
  },
  sneak: {
    text: "You try to tiptoe past, but the old bridge creaks loudly. The figure turns. 'No need to hide, traveler. I mean you no harm.' They chuckle softly.",
    choices: [
      { text: "Apologize and introduce yourself", next: "greet" },
      { text: "Run across the bridge", next: "run_bridge" },
    ],
  },
  accept: {
    text: "The stew warms you to your bones. The old woman tells you tales of the forest — of hidden treasures and ancient guardians. As dawn breaks, she hands you a hand-drawn map. 'Your adventure is just beginning,' she says with a wink.",
    ending: true,
    endingType: "good",
    endingTitle: "A Warm Welcome",
  },
  question: {
    text: "'The forest tells me things,' she says mysteriously. 'It told me someone brave would come tonight.' She opens a trunk and pulls out a shimmering cloak. 'Wear this. It will protect you on your journey ahead.'",
    ending: true,
    endingType: "good",
    endingTitle: "The Gift of Foresight",
  },
  forest_return: {
    text: "You back away into the forest. The trees seem to shift around you, and soon you're completely lost. After hours of wandering, you find yourself back where you started. The sun is rising. You survived the night, but the mystery of the cottage remains unsolved.",
    ending: true,
    endingType: "neutral",
    endingTitle: "Lost and Found",
  },
  stone_cross: {
    text: "The stone pulses with warm light as you cross the bridge. On the other side, the forest opens into a moonlit meadow filled with fireflies. In the center stands an ancient tree with a door carved into its trunk. You press the stone against it, and the door swings open, revealing a staircase spiraling down into golden light.",
    ending: true,
    endingType: "good",
    endingTitle: "The Hidden Realm",
  },
  directions: {
    text: "The elf nods thoughtfully. 'The nearest town is half a day's walk east. But if you seek something more... follow the river north.' You thank them and head east toward safety. Sometimes the wisest adventure is knowing when to rest.",
    ending: true,
    endingType: "neutral",
    endingTitle: "The Cautious Traveler",
  },
  run_bridge: {
    text: "You sprint across the bridge. The figure calls after you but you don't stop. On the other side, you trip on a root and tumble down a hill, landing in a pile of soft moss. You're bruised but safe. Above you, the stars shine bright. You laugh at yourself and make camp for the night.",
    ending: true,
    endingType: "neutral",
    endingTitle: "A Hasty Exit",
  },
};

export default story;
