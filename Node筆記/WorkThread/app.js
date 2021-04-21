const os = require('os');
const path = require('path');
const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');
const inquirer = require('inquirer');
const ora = require('ora');

const userCPUCount = os.cpus().length;
const NS_PER_SEC = 1e9;
const workerPath = path.resolve('worker.js');

const calculateFactorialWithWorker = number => {
  // Insert the array preparation code.
  if (number === 0) {
    return 1;
  }
  const numbers = [];

  for (let i = 1n; i <= number; i++) {
    numbers.push(i);
  }

  const segmentSize = Math.ceil(numbers.length / userCPUCount);
  const segments = [];

  console.log(numbers.length, userCPUCount, segmentSize);

  for (let segmentIndex = 0; segmentIndex < userCPUCount; segmentIndex++) {
    const start = segmentIndex * segmentSize;
    const end = start + segmentSize;
    const segment = numbers.slice(start, end);
    segments.push(segment);
  }

  var promises = segments.map(
    segment =>
      new Promise((resolve, reject) => {
        const worker = new Worker(workerPath, {
          workerData: segment,
        });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', code => {
          if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
        });
      })
  )

  return Promise.all(promises).then(results => {
    return results.reduce((acc, val) => acc * val, 1n);
  });
};

const calculatFactorial = (number) => {
  const numbers = []; 

  for (let i = 1n; i <= number; i++) {
    numbers.push(i);
  }

  return numbers.reduce((acc, val) => acc * val, 1n);
}

const benchmarkFactorial = async (inputNumber, factFun, label) => {
  const spinner = ora(`Calculating with ${label}..`).start();
  console.log(``);
  console.log(``);
  const startTime = process.hrtime();
  const result = await factFun(BigInt(inputNumber));
  const diffTime = process.hrtime(startTime);
  const time = diffTime[0] * NS_PER_SEC + diffTime[1];
  spinner.succeed(`${label} result done in: ${time}`);
  console.log(``);
  return time;
}

const run = async () => {
    while(true)
    {
            //Type Answer
        const {inputNumber} = await inquirer.prompt([
            {
            type: 'input',
            name: 'inputNumber',
            message: 'Calculate factorial for:',
            default: 10,
            },
        ]);
        //console.log(inputNumber);
        if (Number.isInteger(Number(inputNumber))) {
            const timeWorker = await benchmarkFactorial(inputNumber, calculateFactorialWithWorker, 'Worker');
            const timeLocal = await benchmarkFactorial(inputNumber, calculatFactorial, 'Local');
            const diff = timeLocal - timeWorker;
            console.log(`Difference between local and worker: ${Math.floor(diff / 1000000)}ms`);
            console.log(`----------------------------`);
        }


    }
};

// while(true)
// {
//     run();  
// }
 run();
