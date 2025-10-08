const getCurrentTimePlusOneHour = () => {
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 1);

  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
  });

  return `${formattedHours}:${formattedMinutes} ${ampm} ${formattedDate}`;
};

export { getCurrentTimePlusOneHour };
