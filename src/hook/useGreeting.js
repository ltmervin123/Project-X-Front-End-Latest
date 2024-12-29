import { useAuthContext } from "./useAuthContext";
import AfterGreeting from "../utils/greetings/afternoonGreetings";
import MorningGreeting from "../utils/greetings/morningGreetings";
import EveningGreeting from "../utils/greetings/eveningGreetings";

export const useGreeting = () => {
  const { user } = useAuthContext();
  const name = user.name.split(" ")[0];

  const getTimePerdiod = () => {
    const date = new Date();
    const hours = date.getHours(); // 0-23

    // //v1
    // if (hours >= 0 && hours < 12) {
    //   return "morning";
    // } else if (hours >= 12 && hours < 15) {
    //   return "afternoon";
    // } else if (hours >= 15 && hours < 23) {
    //   return "evening";
    // } else {
    //   return "night";
    // }

    //v2
    if (hours >= 0 && hours < 12) {
      return "morning";
    } else if (hours >= 12 && hours < 15) {
      return "afternoon";
    } else {
      return "evening";
    }
  };

  const firstGreeting = () => {
    const time = getTimePerdiod();

    switch (time) {
      case "morning":
        const morningGreeting = new MorningGreeting(name);
        return morningGreeting.getGreeting();
      case "afternoon":
        const afternoonGreeting = new AfterGreeting(name);
        return afternoonGreeting.getGreeting();
      case "evening":
        const eveningGreeting = new EveningGreeting(name);
        return eveningGreeting.getGreeting();
      case "night":
        return `Hello! ${name} Thank you for accommodating this interview time.`;
      default:
        throw new Error("Invalid time period");
    }
  };

  return { firstGreeting };
};
