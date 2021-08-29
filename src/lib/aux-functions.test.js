import { formattedDate, formattedDuration } from './aux-functions';

describe('funcs.js', () => {
  test('should format the string date given by youtube api', () => {
    expect(formattedDate('2019-10-10T23:00:02Z')).toBe('10 Oct 2019');
    expect(formattedDate('2019-12-10T23:00:02Z')).toBe('10 Dec 2019');
  });
  test('should format the string duration given by youtube api', () => {
    expect(formattedDuration('PT10H0M0S')).toBe('10:00:00');
    expect(formattedDuration('PT25M17S')).toBe('25:17');
    expect(formattedDuration('PT7S')).toBe('0:07');
  });
});
