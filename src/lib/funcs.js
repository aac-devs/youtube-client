const literalMonth = (value) => {
  return (
    (value === '01' && 'Jan') ||
    (value === '02' && 'Feb') ||
    (value === '03' && 'Mar') ||
    (value === '04' && 'Apr') ||
    (value === '05' && 'May') ||
    (value === '06' && 'Jun') ||
    (value === '07' && 'Jul') ||
    (value === '08' && 'Aug') ||
    (value === '09' && 'Sep') ||
    (value === '10' && 'Oct') ||
    (value === '11' && 'Nov') ||
    (value === '12' && 'Dec')
  );
};

const formattedDate = (value) => {
  const newValue = value.split('T')[0].split('-');
  return `${newValue[2]} ${literalMonth(newValue[1])} ${newValue[0]}`;
};

const formattedDuration = (duration) => {
  let value = duration.replace('PT', '').replace('S', '');
  value = value.search('H') > 0 ? value.replace('H', ',') : value;
  value = value.search('M') > 0 ? value.replace('M', ',') : value;
  const array = value.split(',');
  if (array.length < 3) {
    array.unshift('0');
  }
  if (array.length < 2) {
    array.unshift('0');
  }
  const [hora, minuto, segundo] = array;
  return `${hora > '0' ? `${hora}:` : ''}${
    minuto === '0' ? '0' : minuto < '10' ? minuto : minuto.padStart(2, '0')
  }:${segundo.padStart(2, '0')}`;
};

export { formattedDate, formattedDuration };
