import JOBS from './jobs/jobs.module';
import { errorNumberAsArgument } from './jobs/utils/error-message';

describe('Testing the counter function of the jobs.module:', () => {
  describe('Happy Path', () => {
    test('JOBS.counter should be an instanceof Function', () => {
      expect(JOBS.counter).toBeInstanceOf(Function);
    });

    test('JOBS.counter(500) should return 500', () => {
      const actual = JOBS.counter(500);
      const expected = 500;

      expect(actual).toBe(expected);
    });

    test('JOBS.counter(1000) should return 1000', () => {
      const actual = JOBS.counter(1000);
      const expected = 1000;

      expect(actual).toBe(expected);
    });
  });

  describe('Unhappy Path', () => {
    test(`JOBS.counter() should throw a TypeError with message "${errorNumberAsArgument}"`, () => {
      try {
        JOBS.counter();
      } catch (error) {
        expect(error.name).toBe('TypeError');
        expect(error.message).toBe(errorNumberAsArgument);
      }
    });

    test('JOBS.counter(-1) should return 0', () => {
      const actual = JOBS.counter(-1);
      const expected = 0;

      expect(actual).toBe(expected);
    });
  });
});

describe('Testing the factorial function of the jobs.module:', () => {
  describe('Happy Path', () => {
    test('JOBS.factorial should be an instanceof Function', () => {
      expect(JOBS.factorial).toBeInstanceOf(Function);
    });

    test('JOBS.factorial(3) should return 6', () => {
      const actual = JOBS.factorial(3);
      const expected = 6;

      expect(actual).toBe(expected);
    });

    test('JOBS.factorial(4) should return 24', () => {
      const actual = JOBS.factorial(4);
      const expected = 24;

      expect(actual).toBe(expected);
    });
  });

  describe('Unhappy Path', () => {
    test(`JOBS.factorial() should throw a TypeError with message "${errorNumberAsArgument}"`, () => {
      try {
        JOBS.factorial();
      } catch (error) {
        expect(error.name).toBe('TypeError');
        expect(error.message).toBe(errorNumberAsArgument);
      }
    });

    test('JOBS.factorial(0) should return 1', () => {
      const actual = JOBS.factorial(0);
      const expected = 1;

      expect(actual).toBe(expected);
    });
  });
});
