const stringify = (data: (string | number)[]): string => {
  let stringData = '';
  data.forEach((item) => (stringData += `${item.toString()}, `));

  return stringData.slice(0, -1) + '\n';
};

export default { stringify };
