export const isValidNumber = (value: any): boolean => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

export const calculateMean = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  return sum / numbers.length;
};

export const calculateMedian = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
};

export const calculateMode = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  const frequency: { [key: number]: number } = {};
  let maxFreq = 0;
  let mode = numbers[0];
  numbers.forEach(num => {
    frequency[num] = (frequency[num] || 0) + 1;
    if (frequency[num] > maxFreq) {
      maxFreq = frequency[num];
      mode = num;
    }
  });
  return mode;
};

export const calculateVariance = (numbers: number[], mean: number): number => {
  if (numbers.length === 0) return 0;
  const squaredDiffs = numbers.map(num => Math.pow(num - mean, 2));
  return squaredDiffs.reduce((acc, val) => acc + val, 0) / numbers.length;
};

export const calculateStdDev = (variance: number): number => {
  return Math.sqrt(variance);
};

export const formatCurrency = (amount: number): string => {
  return `Rs ${amount.toLocaleString()}`;
};