import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Pressable, Button } from 'react-native';
import {FAB} from "react-native-elements";

//theme
import useThemedStyles from '../../../styles/theme/useThemedStyles';
import { styles } from "../../../styles/styles";

// Layout
import Error from '../../../layout/message_error';
import Fetching from '../../../layout/message_fetching';

import DbAPI from '../../../api/DbAPI';
import { useState, useEffect } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRecoilState, useRecoilValue } from 'recoil';
import { Picker } from '@react-native-picker/picker';
import { FormItem } from 'react-native-form-component';
import { Alert } from 'react-native';


export default function AddFieldOwner({navigation}) {
    const [fieldOwner, setFieldOwner] = useState({name: "",password:"", country:"", city:"", started:"", languageID: 1});
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [languages, setLanguages] = useState(true);
    const [loading, setLoading] = useState(true);
    const [languageIndex, setLanguageIndex] = useState(0);


    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };

    const style = useThemedStyles(styles);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
              const languageresults = await DbAPI.getLanguages();
  
              console.log('languages', languageresults.data);
  
              setLanguages(languageresults.data)
  
            } catch (error) {
              console.log('Something went wrong with the database api.', error);
            }
            setLoading(false);
          }
          fetchData();
    }, [])

    if(loading) return <Fetching/>

    
    async function addFieldOwnerToDB(fieldOwner){
      if (fieldOwner.started != "" ){
        console.log("field owner: " , fieldOwner);
        try {
          DbAPI.addFieldOwner(fieldOwner);
        } catch (error) {
          console.log('Something went wrong with the database api.', error);
          <Error/>
        }
        console.log('tried:', fieldOwner);
        navigation.goBack();
      } else {
        Alert.alert("Please select a date")
      }
      }

    const handleConfirmDate = (date) => {
        console.log("A date has been picked: ", date.toISOString());
        fieldOwner.started = date.toISOString();
        hideDatePicker();
        console.log('date:', fieldOwner);
    };
    function setFieldOwnerLanguage(e){
        setFieldOwner({...fieldOwner, languageID: e})
        setLanguageIndex(e-1);
      }

  return (
    <View style={style.body}>
      <FormItem
        isRequired
        value={fieldOwner.name}
        onChangeText={(name) => setFieldOwner({...fieldOwner, name})}
        placeholder='Name'
        />

        <FormItem
        placeholder='password'
        isRequired
        value={fieldOwner.password}
        onChangeText={(password) => setFieldOwner({...fieldOwner, password})}
        />
        <View style={{display: 'flex', flexDirection: 'row'}}>

        <FormItem style={{flex: 1, marginRight:5}}
        placeholder='city'
        isRequired
        value={fieldOwner.city}
        onChangeText={(city) => setFieldOwner({...fieldOwner, city})}
        />

        <FormItem style={{flex: 1}}
        placeholder='country'
        isRequired
        value={fieldOwner.country}
        onChangeText={(country) => setFieldOwner({...fieldOwner, country})}
        />
    </View>

    <Picker selectedValue={languages[languageIndex].languageID} onValueChange={setFieldOwnerLanguage} style={{color: 'white'}}>
      {
        languages.map((item) => (
        <Picker.Item key={`Language${item.languageID}`} label={item.name} value={item.languageID} />
        ))
      }
      </Picker>
      <Text style={[style.addLabel]}>Startdate: </Text>
      <View style={style.datePicker}>
      {fieldOwner.started != "" ?
        <Text style={style.addLabel}>{fieldOwner.started.substring(0,10)}</Text>
      :
        <Text style={style.addLabel}>2023-01-07</Text>
      }
      <Button title="Show Date Picker" onPress={showDatePicker} style={style.addButton}/>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
      />
      </View>
      
      <FAB
        icon={{ name: 'add', color: 'white' }}
        size="large"
        placement="right"
        color='#2c3e50'
        type='string'
        title="Add Field Owner"
        onPress={() => addFieldOwnerToDB(fieldOwner)}
      />
    </View> 
  );
};