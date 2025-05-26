exports.scenarios = [
    "You wake with a start beneath towering pines, your clothes torn and a strange symbol burned into your palm. No memory. Just the forest—and the feeling you're being watched.",
    "A thick envelope slides under your door, sealed with wax and marked with your name. Inside: an invitation to a private island, and a single phrase—'Find the gate before sunset.'",
    "As you rearrange your room, a hollow thud behind the bookcase reveals a hidden door. It creaks open to a dark stairwell that spirals downward, lit by flickering blue torches.",
    "Late one night, your phone buzzes with a message: 'DO NOT GO TO SCHOOL TOMORROW.' It's unsigned, timestamped tomorrow morning—and the sender is your own number.",
    "Time freezes around you during a lightning strike. For sixty seconds, you're the only one who can move. When it ends, a stranger in a black suit is watching you closely.",
    "A cat with mismatched eyes appears at your doorstep every evening. One day, it speaks: 'You’ve been chosen to guard the Rift. Follow me—no time to explain.'",
    "The thunderstorm intensifies as you take shelter in your basement. When you emerge, your neighborhood is gone—replaced by an endless desert and a sky of swirling purple.",
    "At your grandfather’s funeral, you're handed a brass key and a map with only two words written across it: 'Everywhere once.' That night, your closet door unlocks by itself.",
    "You're the only one who realizes the same day is repeating. Everyone else acts like nothing's wrong—except for the girl at the diner, who stares at you and whispers, 'You're awake too.'",
    "While exploring an abandoned museum, you brush dust off a strange artifact. It pulses and binds to your wrist. A voice fills your mind: 'Host accepted. Trial begins now.'"
];

const scenarios = exports.scenarios;
exports.getRandomScenario = () => {
    const randomIndex = Math.floor(Math.random() * scenarios.length);
    return scenarios[randomIndex];
};
