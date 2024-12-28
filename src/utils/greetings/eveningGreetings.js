export default class EveningGreeting {
  constructor(name) {
    this.name = name;
  }

  greetings = [
    `Good evening, ${this.name}! How has your day been?`,
    `Good evening, ${this.name}! How are you feeling as the day winds down?`,
    `Good evening, ${this.name}! How’s your mood this evening?`,
    `Good evening, ${this.name}! How are you reflecting on today?`,
    `Good evening, ${this.name}! How are you feeling as we approach the end of the day?`,
    `Good evening, ${this.name}! How’s your energy as the sun sets?`,
    `Good evening, ${this.name}! How are you doing as the day comes to a close?`,
    `Good evening, ${this.name}! How’s your evening shaping up?`,
    `Good evening, ${this.name}! How are you feeling about the day’s accomplishments?`,
    `Good evening, ${this.name}! How’s your spirit as we wrap up the day?`,
    `Good evening, ${this.name}! How are you feeling about tomorrow?`,
    `Good evening, ${this.name}! How’s your evening routine treating you?`,
    `Good evening, ${this.name}! How are you feeling as you unwind?`,
    `Good evening, ${this.name}! How’s your day been overall?`,
    `Good evening, ${this.name}! How are you feeling as you reflect on today?`,
    `Good evening, ${this.name}! How’s your mood as the day ends?`,
    `Good evening, ${this.name}! How are you feeling about the week ahead?`,
    `Good evening, ${this.name}! How’s your evening going so far?`,
    `Good evening, ${this.name}! How are you feeling as you relax tonight?`,
    `Good evening, ${this.name}! How’s your day been, any highlights to share?`,
  ];

  // Get a random greeting
  getGreeting() {
    return this.greetings[Math.floor(Math.random() * this.greetings.length)];
  }
}
