import { Text, View, TouchableOpacity } from "react-native";

// Theme
import useThemedStyles from "../../styles/theme/useThemedStyles";
import { styles } from "../../styles/styles";

import { useEffect, useState } from "react";

// Geolocation
import * as Location from 'expo-location';

// Import Camera
import { Camera, CameraType, FlashMode } from 'expo-camera';

// Camera closed when not focus
import { useIsFocused } from "@react-navigation/core";

// Icons
import { Icon } from "@react-native-material/core";
import Fetching from "../../layout/message_fetching";

export default function TakePhotoScreen({ navigation }) {
    // Styling (theme)
    const style = useThemedStyles(styles);

    // Camera
    const [permission, setPermission] = Camera.useCameraPermissions();
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(CameraType.back);
    const [fields, setFields] = useState(null)

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setPermission(cameraStatus.status === 'granted');
        })();
    }, []);
    
    const takePicture = async () => {
        if(camera){
            const data = await camera.takePictureAsync(null);            
            setImage(data.uri);            
            navigation.navigate('Taken picture', {image: data.uri, fields: fields})
        }
    };

    const size = 25;

    // Function to toggle the type of the camera
    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    // Focused?
    const isFocused = useIsFocused();

    if(!isFocused || !permission || !permission.granted) return <Fetching message="Please wait a second..."/>

    return (
        <View style={style.body}>
            <Camera style={style.camera} type={type} ref={ref => setCamera(ref)} ratio={'16:9'}>
                <View style={style.cameraFlipButtonContainer}>
                    <TouchableOpacity style={style.cameraButton} onPress={toggleCameraType}>
                        <Icon name="camera-flip" size={size} style={style.cameraButtonText}/>
                    </TouchableOpacity>
                </View>
                <View style={style.takePictureButtonContainer}>
                    <TouchableOpacity style={style.cameraButton} onPress={() => {takePicture()}}>
                        <Icon name="camera" size={size} style={style.cameraButtonText}/>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    )
}
