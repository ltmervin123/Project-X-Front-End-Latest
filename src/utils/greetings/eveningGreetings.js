class EveningGreeting {
  constructor(name) {
    this.name = name;
  }

  // Get a random greeting
  getGreeting() {
    const greetings = [
      `Good evening, ${this.name}! How do you usually spend your evenings?`,
      `Good evening, ${this.name}! How has your day gone so far?`,
      `Good evening, ${this.name}! How are you feeling after today’s activities?`,
      `Good evening, ${this.name}! How do you unwind after a busy day?`,
      `Good evening, ${this.name}! What’s been the most interesting part of your day?`,
      `Good evening, ${this.name}! How are you feeling about today’s progress?`,
      `Good evening, ${this.name}! How do you plan for the day ahead during evenings like this?`,
      `Good evening, ${this.name}! What are your thoughts on today’s events?`,
      `Good evening, ${this.name}! How do you stay motivated as the day ends?`,
      `Good evening, ${this.name}! How do you balance work and relaxation in the evening?`,
      `Good evening, ${this.name}! How do you typically reflect on your day?`,
      `Good evening, ${this.name}! What’s your favorite part of winding down in the evening?`,
      `Good evening, ${this.name}! How do you prepare yourself for a restful night?`,
      `Good evening, ${this.name}! How was your evening commute?`,
      `Good evening, ${this.name}! How do you maintain focus during late hours?`,
      `Good evening, ${this.name}! What strategies do you use to stay organized for the next day?`,
      `Good evening, ${this.name}! How are you feeling about your achievements today?`,
      `Good evening, ${this.name}! What’s your routine to wrap up the day effectively?`,
      `Good evening, ${this.name}! How do you wind down after a long day?`,
      `Good evening, ${this.name}! What’s something you look forward to in the evenings?`,
      `Good evening, ${this.name}! How do you manage your tasks toward the end of the day?`,
      `Good evening, ${this.name}! How are you feeling as you prepare for tomorrow?`,
      `Good evening, ${this.name}! What lessons have you taken from today’s experiences?`,
      `Good evening, ${this.name}! How do you stay productive in the evenings?`,
      `Good evening, ${this.name}! What’s the highlight of your evening so far?`,
      `Good evening, ${this.name}! How do you usually close out your day?`,
      `Good evening, ${this.name}! How do you feel about balancing relaxation and productivity in the evening?`,
      `Good evening, ${this.name}! How do you maintain a positive outlook as the day ends?`,
      `Good evening, ${this.name}! What’s something you’ve learned today that stands out?`,
      `Good evening, ${this.name}! How do you stay motivated to tackle tomorrow?`,
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
}

export default EveningGreeting;