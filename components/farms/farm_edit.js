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

export default function EditFarm({ route, navigation }) {
    const { id } = route.params;
    const [farm, setFarm] = useState({name: "", address: ""});

    const style = useThemedStyles(styles);
    
    async function editFarm(id, farm){
        try {
            console.log(farm)
            DbAPI.editFarm(farm);
          } catch (error) {
            console.log('Something went wrong with the database api.', error);
            <Error/>
          }
        navigation.goBack();
    }

    function handleName(e){
        setFarm({...farm, name: e})
        console.log(farm);
    }

    function handleAddress(e){
        console.log(e);
        setFarm({...farm, address: e})
    }

  return (
    <View style={style.body}>
      <FormItem
        isRequired
        value={farm.name}
        onChangeText={handleName}
        asterik
        placeholder='Farm name'
        />
        <FormItem
        isRequired
        value={farm.address}
        onChangeText={handleAddress}
        asterik
        placeholder='Farm address'
        />
        <FAB
        icon={{ name: 'add', color: 'white' }}
        size="large"
        placement="right"
        color='#2c3e50'
        type='string'
        title="Save changes"
        onPress={() => editFarm(farm)}
      />
    </View> 
  );
};