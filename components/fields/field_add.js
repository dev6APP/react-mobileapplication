import { View, Text } from 'react-native';

import { FormItem } from 'react-native-form-component';
import {FAB} from "react-native-elements";

//theme
import useThemedStyles from "../../styles/theme/useThemedStyles";
import { styles } from "../../styles/styles";

// Layout
import Error from '../../layout/message_error';

import DbAPI from '../../api/DbAPI';
import { useState, useEffect } from 'react';

export default function AddField({ route, navigation }) {
    const {id} = route.params;
    const [field, setField] = useState({name: "", farmID:id});

    console.log('init field:', field)
    const style = useThemedStyles(styles);
    
    async function addField(field){
      console.log('tf:', field)
        try {
            console.log(field)
            DbAPI.addField(field);
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
        value={field.name}
        onChangeText={(name) => setField({...field, name})}
        placeholder='Field name'
        />
        <FAB
        icon={{ name: 'add', color: 'white' }}
        size="large"
        placement="right"
        color='#2c3e50'
        type='string'
        title="Save changes"
        onPress={() => addField(field)}
      />
    </View> 
  );
};