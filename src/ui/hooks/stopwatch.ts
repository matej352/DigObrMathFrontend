import React from "react";

export const useStopwatch = () => {
  const [time, setTime] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);

  React.useEffect(() => {
    let interval: number;

    if (isRunning) {
      interval = window.setInterval(() => {
        setTime((t) => t + 0.25);
      }, 250);
    }

    return () => {
      window.clearInterval(interval);
    };
  }, [isRunning]);

  return {
    time,
    isRunning,
    start: () => setIsRunning(true),
    stop: () => setIsRunning(false),
    reset: () => setTime(0),
  };
};
