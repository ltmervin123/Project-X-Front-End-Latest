class MorningGreeting {
  constructor(name, interviewer) {
    this.name = name;
    this.interviewer = interviewer;
  }

  // Get a random greeting
  getGreeting() {
    const greetings = [
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. How are you feeling about the day ahead?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. How did you prepare for today’s session?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. How was your commute here?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. How are you feeling this morning?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. What are your thoughts about today’s discussion?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. How did you organize your morning so far?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. How’s your confidence level this morning?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. Did you have breakfast before coming in?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. How are you finding the start of the day?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. How do you usually approach mornings like this?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. How has your morning routine been today?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. Did you have time to review anything for today?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. How are you balancing your energy for today?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. How do you feel about starting the day with this interview?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. How do you keep yourself motivated in the morning?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. How has your experience been leading up to today?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. How do you feel about tackling challenges today?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. What’s your focus for today?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. How do you prepare yourself mentally for mornings like this?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. How are you feeling as we get started?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. How do you usually start your mornings?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. How do you prioritize your morning tasks?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. What’s your strategy for starting strong today?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. How do you ensure a productive start to your day?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. How’s your mindset this morning?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. What’s the first thing you focused on today?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. How has your morning been so far?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. How are you feeling as you begin this new day?`,
      `Good morning, ${this.name}! I'm ${this.interviewer}, your interviewer for today. What’s been the highlight of your morning so far?`,
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
}

export default MorningGreeting;
