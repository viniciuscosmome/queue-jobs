import { existsSync } from 'node:fs';
import { parentPort, workerData } from 'node:worker_threads';
import {
  errorInstanceofJobAsArgument,
  errorMissingFileURLPath,
  errorFileNotFound,
  errorJobKeyNotAFunction,
} from './utils/error-message.js';

if (!workerData || !workerData.jobsModulePath || typeof workerData.jobsModulePath !== 'string') {
  throw new SyntaxError(errorMissingFileURLPath);
}

if (!existsSync(workerData.jobsModulePath)) {
  throw new Error(errorFileNotFound);
}

const { default: jobsModule } = await import(`file:///${workerData.jobsModulePath}`);

parentPort.once('message', async (job) => {
  if (typeof job !== 'object' || Array.isArray(job)) {
    throw new TypeError(errorInstanceofJobAsArgument);
  }

  if (!(jobsModule[job.key] instanceof Function)) {
    throw new TypeError(errorJobKeyNotAFunction);
  }

  await Promise
    .all([ jobsModule[job.key](job.data) ])
    .then(() => parentPort.postMessage(true))
    .catch(() => parentPort.postMessage(false));
});
