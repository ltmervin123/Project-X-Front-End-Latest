class MorningGreeting {
  constructor(name) {
    this.name = name;
  }

  // Get a random greeting
  getGreeting() {
    const greetings = [
      `Good morning, ${this.name}! How are you feeling as we start this new day?`,
      `Good morning, ${this.name}! How’s your morning treating you so far?`,
      `Good morning, ${this.name}! How are you doing today?`,
      `Good morning, ${this.name}! How did you sleep last night?`,
      `Good morning, ${this.name}! How’s your energy level this morning?`,
      `Good morning, ${this.name}! How are you adjusting to the day ahead?`,
      `Good morning, ${this.name}! How are you feeling about today’s agenda?`,
      `Good morning, ${this.name}! How’s your morning routine going?`,
      `Good morning, ${this.name}! How are you finding the start of your day?`,
      `Good morning, ${this.name}! How are you feeling as the sun rises?`,
      `Good morning, ${this.name}! How’s your mood this fine morning?`,
      `Good morning, ${this.name}! Are you ready to tackle the day?`,
      `Good morning, ${this.name}! How are you feeling about the week so far?`,
      `Good morning, ${this.name}! How’s your coffee treating you this morning?`,
      `Good morning, ${this.name}! How are you feeling as we kick off the day?`,
      `Good morning, ${this.name}! How’s your morning been so far?`,
      `Good morning, ${this.name}! How are you feeling about the tasks ahead?`,
      `Good morning, ${this.name}! How’s your day shaping up so far?`,
      `Good morning, ${this.name}! How are you feeling as we dive into today?`,
      `Good morning, ${this.name}! How’s your spirit this beautiful morning?`,
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
}

export default MorningGreeting;
