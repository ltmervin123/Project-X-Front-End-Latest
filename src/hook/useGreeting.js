import { useAuthContext } from "./useAuthContext";
import AfterNoonGreeting from "../utils/greetings/afternoonGreetings";
import MorningGreeting from "../utils/greetings/morningGreetings";
import EveningGreeting from "../utils/greetings/eveningGreetings";

export const useGreeting = () => {
  const { user } = useAuthContext();
  const name = user.name.split(" ")[0];

  const getTimePerdiod = () => {
    const date = new Date();
    const hours = date.getHours(); // 0-23

    // 0-11:59 morning, 12-16:59 afternoon, 17-23 evening
    if (hours >= 0 && hours < 12) {
      return "morning";
    } else if (hours >= 12 && hours < 18) {
      return "afternoon";
    } else {
      return "evening";
    }
  };

  const firstGreeting = (interviewer) => {
    const time = getTimePerdiod();

    switch (time) {
      case "morning":
        const morningGreeting = new MorningGreeting(name, interviewer);
        return morningGreeting.getGreeting();
      case "afternoon":
        const afternoonGreeting = new AfterNoonGreeting(name, interviewer);
        return afternoonGreeting.getGreeting();
      case "evening":
        const eveningGreeting = new EveningGreeting(name, interviewer);
        return eveningGreeting.getGreeting();
      case "night":
        return `Hello! ${name} Thank you for accommodating this interview time.`;
      default:
        throw new Error("Invalid time period");
    }
  };

  return { firstGreeting };
};
