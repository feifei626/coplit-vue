/**
 * 日期格式化工具
 */

/**
 * 将日期对象格式化为字符串
 * @param {Date} date - 日期对象
 * @param {string} format - 格式字符串 (yyyy-MM-dd, HH:mm:ss)
 * @returns {string} 格式化后的日期字符串
 */
export function formatDate(date, format = 'yyyy-MM-dd') {
  if (!(date instanceof Date)) {
    throw new Error('参数必须是 Date 对象');
  }

  const year = date.getFullYear();
  // 修复：getMonth() 返回 0-11，需要 +1 得到 1-12
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const replacements = {
    'yyyy': year,
    'MM': String(month).padStart(2, '0'),
    'dd': String(day).padStart(2, '0'),
    'HH': String(hours).padStart(2, '0'),
    'mm': String(minutes).padStart(2, '0'),
    'ss': String(seconds).padStart(2, '0'),
  };

  let result = format;
  for (const [key, value] of Object.entries(replacements)) {
    result = result.replace(key, value);
  }

  return result;
}

/**
 * 将时间戳转换为格式化日期
 * @param {number} timestamp - 时间戳（毫秒）
 * @param {string} format - 格式字符串
 * @returns {string} 格式化后的日期字符串
 */
export function formatTimestamp(timestamp, format = 'yyyy-MM-dd HH:mm:ss') {
  return formatDate(new Date(timestamp), format);
}
