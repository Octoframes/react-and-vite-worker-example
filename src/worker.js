self.onmessage = function (e) {
  // console.log("Message received " + e.data);

  const startTime = new Date().getTime(); // Record the start time

  let z = 0;
  for (let i = 0; i < 4e8; i++) {
    z += i;
  }
  console.log(z);

  const endTime = new Date().getTime(); // Record the end time

  const timeTaken = endTime - startTime;
  const currentTime = `${timeTaken} ms`;

  const workerResult = "Result: " + e.data + " " + currentTime;
  postMessage(workerResult);
};
