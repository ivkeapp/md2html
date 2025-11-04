// Setup file for Vitest
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/dom';

// Cleanup after each test
afterEach(() => {
  cleanup();
});
