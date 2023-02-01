import { Text } from "react-native";

// Geolocation
import * as Location from "expo-location";

// Screens
import Fetching from "../../layout/message_fetching";

// Use effect
import { useEffect, useState } from "react";

import MapView, {Polygon} from "react-native-maps";

export default function GetBoundary(){
    let currentLocation = null;
    useEffect(() => {
        getLocation();
    }, []);

    async function getLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if(status === 'granted') {
            global.location = await Location.getCurrentPositionAsync({});
            console.log("Hij doe het:", global.location)
            currentLocation = { latitude: global.location.coords.latitude, longitude: global.location.coords.longitude}
            current00 = {latitude: 51.169640, longitude: 4.970737}
            current01 = {latitude: 51.168927, longitude: 4.971756}
            current10 = {latitude: 51.169331, longitude: 4.972486}
            current11 = {latitude: 51.170056, longitude: 4.971450}
        }
    }

    if(!global.location) return <Fetching message="No current location"/>

    return(
        <>
            <MapView style={{flex: 1}} region={currentLocation} customMapStyles={{}} showsUserLocation={true}>
                <Polygon
            coordinates={[current01, current11, current10, current00]} //specify our coordinates
            strokeColor={"#000"}
            strokeWidth={3}
            lineDashPattern={[1]}
        />
            </MapView> 
        </>
    )
}