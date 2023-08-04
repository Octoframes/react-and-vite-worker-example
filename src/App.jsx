import React, { useEffect, useRef, useState } from "react";

import MyWorker from "./worker?worker";

const myWorker = new MyWorker();

const WorkerComponent = () => {
  const [inputValue, setInputValue] = useState("heyyy");
  const [isWorkerBusy, setIsWorkerBusy] = useState(false);
  const [latestValue, setLatestValue] = useState(null);
  const [lastPostedValue, setLastPostedValue] = useState(null);
  const [workerOutput, setWorkerOutput] = useState("");

  // This function runs every time the inputValue state changes
  useEffect(() => {
    setLatestValue(inputValue);
    console.log("Main start worker");
    console.log(isWorkerBusy);
    if (!isWorkerBusy) {
      console.log("Main post message");
      myWorker.postMessage(inputValue);
      setLastPostedValue(inputValue);
      setIsWorkerBusy(true);
    }
  }, [inputValue]);

  useEffect(() => {
    myWorker.onmessage = (e) => {
      console.log("Message received from worker", e.data);
      setWorkerOutput(e.data);

      // The worker has finished processing, it's not busy anymore
      setIsWorkerBusy(false);

      // If the latest value has changed since we last posted to the worker,
      //         // post the latest value to the worker.
      if (lastPostedValue !== latestValue) {
        setIsWorkerBusy(true);
        setLastPostedValue(latestValue);
        myWorker.postMessage(latestValue);
      }
    };

    //     // Cleanup function to terminate worker when the component unmounts
    //     return () => {
    //         myWorker.terminate();
    //     };
  }, [latestValue, lastPostedValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <h1>{workerOutput}</h1>
    </div>
  );
};

export default WorkerComponent;
