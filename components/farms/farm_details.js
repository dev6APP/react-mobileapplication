import { View, Text, TouchableOpacity, Animated } from 'react-native';
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import { red } from "../../styles/styles";

//theme
import useThemedStyles from "../../styles/theme/useThemedStyles";
import { styles, green, background } from "../../styles/styles";

// Layout
import Fetching from '../../layout/message_fetching';

// Geolocation
import * as Location from "expo-location";

// queries
import DbAPI from '../../api/DbAPI';
import { useState, useEffect } from "react";

// Map
import MapView, {Polygon, Marker} from "react-native-maps";

import configData from "../../config/apiKey.json";

export default function FarmDetailsScreen({ route, navigation }) {
  const { id } = route.params;

  // Farm details
  const [details, setDetails] = useState(null);

  const key = configData.apiKeyGetCoords;
  const [farmLocationCoords, setFarmLocationCoords] = useState(null);
  
  // Map
  let currentLocation = null;
  let field1_1 = {latitude: 51.169640, longitude: 4.970737}
  let field1_2 = {latitude: 51.168927, longitude: 4.971756}
  let field1_3 = {latitude: 51.169331, longitude: 4.972486}
  let field1_4 = {latitude: 51.170056, longitude: 4.971450}
  let field1 = [field1_1, field1_2, field1_3, field1_4]

  let field2_1 = {latitude: 51.169266, longitude: 4.969867}
  let field2_2 = {latitude: 51.169961, longitude: 4.970834}
  let field2_3 = {latitude: 51.170317, longitude: 4.970212}
  let field2_4 = {latitude: 51.169621, longitude: 4.969225}
  let field2 = [field2_1, field2_2, field2_3, field2_4]

  let field3_1 = {latitude: 51.169762, longitude: 4.968624}
  let field3_2 = {latitude: 51.170213, longitude: 4.969262}
  let field3_3 = {latitude: 51.170869, longitude: 4.968082}
  let field3_4 = {latitude: 51.170415, longitude: 4.967449}
  let field3 = [field3_1, field3_2, field3_3, field3_4]

  let field4_1 = {latitude: 51.170958, longitude: 4.968876}
  let field4_2 = {latitude: 51.171321, longitude: 4.968232}
  let field4_3 = {latitude: 51.171924, longitude: 4.969096}
  let field4_4 = {latitude: 51.171555, longitude: 4.969769}
  let field4 = [field4_1, field4_2, field4_3, field4_4]

  let field5_1 = {latitude: 51.171116, longitude: 4.970123}
  let field5_2 = {latitude: 51.171449, longitude: 4.970703}
  let field5_3 = {latitude: 51.170852, longitude: 4.971563}
  let field5_4 = {latitude: 51.170517, longitude: 4.970976}
  let field5 = [field5_1, field5_2, field5_3, field5_4]

  let field6_1 = {latitude: 51.170906, longitude: 4.972621}
  let field6_2 = {latitude: 51.170695, longitude: 4.973462}
  let field6_3 = {latitude: 51.169861, longitude: 4.972963}
  let field6_4 = {latitude: 51.170070, longitude: 4.972116}
  let field6 = [field6_1, field6_2, field6_3, field6_4]

  let field7_1 = {latitude: 51.168492, longitude: 4.973991}
  let field7_2 = {latitude: 51.168543, longitude: 4.973128}
  let field7_3 = {latitude: 51.169427, longitude: 4.973283}
  let field7_4 = {latitude: 51.169373, longitude: 4.974141}
  let field7 = [field7_1, field7_2, field7_3, field7_4]
  
  // Styling
  const style = useThemedStyles(styles);
  
  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      getFarmDetails();
    });
    
    if(!global.location) getLocation();
  }, []);

  function handleEdit(){
    navigation.navigate('EditFarm', { id: id });
  }
  function handleAdd(){
    console.log('add field to farm with id', id);
    navigation.navigate('AddField', { id: id });
  }

  async function getFarmDetails(){
    try{
      const result = await DbAPI.getFarmDetails(id);
      setDetails(result.data[0]);
      console.log(result.data[0].address);
      getFarmLocation(result.data[0].address);
    } catch (err){
      console.log(err);
    }
  }
  
  async function getLocation(){
    let { status } = await Location.requestForegroundPermissionsAsync();
    if(status === 'granted') {
        global.location = await Location.getCurrentPositionAsync({});
        currentLocation = { latitude: global.location.coords.latitude, longitude: global.location.coords.longitude}
    }
  }

  async function getFarmLocation(address){
    let result = await fetch("http://api.positionstack.com/v1/forward?access_key=" + key + "&query=" + address)
      .then(res => res.json());
    console.log(result.data[0])
    setFarmLocationCoords({latitude: result.data[0].latitude, longitude: result.data[0].longitude})
  }

  if(!details) return <Fetching message="Getting farm details..."/>
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
      <Text style={[style.text, style.name]}>{details.name}</Text>
      <Text style={style.text}>{details.started.substring(0,10)}</Text>
      <View style={style.listWithLabel}>
        {details.fields.map((field, index) => (
          <Text style={style.text} key={index}>{field.name}</Text>
        ))}
        <Text style={[style.text, style.listWithLabelLabel]}>Fields</Text>
      </View>
      {console.log(details.address)}
      <MapView style={{flex: 1}} region={currentLocation} showsUserLocation={true}>
        <Marker coordinate={farmLocationCoords}>
          <Text style={style.mapMarker}>{details.name}</Text>
        </Marker>
        <Polygon coordinates={field1} strokeColor={useThemedStyles(background)} fillColor={useThemedStyles(green)} strokeWidth={3} lineDashPattern={[1]}/>
        <Polygon coordinates={field2} strokeColor={useThemedStyles(background)} fillColor={useThemedStyles(green)} strokeWidth={3} lineDashPattern={[1]}/>
        <Polygon coordinates={field3} strokeColor={useThemedStyles(background)} fillColor={useThemedStyles(green)} strokeWidth={3} lineDashPattern={[1]}/>
        <Polygon coordinates={field4} strokeColor={useThemedStyles(background)} fillColor={useThemedStyles(green)} strokeWidth={3} lineDashPattern={[1]}/>
        <Polygon coordinates={field5} strokeColor={useThemedStyles(background)} fillColor={useThemedStyles(green)} strokeWidth={3} lineDashPattern={[1]}/>
        <Polygon coordinates={field6} strokeColor={useThemedStyles(background)} fillColor={useThemedStyles(green)} strokeWidth={3} lineDashPattern={[1]}/>
        <Polygon coordinates={field7} strokeColor={useThemedStyles(background)} fillColor={useThemedStyles(green)} strokeWidth={3} lineDashPattern={[1]}/>
      </MapView>
      <FloatingButton/>
    </View>
  );
};