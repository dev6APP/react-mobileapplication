import { View, Text, TextInput } from 'react-native';
import { Pressable, Button } from 'react-native';

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


export default function AddWorker() {
    const navigate = useNavigation();
    const [worker, setWorker] = useState("","", "","","","","","",0,0);
    const [loading, setLoading] = useState(true);
    const [permissions, setPermissions] = useState(null);
    const [languages, setLanguages] = useState(true);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const style = useThemedStyles(styles);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };


    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
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
        navigate(-1);
    }

    function setWorkerName(e){
        console.log(e)
        setWorker[{...worker, name: e }]
    }

    function setWorkerPassword(e){
        setWorker[{...worker, password: e }]
    }

    function setWorkerPhoneNumber(e){
        setWorker[{...worker, phoneNumber: e }]
    }

    function setWorkerCountry(e){
        setWorker[{...worker, country: e }]
    }

    function setWorkerCity(e){
        setWorker[{...worker, city: e.target.value }]
    }
    function setWorkerEmailAddress(e){
        setWorker[{...worker, emailAddress: e }]
    }
    function setWorkerContractStart(e){
        setWorker[{...worker, contractStartDate: e }]
    }
    function setWorkerContractEnd(e){
        setWorker[{...worker, contractEndDate: e }]
    }
    function setWorkerPermission(e){
        setWorker[{...worker, PermissionID: e }]
    }
    function setWorkerLanguage(e){
        setWorker[{...worker, languageID: e }]
    }

    
  return (
    <View style={style.body}>
      <TextInput
      style={style.textInput}
      label="Enter a name"
      variant="outlined"
        autoCorrect={false}
        onChangeText={setWorkerName}
        placeholder="Name"
      />
      <TextInput
      style={style.textInput}
      label="Enter a password"
      variant="outlined"
      autoCorrect={false}
        onChangeText={setWorkerPassword}
        placeholder="Password"
      />
      <TextInput
      style={style.textInput}
      label="Enter a phone number"
      variant="outlined"
      autoCorrect={false}
        onChangeText={setWorkerPhoneNumber}
        placeholder="Phone Number"
      />
      <TextInput
      style={style.textInput}
      label="Enter a city"
      variant="outlined"
      autoCorrect={false}
        onChangeText={setWorkerCity}
        placeholder="City"
      />
      <TextInput
      style={style.textInput}
      label="Enter a country"
      variant="outlined"
      autoCorrect={false}
        onChangeText={setWorkerCountry}
        placeholder="Country"
      />
      <TextInput
      style={style.textInput}
      label="Enter an email address"
      variant="outlined"
      autoCorrect={false}
        onChangeText={setWorkerEmailAddress}
        placeholder="Email Address"
      />
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      
      <TextInput
      style={style.textInput}
        label="Enter the enddate of the workers contract"
      variant="outlined"
      autoCorrect={false}
        onChangeText={setWorkerContractEnd}
        placeholder="yyyy-MM-dd"
      />
      <Picker selectedValue={languages[0].name} onValueChange={setWorkerLanguage}>
      {
        languages.map((item) => (
        <Picker.Item key={`Language${item.languageID}`} label={item.name} value={item.languageID} />
        ))
      }
      </Picker>

    <Picker selectedValue={permissions[0].name} onValueChange={setWorkerPermission}>
      {
        permissions.map((item) => (
        <Picker.Item key={`Permission${item.permissionID}`} label={item.name} value={item.permissionID} />
        ))
      }
      </Picker>
      <Pressable style={styles.largebutton} onPress={() => addWorkerToDB(worker)}>
          <Text style={styles.buttontext}>Add worker</Text>
      </Pressable>
    </View> 
  );
};