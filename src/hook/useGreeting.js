import { useAuthContext } from "./useAuthContext";
import { AfterGreeting } from "../utils/greetings/afternoonGreetings";
import { MorningGreeting } from "../utils/greetings/morningGreetings";
import { EveningGreeting } from "../utils/greetings/eveningGreetingsGreetings";

export const useGreeting = () => {
  const { user } = useAuthContext();

  const getTimePerdiod = () => {
    const date = new Date();
    const hours = date.getHours(); // 0-23

    if (hours >= 5 && hours < 12) {
      return "morning";
    } else if (hours >= 12 && hours < 15) {
      return "afternoon";
    } else if (hours >= 17 && hours < 21) {
      return "evening";
    } else {
      return "night";
    }
  };

  const firstGreeting = () => {
    const time = getTimePerdiod();

    switch (time) {
      case "morning":
        const morningGreeting = MorningGreeting(user);
        return morningGreeting.getGreeting();
      case "afternoon":
        const afternoonGreeting = AfterGreeting(user);
        return afternoonGreeting.getGreeting();
      case "evening":
        const eveningGreeting = EveningGreeting(user);
        return eveningGreeting.getGreeting();
      case "night":
        return `Hello! ${user} Thank you for accommodating this interview time.`;
      default:
        throw new Error("Invalid time period");
    }
  };

  return { firstGreeting };
};
