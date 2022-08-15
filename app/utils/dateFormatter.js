const getNumber = (n) => (n > 9 ? n : `0${n}`);

export const formatDate = (stmp) => {
  let date = new Date();
  if (stmp) {
    date = new Date(stmp);
  }

  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}  ${getNumber(
    date.getHours()
  )}:${getNumber(date.getMinutes())}`;
};
