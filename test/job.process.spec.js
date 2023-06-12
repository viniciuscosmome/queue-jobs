import { fileURLToPath, URL } from 'node:url';
import { Worker } from 'node:worker_threads';
import {
  errorInstanceofJobAsArgument,
  errorMissingFileURLPath,
  errorFileNotFound,
  errorJobKeyNotAFunction,
} from '../lib/utils/error-message.js';

function filePath(relativePath) {
  return fileURLToPath(new URL(relativePath, import.meta.url));
}

const jobProcessorPath = filePath('../lib/job.process.js');
const workerData = {
  jobsModulePath: filePath('./jobs/jobs.module.js'),
};

describe('Testing the job processor of the job.process module:', () => {
  describe('Happy Path', () => {
    test('worker should be an instanceof Worker', () => {
      const worker = new Worker(jobProcessorPath, { workerData });

      expect(worker).toBeInstanceOf(Worker);
      worker.terminate();
    });

    test('worker.postMessage({ key: "counter", data: 100}) should return truthy', async () => {
      const worker = new Worker(jobProcessorPath, { workerData });

      const workerProcess = new Promise((resolve, rejects) => {
        worker.once('message', (response) => {
          resolve(response);
        });
      });

      worker.postMessage({ key: 'counter', data: 100 });

      await workerProcess
        .then((response) => {
          expect(response).toBeTruthy();
        });
    });

    test('worker.postMessage({ key: "factorial", data: 4}) should return truthy', async () => {
      const worker = new Worker(jobProcessorPath, { workerData });

      const workerProcess = new Promise((resolve, rejects) => {
        worker.once('message', (response) => {
          resolve(response);
        });
      });

      worker.postMessage({ key: 'factorial', data: 4 });

      await workerProcess
        .then((response) => {
          expect(response).toBeTruthy();
        });
    });
  });

  describe('Unhappy Path', () => {
    test(`new Worker(jobProcessorPath); should throw a SyntaxError with message "${errorMissingFileURLPath}"`, async () => {
      const worker = new Worker(jobProcessorPath);

      const workerProcess = new Promise((resolve, rejects) => {
        worker.once('error', (error) => {
          rejects(error);
        });
      });

      worker.postMessage({});

      await workerProcess
        .catch((error) => {
          expect(error.name).toBe('SyntaxError');
          expect(error.message).toBe(errorMissingFileURLPath);
        });
    });

    test(`new Worker(jobProcessorPath); should throw a Error with message "${errorFileNotFound}"`, async () => {
      const worker = new Worker(jobProcessorPath, { workerData: { jobsModulePath: './undefined-file.txt' } });

      const workerProcess = new Promise((resolve, rejects) => {
        worker.once('error', (error) => {
          rejects(error);
        });
      });

      worker.postMessage({});

      await workerProcess
        .catch((error) => {
          expect(error.name).toBe('Error');
          expect(error.message).toBe(errorFileNotFound);
        });
    });

    test(`worker.postMessage() should throw a TypeError with message "${errorInstanceofJobAsArgument}"`, async () => {
      const worker = new Worker(jobProcessorPath, { workerData });

      const workerProcess = new Promise((resolve, rejects) => {
        worker.once('error', (error) => {
          rejects(error);
        });
      });

      worker.postMessage(undefined);

      await workerProcess
        .catch((error) => {
          expect(error.name).toBe('TypeError');
          expect(error.message).toBe(errorInstanceofJobAsArgument);
        });
    });

    test(`worker.postMessage({ key: "undefined_job" }) should throw a TypeError with message "${errorJobKeyNotAFunction}"`, async () => {
      const worker = new Worker(jobProcessorPath, { workerData });

      const workerProcess = new Promise((resolve, rejects) => {
        worker.once('error', (error) => {
          rejects(error);
        });
      });

      worker.postMessage({ key: 'undefined_job' });

      await workerProcess
        .catch((error) => {
          expect(error.name).toBe('TypeError');
          expect(error.message).toBe(errorJobKeyNotAFunction);
        });
    });
  });
});
