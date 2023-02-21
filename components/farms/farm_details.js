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
  
  const [loading, setLoading] = useState(true);

  const { id } = route.params;

  // Farm details
  const [farm, setFarm] = useState(null);
  
  // Max amtFlowers
  const [max, setMax] = useState(null);
  let tempMax = 0;

  const [farmLocationCoords, setFarmLocationCoords] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        getFarmDetails(id);
      } catch (error) {
        console.log('Something went wrong with the database api.', error);
      }
      setLoading(false);
    }
    const focusHandler = navigation.addListener('focus', () => {
      fetchData();
    });
  }, []);

  if(loading) return <Fetching message="Getting farm details..."/>

  function handleEdit(){
    navigation.navigate('EditFarm', { id: id, name: farm.name, address: farm.address});
  }
  function handleAdd(){
    console.log('add field to farm with id', id);
    navigation.navigate('AddField', { id: id });
  }

  async function getFarmDetails(farmId){
    try{
      const result = await DbAPI.getFarmDetails(farmId);
      console.log('querie1')
      let tempFarm = result.data[0];
      for(let i = 0; i < tempFarm.fields.length; i++){
        let fieldId = tempFarm.fields[i].fieldID;
        console.log('fieldId', fieldId)
        let boundaries = [];
        const resultBoundary = await DbAPI.getBoundaries(fieldId);
        console.log('querie2')
        for(let j = 0; j < resultBoundary.data.length; j++) {
          let boundary = {latitude: parseFloat(resultBoundary.data[j].x), longitude: parseFloat(resultBoundary.data[j].y)}
          boundaries.push(boundary);
        }

        let photos = []
        const resultPhoto = await DbAPI.getPhotoDataPerField(fieldId);
        console.log('querie3')

        for(let k = 0; k < resultPhoto.data.length; k++){
          console.log("Amount flowers on photo:", resultPhoto.data[k].amountFlowers + "\n" + "Amount flowers in max:", max);
          if(resultPhoto.data[k].amountFlowers > tempMax) {
            tempMax = resultPhoto.data[k].amountFlowers;
          }
          let photo = {coords: {latitude: parseFloat(resultPhoto.data[k].x), longitude: parseFloat(resultPhoto.data[k].y)}, amount: resultPhoto.data[k].amountFlowers}
          photos.push(photo);
        }
        tempFarm.fields[i].boundaries = boundaries;
        tempFarm.fields[i].photos = photos;
      }

      setFarm(tempFarm);

      getFarmLocation(tempFarm.address);
    } catch (err){
      console.log(err);
    }
    setMax(tempMax);
  }

  async function getFarmLocation(address){
    let result = await fetch("https://api.geoapify.com/v1/geocode/search?text=" + address + "&apiKey=fa6b9b64543b416ab65fee31fb07ee1d")
      .then(response => response.json())
    setFarmLocationCoords({latitude: result.features[0].bbox[1], longitude: result.features[0].bbox[0]})
  }

  if(!farm) return <Fetching message="Getting farm details..."/>
  if(!farmLocationCoords) return <Fetching message="Getting farm location..."/>
  //if(!max) return <Fetching message="Getting random data..."/>
    
  async function deleteFarm(id){
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
          flex: .01
        }}>
          <Animated.View style={[style.circle, { bottom: icon_1}, { backgroundColor: useThemedStyles(red)}]}>
            <TouchableOpacity onPress={handleEdit}>
              <Icon name="pencil" size={25} color="#FFFF" />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[style.circle, { bottom: icon_2, right: icon_2}, { backgroundColor: useThemedStyles(red)}]}>
            <TouchableOpacity onPress={handleAdd}>
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
      {farmLocationCoords && 
      (<MapView style={{flex: 1}} region={farmLocationCoords} showsUserLocation={true}>
        <Marker coordinate={farmLocationCoords}>
          <Text style={style.mapMarker}>{farm.name}</Text>
        </Marker>
        {farm.fields.map((item, index) => (
          <>
          {item.boundaries.length > 0 &&(
            <Polygon coordinates={item.boundaries} strokeColor={useThemedStyles(background)} fillColor={useThemedStyles(green)} strokeWidth={3} lineDashPattern={[1]}/>
          )}
          {item.photos.length > 0 &&(
            item.photos.map((photo, pindex) => (
              <Circle center={photo.coords} radius={3} strokeWidth={0} fillColor={`hsl(${60 - (40 * (photo.amount / max))}, 100%, 50%)`} zIndex={1000}/>
            ))
          )}
          </>
        ))}
      </MapView>)}
      <FloatingButton/>
    </View>
  );
};
