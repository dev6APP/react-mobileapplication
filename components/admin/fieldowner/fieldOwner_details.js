import { View, Text, TouchableOpacity, Animated } from 'react-native';
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

//theme
import useThemedStyles from "../../../styles/theme/useThemedStyles";
import { styles } from "../../../styles/styles";
import { red } from "../../../styles/styles";

// Layout
import Fetching from '../../../layout/message_fetching';
import Error from '../../../layout/message_error';

import DbAPI from '../../../api/DbAPI';
import { useState, useEffect } from 'react';

export default function FieldOwnerDetails({ route, navigation }) {
    const id = route.params.id;
    const [details, setDetails] = useState(null);
    const [details2, setDetails2] = useState(null);
    const [loading, setLoading] = useState(true);

    const style = useThemedStyles(styles);
    
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const result1 = await DbAPI.getFieldOwnerDetails(id);
          const result2 = await DbAPI.getFarmFromFieldOwner(id);
          console.log('details', result2.data);
          setDetails(result1.data[0]);
          setDetails2(result2.data);
        } catch (error) {
          console.log('Something went wrong with the database api.', error);
          <Error/>
        }
        setLoading(false);
      }
      const focusHandler = navigation.addListener('focus', () => {
        fetchData();
      });    
    }, []);
    console.log(details2)
    if(loading) return <Fetching/>

    function handleEdit(){
      navigation.navigate('EditFieldOwner', { id: id, name: details.name, password: details.password, city: details.city,
                                            country: details.country, started: details.started, languageID: details.languageID});
    }
    function handleAdd(){
      console.log('add farm to fieldowner with id', id);
      navigation.navigate('AddFarm', { id: id });
    }

    async function deleteFieldOwner(id){
      console.log("fieldowner" , id);
      try {
        DbAPI.deleteFieldOwner(id);
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
            <TouchableOpacity onPress={() => deleteFieldOwner(id)}>
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
      <View style={{flex:1}}>
      <Text style={[style.text, style.name]}>{details.name}</Text>
      <Text style={style.text}>{details.country}, {details.city}</Text>
      <View style={style.listWithLabel}>
        {details2.map((farm, indexFarm) => (
          <View style={(indexFarm === details2.length - 1) ? style.none : style.listWithLabelItem} key={`Farm${indexFarm}`}>
            <Text style={[style.text, style.listWithLabelItemTitle]} key={`keyFarmName${indexFarm}`}>{farm.name}</Text>
            {farm.started && (<Text style={[style.text, style.opacity6]} key={`keyFarmStartDate${indexFarm}`}>{farm.started}</Text>)}
          <View style={style.farmInfoList}>
        <Text style={[style.text, {fontWeight: "bold"}]}>Fields</Text>
        {farm.fields.map((field, indexField) => (
          <Text style={[style.text, style.farmInfoListItem]} key={`Field${indexField}`}>{field.name}</Text>
        ))}
        </View>
          </View>
        ))}
        
        <Text style={[style.text, style.listWithLabelLabel]}>Farms</Text>
      </View>
      </View>
      <FloatingButton/>
    </View>
  );
};