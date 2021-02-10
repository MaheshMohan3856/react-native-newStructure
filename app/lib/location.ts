import GetLocation from 'react-native-get-location'

export const getMyCurrentPosition = () =>{
    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    })
    .then(location => {
        return location
        console.log(location);
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
        return message
    })
}

