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


