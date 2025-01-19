import introJs from "intro.js";
import "intro.js/introjs.css";

const PopupGuide = () => {
  introJs()
    .setOptions({
      steps: [
        {
          intro: "Welcome to the Video Recording Interface!",
        },
        {
          element: "#videoArea",
          intro: "This is where you will see yourself while recording.",
        },
        {
          element: "#startButton",
          intro: "Click this button to start recording your responses.",
        },
        {
          element: "#muteButton",
          intro: "Use this button to mute or unmute your microphone.",
        },
        {
          element: "#cameraButton",
          intro: "Toggle your camera on or off using this button.",
        },
        {
          element: "#timer",
          intro: "This timer shows the time remaining for your response.",
        },
        {
          element: ".mute-indicator",
          intro: "Mute and Unmute indicator.",
        },
        {
          element: "#tipsContainer",
          intro: "Here are some tips to help you perform better in your interview.",
        },
        {
          element: "#startInterviewButton",
          intro: "Click this button to start the interview.",
        },
        {
          intro: "Goodluck to your interview!",
        },
      ],
    })
    .start();
};

export default PopupGuide;
