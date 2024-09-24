export default function TransformTime(time) {
  const selectedTime = new window.Date(time);
  const getFullTime = selectedTime.toString().slice(16, 21);
  // const getHour = selectedTime.getHours().toString();
  //   const getMinute = selectedTime.getMin().toString().padStart(2, "0");

  return `${getFullTime}`;
}
