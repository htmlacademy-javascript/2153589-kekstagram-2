const isStringNotBig = (string, length) => string.length <= length;

isStringNotBig('проверяемая строка', 20); // true
isStringNotBig('проверяемая строка', 18); // true
isStringNotBig('проверяемая строка', 10); // false

const isPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  let reverseString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reverseString += normalizedString[i];
  }

  return normalizedString === reverseString;
};

isPalindrome('Лёша на полке клопа нашёл '); // true
isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('gfkl'); // false


const parseNumberFromString = (value) => {
  const normalizedValue = typeof value === 'string' ? value : value.toString();
  let returnedString = '';

  for (let i = 0; i < normalizedValue.length; i++) {
    if (!Number.isNaN(parseInt(normalizedValue[i], 10))) {
      returnedString += normalizedValue[i];
    }
  }

  if (returnedString.length === 0) {
    return NaN;
  }

  return parseInt(returnedString, 10);
};

parseNumberFromString('2023 год'); // 2023
parseNumberFromString('ECMAScript 2022'); // 2022
parseNumberFromString('1 кефир, 0.5 батона'); // 105
parseNumberFromString('агент 007'); // 7
parseNumberFromString('а я томат'); // NaN
parseNumberFromString(2023); // 2023
parseNumberFromString(-1); // 1
parseNumberFromString(1.5); // 15
parseNumberFromString('00агент 007'); // 7

const isMeetingBeAble = (startDay, endDay, startMeetTime, durationMeeting) => {
  const [startDayHours, startDayMinutes] = startDay.split(':');
  const [endDayHours, endDayMinutes] = endDay.split(':');
  const [startMeetingHours, startMeetingMinutes] = startMeetTime.split(':');

  const startWork = parseInt(startDayHours, 10) * 60 + parseInt(startDayMinutes, 10);
  const endWork = parseInt(endDayHours, 10) * 60 + parseInt(endDayMinutes, 10);
  const startMeeting = parseInt(startMeetingHours, 10) * 60 + parseInt(startMeetingMinutes, 10);
  const endMeeting = startMeeting + durationMeeting;

  if (startMeeting < startWork) {
    return false;
  }

  return endMeeting <= endWork;

};

isMeetingBeAble('08:00', '17:30', '14:00', 90); // true
isMeetingBeAble('8:0', '10:0', '8:0', 120); // true
isMeetingBeAble('08:00', '14:30', '14:00', 90); // false
isMeetingBeAble('14:00', '17:30', '08:0', 90); // false
isMeetingBeAble('8:00', '17:30', '08:00', 900); // false


