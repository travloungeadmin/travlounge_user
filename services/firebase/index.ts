import { database } from '@/firebaseConfig';
import { ref, set } from 'firebase/database';

type userLocationType = {
  latitude: number;
  longitude: number;
  user: number;
};

const postUserLocation = async (data: userLocationType) => {
  const dbRef = ref(database, 'user_locations');
  try {
    await set(dbRef, data);
    console.log('Data pushed successfully');
  } catch (error) {
    console.error(error);
  }
};

export { postUserLocation };
