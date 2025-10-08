import * as Location from 'expo-location';

const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        return
    }
    else {
        const location = await Location.getCurrentPositionAsync();
        const coordinates = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
        }
        return coordinates
    }
    }

    export {getLocation}