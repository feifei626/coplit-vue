import { describe, it, expect } from 'vitest';
import { formatDate, formatTimestamp } from './format.js';

describe('formatDate', () => {
  it('应该格式化日期为 yyyy-MM-dd', () => {
    const date = new Date('2025-01-28');
    // 预期：2025-01-28
    // 但由于 bug，month 是 0-11 的索引，实际会得到错误结果
    const result = formatDate(date, 'yyyy-MM-dd');
    expect(result).toBe('2025-01-28');
  });

  it('应该格式化完整的日期时间 yyyy-MM-dd HH:mm:ss', () => {
    const date = new Date('2025-01-28T14:30:45');
    const result = formatDate(date, 'yyyy-MM-dd HH:mm:ss');
    expect(result).toBe('2025-01-28 14:30:45');
  });

  it('应该正确处理个位数月份和日期（补零）', () => {
    const date = new Date('2025-01-05');
    const result = formatDate(date, 'yyyy-MM-dd');
    expect(result).toBe('2025-01-05');
  });

  it('应该抛出错误当传入非 Date 对象', () => {
    expect(() => formatDate('2025-01-28')).toThrow('参数必须是 Date 对象');
  });
});

describe('formatTimestamp', () => {
  it('应该格式化时间戳', () => {
    const timestamp = new Date('2025-01-28T12:00:00').getTime();
    const result = formatTimestamp(timestamp, 'yyyy-MM-dd HH:mm:ss');
    expect(result).toBe('2025-01-28 12:00:00');
  });
});
