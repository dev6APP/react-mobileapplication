import { View, Text } from 'react-native';
import { Pressable, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { FormItem } from 'react-native-form-component';
import {FAB} from "react-native-elements";

//theme
import useThemedStyles from "../../styles/theme/useThemedStyles";
import { styles } from "../../styles/styles";

// Layout
import Error from '../../layout/message_error';

import DbAPI from '../../api/DbAPI';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Fetching from '../../layout/message_fetching';


export default function EditField({ navigation }) {
    const [fieldName, setFieldName] = useState("");

    const style = useThemedStyles(styles);
    
    async function editField(fieldName){
        try {
            console.log(fieldName)
            DbAPI.editField(fieldName);
          } catch (error) {
            console.log('Something went wrong with the database api.', error);
            <Error/>
          }
        navigation.goBack();
    }

  return (
    <View style={style.body}>
      <FormItem
        isRequired
        value={fieldName}
        onChangeText={(name) => setFieldName(name)}
        asterik
        placeholder='Field name'
        />
        <FAB
        icon={{ name: 'add', color: 'white' }}
        size="large"
        placement="right"
        color='#2c3e50'
        type='string'
        title="Save changes"
        onPress={() => editField(fieldName)}
      />
    </View> 
  );
};