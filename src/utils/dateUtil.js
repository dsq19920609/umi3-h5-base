// 日期处理工具类
import * as moment from 'moment';

function isValid(value) {
  let date = Date.parse(value);
  if (!date) {
    // 考虑是否为时间戳字符串
    date = /^[0-9]+$/.test(value) ? Number.parseInt(value) : null;
  }
  if (!date) {
    return false;
  }
  return date;
}

/**
 * 将日期和时间格式化为指定格式: 2014-04-23 18:55:49
 * @param { Date | string(date|timestamp) | timestamp } value 
 * @param { number } format
 * 1: 2014-04-23
 * 2: 2014/04/23
 * 3: 2014-04-23 18:55:49
 * 4: 2014/04/23 18:55:49
 * 5: 23-04-2014
 * 6: 23/04/2014
 * 7: 23-04-2014 18:55:49
 * 8: 23/04/2014 18:55:49
 * 9: 2014-04-23T18:55:49	
 */
export function formatDate(value, format = 3) {
  let date = '';
  if (!isValid(value)) {
    return '';
  }
  date = isValid(value);
  const momentDate = moment(date);
  let formatValue = '';
  switch (format) {
    case 1: formatValue = momentDate.format('YYYY-MM-DD'); break;
    case 2: formatValue = momentDate.format('YYYY/MM/DD'); break;
    case 3: formatValue = momentDate.format('YYYY-MM-DD HH:mm:ss'); break;
    case 4: formatValue = momentDate.format('YYYY/MM/DD HH:mm:ss'); break;
    case 5: formatValue = momentDate.format('DD-MM-YYYY'); break;
    case 6: formatValue = momentDate.format('DD/MM/YYYY'); break;
    case 7: formatValue = momentDate.format('DD-MM-YYYY HH:mm:ss'); break;
    case 8: formatValue = momentDate.format('DD/MM/YYYY HH:mm:ss'); break;
    case 9: formatValue = momentDate.format('YYYY-MM-DDTHH:mm:ss	'); break;
    default: formatValue = '';
  }
  return formatValue;
}

/**
 * 获取时间对象 { years, months, date, hours, minutes, milliseconds} 可用于灵活的展示时间
 * @param { Date | string(date|timestamp) | timestamp } value 
 */
export function getDateParts(value) {
  let date = '';
  if (!isValid(value)) {
    return '';
  }
  date = isValid(value);
  const momentDate = moment(date);
  return momentDate.toObject();
}


/**
 * @param { Date | string(date|timestamp) | timestamp } value 
 * 将字符串格式化为 ISO8601 标准。
 * 1609823709470 => 2021-01-05T05:15:09.470Z
 */
export function toISOString(value) {
  let date = '';
  if (!isValid(value)) {
    return '';
  }
  date = isValid(value);
  const momentDate = moment(date);
  return momentDate.toISOString();
}