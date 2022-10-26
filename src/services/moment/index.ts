import moment from "moment";

moment.locale('ko');

export const changeMomentableFormat = (str?: string) => {
  if (!str) {
    return undefined;
  }
  return str.replace(/\./g, '-');
}

export default moment;