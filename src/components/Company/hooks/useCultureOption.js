const cultureOptions = {
  Paced: {
    fastPaced: {
      label: "Fast-paced",
      desc: "Thrives in high-speed, rapidly changing environments where decisions are made quickly and multitasking is common.",
    },
    midPaced: {
      label: "Mid-paced",
      desc: "Balances urgency with thoughtfulness, adapting to fast or slow environments depending on the situation.",
    },
    lowPaced: {
      label: "Low-paced",
      desc: "Prefers deliberate planning and steady execution, valuing stability and thoroughness over speed.",
    },
  },
  "Work Style": {
    collaborative: {
      label: "Collaborative",
      desc: "Values teamwork, open communication, and shared responsibility in achieving goals.",
    },
    independent: {
      label: "Independent",
      desc: "Prefers autonomy and individual responsibility, thriving in environments with minimal oversight.",
    },
  },

  Approach: {
    innovative: {
      label: "Innovative / Creative",
      desc: "Encourages experimentation, new ideas, and thinking outside the box. Often embraces change.",
    },
    processDriven: {
      label: "Process-driven",
      desc: "Emphasizes established procedures, consistency, and predictability to maintain quality and efficiency.",
    },
  },

  Balanced: {
    workLifeBalance: {
      label: "Work-life balance focused",
      desc: "Values sustainable working hours and personal time, aiming for harmony between work and life.",
    },
    workCentric: {
      label: "Work-centric / High-intensity culture",
      desc: "Prioritizes dedication and performance, often expecting high availability and energy.",
    },
  },

  Communication: {
    transparent: {
      label: "Transparent / Open communication",
      desc: "Promotes honest, frequent, and inclusive communication across all levels of the organization.",
    },
    discreet: {
      label: "Discreet / Selective Communication",
      desc: "Shares information strategically and selectively, often to preserve clarity, control, or confidentiality.",
    },
  },

  Organization: {
    structured: {
      label: "Structured",
      desc: "Operates within clear rules, roles, and systems that provide stability and reduce ambiguity.",
    },
    flexible: {
      label: "Flexible / Adaptive",
      desc: "Responds quickly to change, embraces ambiguity, and adjusts plans fluidly when needed.",
    },
  },
};

export const useCultureOptions = () => {
  return {
    cultureOptions,
  };
};
