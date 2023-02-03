import { Image, Text, TouchableOpacity, View } from "react-native";

// Theme
import useThemedStyles from "../../styles/theme/useThemedStyles";
import { styles, text, background } from "../../styles/styles";

// Icons
import { Icon } from "@react-native-material/core";

// Geolocation
import * as Location from "expo-location";

// Screens
import Fetching from "../../layout/message_fetching";

// Use effect
import { useEffect, useState } from "react";

// URL to base64
import * as FileSystem from 'expo-file-system';

// API's
import AiAPI from "../../api/AiAPI";
import DbAPI from "../../api/DbAPI";

// Field selectlist
import { SelectList } from 'react-native-dropdown-select-list'


export default function TakePhotoScreen({ route, navigation }) {
    // Styling (theme)
    const style = useThemedStyles(styles);
    const textColor = useThemedStyles(text);
    const bgColor = useThemedStyles(background);

    // Flowers
    const [nrFlowers, setNrFlowers] = useState(null);

    // Farm
    const [farm, setFarm] = useState(null);
    const farmId = 1;

    // Fields
    const [fields, setFields] = useState(null);

    // Selectlist
    const [selected, setSelected] = useState(null);
    const [fieldData, setFieldData] = useState(null);

    // Location
    const [location, setLocation] = useState(null);

    // Image (link to local image)
    const { image } = route.params;

    // Size of icon
    const size = 25;

    useEffect(() => {
        getFarmDetails(farmId);
        getLocation();
        getAmountOfFlowers();
    }, []);

    async function getLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if(status === 'granted') {
            const result = await Location.getCurrentPositionAsync({});
            setLocation({latitude: result.coords.latitude, longitude: result.coords.longitude});
        }
    }

    async function getFarmDetails(farmId){
        try{
            const result = await DbAPI.getFarmDetails(farmId);
            setFarm(result?.data[0]);
            setFields(result?.data[0].fields);
        	let newArray = result?.data[0].fields.map((item, index) => {
        	    return {key: item.fieldID, value: item.name}
        	})
        	setFieldData(newArray);
        } catch (error){
            return;
        }
    }

    async function getAmountOfFlowers(){
        let base64 = await FileSystem.readAsStringAsync(image, { encoding: 'base64'});
        const result = await AiAPI.getResultFromBase64(base64);
        setNrFlowers(result);
    }

    if(!farm) return <Fetching message={`Getting farm: ${farmId}...`}/>
    if(!fields) return <Fetching message={`Getting fields from farm: ${farmId}...`}/>
    if(!location) return <Fetching message="Looking for location..."/>
    if(!nrFlowers) return <Fetching message="Getting number of flowers..."/>
    
    return (
        <View style={style.body}>
            <Image source={{ uri: image }} style={style.img}/>
            <TouchableOpacity style={style.newPhotoButton} onPress={() => {newPhoto();}}>
                <Icon name="camera-iris" size={size} style={style.textBG_COLOR}/>
            </TouchableOpacity>
            <TouchableOpacity style={style.usePhotoButton} onPress={() => {usePhoto();}}>
                <Text style={[style.text, {fontSize: 30}]}>Use photo</Text>
            </TouchableOpacity>
            <Text style={[style.usePhoneButton, style.textBG_COLOR, {fontSize: 30}]}>{nrFlowers}</Text>
            <View style={style.selectList}>
                <SelectList 
                  setSelected={(item) => setSelected(item)} 
                  data={fieldData}
                  boxStyles={{backgroundColor: bgColor}}
                  dropdownStyles={{backgroundColor: bgColor}}
                  dropdownTextStyles={{color: textColor, textAlign: 'right'}}
                  inputStyles={{color: textColor, width: 140, textAlign: 'right'}}
                  arrowicon={<Icon name="chevron-down" size={12} color={'white'} style={{paddingTop: 3, paddingLeft: 10}}/>}
                  search={false} 
                  defaultOption={fieldData[0]}/>
            </View>
        </View>
    )

    function newPhoto() {
        navigation.navigate("Take picture");
    }

    async function usePhoto() {
        // Do things with this image
        
        // Coordinates
        let x = location.longitude;
        let y = location.latitude;

        // Field id
        let fieldId = selected;
        
        // nrFlowers needs to be reworked after AI Puts the result in JSON instead of text
        let amtFlowers = nrFlowers;
        console.log(nrFlowers);
        amtFlowers = 15;
        console.log("amtFlowers:", amtFlowers);

        // FieldownerID
        let fOwnerId = farm.fieldOwnerID;
        // Current userId
        let workerId = 1;
        /* Make a date */
        let date = new Date().toISOString();
        
        let photoData = {"fieldID": fieldId, "amountFlowers": amtFlowers, "workerID": workerId, "date": date, "fieldOwnerID": fOwnerId, "x": JSON.stringify(x), "y": JSON.stringify(y)};
        console.log(photoData)
        try{
            await DbAPI.addPhotoData(photoData);
        } catch (err){
            return;
        }

    }    
}