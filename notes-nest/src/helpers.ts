export const getDates = (str: string): Array<string> | null => {
  return str ? str.match(/\d{1,2}([\/.-])\d{1,2}\1\d{4}/g) : null;
};
