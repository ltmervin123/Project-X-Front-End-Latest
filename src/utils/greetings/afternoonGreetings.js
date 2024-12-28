export default class AfterGreeting {
  constructor(name) {
    this.name = { name };
  }

  greetings = [
    `Good afternoon, ${this.name}}! How’s your day going so far?`,
    `Good afternoon, ${this.name}}! How are you feeling as we reach the midpoint of the day?`,
    `Good afternoon, ${this.name}}! How’s your energy holding up?`,
    `Good afternoon, ${this.name}}! How are you managing the afternoon hustle?`,
    `Good afternoon, ${this.name}}! How are you feeling about the rest of the day?`,
    `Good afternoon, ${this.name}}! How’s your productivity been this afternoon?`,
    `Good afternoon, ${this.name}}! How are you doing as we approach the evening?`,
    `Good afternoon, ${this.name}}! How’s your mood this fine afternoon?`,
    `Good afternoon, ${this.name}}! How are you feeling about your progress today?`,
    `Good afternoon, ${this.name}}! How’s your day treating you so far?`,
    `Good afternoon, ${this.name}}! How are you holding up in this busy day?`,
    `Good afternoon, ${this.name}}! How’s your afternoon shaping up?`,
    `Good afternoon, ${this.name}}! How are you feeling as the day unfolds?`,
    `Good afternoon, ${this.name}}! How’s your focus this afternoon?`,
    `Good afternoon, ${this.name}}! How are you feeling about the tasks ahead?`,
    `Good afternoon, ${this.name}}! How’s your day been treating you?`,
    `Good afternoon, ${this.name}}! How are you feeling as we move through the day?`,
    `Good afternoon, ${this.name}}! How’s your energy level this afternoon?`,
    `Good afternoon, ${this.name}}! How are you feeling about the week so far?`,
    `Good afternoon, ${this.name}}! How’s your afternoon going, any highlights?`,
  ];

  // Get a random greeting
  getGreeting() {
    return this.greetings[Math.floor(Math.random() * this.greetings.length)];
  }
}
