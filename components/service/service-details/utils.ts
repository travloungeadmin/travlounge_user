export const convertTime = (time: number) => {
  const hours = Math.floor(time / 60);
  const minutes = Math.floor(time % 60);
  return hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''} ${minutes} min` : `${minutes} min`;
};

export const convertDistance = (distance: number) => {
  return distance >= 1 ? `${distance.toFixed(1)} km` : `${Math.round(distance * 1000)} m`;
};
