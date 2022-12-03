import moment from "moment";

const formatTime = (timestamp: string | Date) => {
  const time = timestamp instanceof Date ? timestamp : new Date(timestamp);
  let formattedTime = "";

  if (moment().isSame(moment(time), "day")) {
    formattedTime = moment(time).format("H:mm");
  } else if (moment().isSame(moment(time), "year")) {
    formattedTime = moment(time).format("D/MM/YY");
  }

  return formattedTime;
};

export default formatTime;
