import { View, Text, TextInput } from 'react-native';
import { Pressable, Button } from 'react-native';
import { FormItem } from 'react-native-form-component';
import {FAB} from "react-native-elements";


//theme
import useThemedStyles from "../../styles/theme/useThemedStyles";
import { styles } from "../../styles/styles";

// Layout
import Fetching from '../../layout/message_fetching';
import Error from '../../layout/message_error';

import DbAPI from '../../api/DbAPI';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { color } from '@rneui/base';


export default function AddWorker({ navigation }) {
    const navigate = useNavigation();
    const [worker, setWorker] = useState({name: "", password: "", 
                                phoneNumber: "", country: "", city: "",
                                emailAddress: "", contractStartDate: "",
                                contractEndDate: "", permissionID: 1,
                                languageID: 1});

    const [loading, setLoading] = useState(true);
    const [permissions, setPermissions] = useState(null);
    const [languages, setLanguages] = useState(true);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

    const [languageIndex, setLanguageIndex] = useState(0);
    const [permissionIndex, setPermissionIndex] = useState(0);


    const style = useThemedStyles(styles);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
      const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
      };
    
      const hideEndDatePicker = () => {
        setEndDatePickerVisibility(false);
      };


    const handleConfirmStartDate = (date) => {
      console.log("A date has been picked: ", date.toISOString());
      worker.contractStartDate = date.toISOString();
      hideDatePicker();
    };

    const handleConfirmEndDate = (date) => {
      console.log("A date has been picked: ", date.toISOString());
      worker.contractEndDate = date.toISOString();
      hideDatePicker();
    };
    
    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const permissionresults = await DbAPI.getPermissions();
            const languageresults = await DbAPI.getLanguages();

            console.log('permissions', permissionresults.data);
            console.log('languages', languageresults.data);

            setPermissions(permissionresults.data);
            setLanguages(languageresults.data)

          } catch (error) {
            console.log('Something went wrong with the database api.', error);
          }
          setLoading(false);
        }
        fetchData();
      }, []);

      if(loading) return <Fetching/>

    async function addWorkerToDB(worker){
        try {
            DbAPI.addWorker(worker);
          } catch (error) {
            console.log('Something went wrong with the database api.', error);
            <Error/>
          }
        console.log(worker);
        navigation.goBack();
    }

    
    function setWorkerPermission(e){
      console.log(e);
        setWorker({...worker, permissionID: e})
        setPermissionIndex(e - 1);
    }
    
    function setWorkerLanguage(e){
      setWorker({...worker, languageID: e})
      setLanguageIndex(e-1);
    }

    
  return (
    <View style={style.body}>
      <FormItem
        isRequired
        value={worker.name}
        onChangeText={(name) => setWorker({...worker, name})}
        placeholder='Worker name'
        />
        
        <FormItem
        isRequired
        value={worker.password}
        onChangeText={(password) => setWorker({...worker, password})}
        placeholder='Password'
        secureTextEntry={true}
        />
        
        <FormItem
        isRequired
        value={worker.phoneNumber}
        onChangeText={(phoneNumber) => setWorker({...worker, phoneNumber})}
        placeholder='Phone number'
        />
        <View style={{display: 'flex', flexDirection: 'row'}}>
      <FormItem style={{marginRight: 5, flex: 1}}
        isRequired
        value={worker.city}
        onChangeText={(city) => setWorker({...worker, city})}
        placeholder='City'
        />
      <FormItem style={{flex: 1}}
        isRequired
        value={worker.country}
        onChangeText={(country) => setWorker({...worker, country})}
        placeholder='Country of origin'
        />
        </View>
      <FormItem style={{paddingBottom: 0, marginBottom:0}}
        isRequired
        value={worker.emailAddress}
        onChangeText={(emailAddress) => setWorker({...worker, emailAddress})}
        placeholder='Email address'
        />
      <View style={{display: 'flex', flexDirection: 'row'}}>
      <Picker selectedValue={languages[languageIndex].languageID} onValueChange={setWorkerLanguage} style={{color: 'white', flex:1}}>
      {
        languages.map((item) => (
        <Picker.Item key={`Language${item.languageID}`} label={item.name} value={item.languageID} />
        ))
      }
      </Picker>

    <Picker selectedValue={permissions[permissionIndex].permissionID} onValueChange={setWorkerPermission} style={{color: 'white', flex:1}}>
      {
        permissions.map((item) => (
        <Picker.Item key={`Permission${item.permissionID}`} label={item.name} value={item.permissionID} />
        ))
      }
    </Picker>
    </View>
    <Text style={[style.addLabel]}>Startdate: </Text>
      <View style={style.datePicker}>
      
      {worker.contractStartDate != "" ?
        <Text style={style.addLabel}>{worker.contractStartDate.substring(0,10)}</Text>
      :
        <Text style={style.addLabel}>2023-01-07</Text>
      }
      <Button title="Show Date Picker" onPress={showDatePicker} style={style.addButton}/>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmStartDate}
        onCancel={hideDatePicker}
      />
      </View>
      <Text style={[style.addLabel]}>Enddate: </Text>
      <View style={style.datePicker}>
      
      {worker.contractEndDate != "" ?
        <Text style={style.addLabel}>{worker.contractEndDate.substring(0,10)}</Text>
      :
        <Text style={style.addLabel}>2023-01-07</Text>
      }
      <Button title="Show Date Picker" onPress={showEndDatePicker} style={style.addButton}/>
      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmEndDate}
        onCancel={hideEndDatePicker}
      />
      </View>
      
      <FAB
        icon={{ name: 'add', color: 'white' }}
        size="large"
        placement="right"
        color='#2c3e50'
        type='string'
        title="Save changes"
        onPress={() => addWorkerToDB(worker)}
      />
    </View> 
  );
};