import { View, Text, TouchableOpacity, Animated } from 'react-native';
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

//theme
import useThemedStyles from "../../styles/theme/useThemedStyles";
import { styles, green, red, blue, background } from "../../styles/styles";

// Layout
import Fetching from '../../layout/message_fetching';

// Geolocation
import * as Location from "expo-location";

// queries
import DbAPI from '../../api/DbAPI';
import { useState, useEffect } from "react";

// Map
import MapView, { Polygon, Circle, Marker} from "react-native-maps";

import configData from "../../config/apiKey.json";

export default function FarmDetailsScreen({ route, navigation }) {
  // Styling
  const style = useThemedStyles(styles);
  
  const { id } = route.params;

  // Farm details
  const [farm, setFarm] = useState(null);

  const key = configData.apiKeyGetCoords;
  const [farmLocationCoords, setFarmLocationCoords] = useState(null);
  
  // Map
  let currentLocation = null;

  let field1_hp_1 = {coords: {latitude: 51.1700, longitude: 4.9715}, weight: 0.5}
  let field1_hp_2 = {coords: {latitude: 51.1699, longitude: 4.9714}, weight: 0.7}
  let field1_hp_3 = {coords: {latitude: 51.1698, longitude: 4.9716}, weight: 0.5}
  let field1_hp_4 = {coords: {latitude: 51.1697, longitude: 4.9715}, weight: 0.7}
  let field1_hp_5 = {coords: {latitude: 51.1696, longitude: 4.9718}, weight: 0.5}
  let field1_hp_6 = {coords: {latitude: 51.1695, longitude: 4.9720}, weight: 0.7}
  let field1_hp_7 = {coords: {latitude: 51.1694, longitude: 4.9714}, weight: 0.5}
  let field1_hp_8 = {coords: {latitude: 51.1693, longitude: 4.9721}, weight: 0.7}
  let field1_hp_9 = {coords: {latitude: 51.1692, longitude: 4.9719}, weight: 0.7}
  let field1_hp = [field1_hp_1, field1_hp_2, field1_hp_3, field1_hp_4, field1_hp_5, field1_hp_6, field1_hp_7, field1_hp_8, field1_hp_9];

  useEffect(() => {
    getFarmDetails();
  }, []);

  function handleEdit(){
    console.log('pressed Edit');
  }

  async function getFarmDetails(){
    try{
      const result = await DbAPI.getFarmDetails(id);
      let tempFarm = result.data[0];

      for(let i = 0; i < tempFarm.fields.length; i++){
        let boundaries = [];
        let fieldId = tempFarm.fields[i].fieldID;
        const result = await DbAPI.getBoundaries(fieldId);

        for(let j = 0; j < result.data.length; j++) {
          let boundary = {latitude: parseFloat(result.data[j].x), longitude: parseFloat(result.data[j].y)}
          boundaries.push(boundary);
        }
        tempFarm.fields[i].boundaries = boundaries;
      }

      setFarm(tempFarm);

      getFarmLocation(tempFarm.address);
    } catch (err){
      console.log(err);
    }
  }

  async function getFarmLocation(address){
    let result = await fetch("https://api.geoapify.com/v1/geocode/search?text=" + address + "&apiKey=fa6b9b64543b416ab65fee31fb07ee1d")
      .then(response => response.json())
    console.log("result:", result.features[0].bbox)
    setFarmLocationCoords({latitude: result.features[0].bbox[1], longitude: result.features[0].bbox[0]})
  }

  if(!farm) return <Fetching message="Getting farm details..."/>
  if(!farmLocationCoords) return <Fetching message="Getting farm location..."/>
    
    async function deleteFarm(id){
      console.log("farmski" , id);
      try {
        DbAPI.deleteFarm(id);
      } catch (error) {
        console.log('Something went wrong with the database api.', error);
        <Error/>
      }
        navigation.goBack();
      }
    // FloatingButton
    const FloatingButton = () => {

      const [icon_1] = useState(new Animated.Value(10));
      const [icon_2] = useState(new Animated.Value(10));
      const [icon_3] = useState(new Animated.Value(10));
    
    
      const [pop, setPop] = useState(false);
    
      const popIn = () => {
        setPop(true);
        Animated.timing(icon_1, {
          toValue: 90,
          duration: 300,
          useNativeDriver: false,
        }).start();
        Animated.timing(icon_2, {
          toValue: 70,
          duration: 300,
          useNativeDriver: false,
        }).start();
        Animated.timing(icon_3, {
            toValue: 90,
            duration: 300,
            useNativeDriver: false,
        }).start();
      }
    
      const popOut = () => {
        setPop(false);
        Animated.timing(icon_1, {
          toValue: 10,
          duration: 300,
          useNativeDriver: false,
        }).start();
        Animated.timing(icon_2, {
          toValue: 10,
          duration: 300,
          useNativeDriver: false,
        }).start();
        Animated.timing(icon_3, {
            toValue: 10,
            duration: 300,
            useNativeDriver: false,
        }).start();
      }
      return(
        <View style={{
          flex: 0.01
        }}>
          <Animated.View style={[style.circle, { bottom: icon_1}, { backgroundColor: useThemedStyles(red)}]}>
            <TouchableOpacity onPress={handleEdit}>
              <Icon name="pencil" size={25} color="#FFFF" />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[style.circle, { bottom: icon_2, right: icon_2}, { backgroundColor: useThemedStyles(red)}]}>
            <TouchableOpacity /*onPress={handleAdd}*/>
              <Icon name="plus" size={25} color="#FFFF" />
              </TouchableOpacity>
            </Animated.View>
          <Animated.View style={[style.circle, { right: icon_3}, { backgroundColor: useThemedStyles(red)}]}>
            <TouchableOpacity onPress={() => deleteFarm(id)}>
              <Icon name="trash" size={25} color="#FFFF" />
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity
            style={[style.circle, {backgroundColor: useThemedStyles(red)}]}
            onPress={() => {
              pop === false ? popIn() : popOut();
            }}
          >
            <Icon name="bars" size={25} color="#FFFF" />
          </TouchableOpacity>
        </View>
      )
    
    }
    //end of FloatingButton

  return (
    <View style={style.body}>
      <Text style={[style.text, style.name]}>{farm.name}</Text>
      <Text style={style.text}>{farm.started.substring(0,10)}</Text>
      <View style={style.listWithLabel}>
        {farm.fields.map((field, index) => (
          <Text style={style.text} key={index}>{field.name}</Text>
        ))}
        <Text style={[style.text, style.listWithLabelLabel]}>Fields</Text>
      </View>
      <FloatingButton/>
      {console.log(farm.address)}
      <MapView style={{flex: 1}} region={currentLocation} showsUserLocation={true}>
        <Marker coordinate={farmLocationCoords}>
          <Text style={style.mapMarker}>{farm.name}</Text>
        </Marker>
        {farm.fields.map((item, index) => (
          <Polygon coordinates={item.boundaries} strokeColor={useThemedStyles(background)} fillColor={useThemedStyles(green)} strokeWidth={3} lineDashPattern={[1]}/>
        ))}
        
        {field1_hp.map((item, index) => (
            <Circle center={item.coords} radius={4} strokeWidth={0} fillColor={`hsl(${20 + (40 * item.weight)}, 100%, 50%)`} zIndex={1000}/>
        ))}
      </MapView>
    </View>
  );
};