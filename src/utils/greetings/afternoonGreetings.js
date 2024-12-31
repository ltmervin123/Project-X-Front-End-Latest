class AfterNoonGreeting {
  constructor(name) {
    this.name = name;
  }

  // Get a random greeting
  getGreeting() {
    const greetings = [
      `Good afternoon, ${this.name}! I hope your day is going well so far.`,
      `Good afternoon, ${this.name}! How’s everything progressing today?`,
      `Good afternoon, ${this.name}! I hope you’re having a productive day.`,
      `Good afternoon, ${this.name}! How’s your energy holding up this afternoon?`,
      `Good afternoon, ${this.name}! I hope you’re feeling good as the day moves forward.`,
      `Good afternoon, ${this.name}! How’s your workload treating you today?`,
      `Good afternoon, ${this.name}! I hope everything is on track for you.`,
      `Good afternoon, ${this.name}! How’s your day shaping up so far?`,
      `Good afternoon, ${this.name}! I hope you’re enjoying a smooth and productive day.`,
      `Good afternoon, ${this.name}! How’s your motivation this afternoon?`,
      `Good afternoon, ${this.name}! I hope you’ve had some great moments today.`,
      `Good afternoon, ${this.name}! How’s your progress on today’s tasks?`,
      `Good afternoon, ${this.name}! I hope the day is treating you kindly.`,
      `Good afternoon, ${this.name}! How are you finding today’s challenges?`,
      `Good afternoon, ${this.name}! I hope you’ve had a fulfilling day so far.`,
      `Good afternoon, ${this.name}! How’s everything coming along this afternoon?`,
      `Good afternoon, ${this.name}! I hope your afternoon is as bright as you are.`,
      `Good afternoon, ${this.name}! How’s your mindset this afternoon?`,
      `Good afternoon, ${this.name}! I hope your schedule is going smoothly.`,
      `Good afternoon, ${this.name}! How’s your focus this afternoon?`,
      `Good afternoon, ${this.name}! I hope your lunch recharged you for the rest of the day.`,
      `Good afternoon, ${this.name}! How’s your enthusiasm for today’s tasks?`,
      `Good afternoon, ${this.name}! I hope you’re finding moments to enjoy your day.`,
      `Good afternoon, ${this.name}! How’s your energy after a busy morning?`,
      `Good afternoon, ${this.name}! I hope everything is falling into place today.`,
      `Good afternoon, ${this.name}! How’s your progress with your goals?`,
      `Good afternoon, ${this.name}! I hope you’re feeling accomplished this afternoon.`,
      `Good afternoon, ${this.name}! How’s your productivity this afternoon?`,
      `Good afternoon, ${this.name}! I hope you’re wrapping up the day on a high note.`,
      `Good afternoon, ${this.name}! How are you feeling about the rest of the day?`,
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
}

export default AfterNoonGreeting;
