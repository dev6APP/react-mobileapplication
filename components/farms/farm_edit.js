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
    const id = route.params.id;

    
    const [farm, setFarm] = useState({name: "", address: ""});
    const style = useThemedStyles(styles);

    useEffect(() => {
      setFarm({address: route.params.address, name: route.params.name});
    }, []);
    
    async function editFarm(){
      console.log('id: ', id , 'farm: ', farm)
        try {
            console.log(farm)
            DbAPI.editFarm(id, farm);
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
        value={farm.name}
        onChangeText={(name) => setFarm({...farm, name})}
        asterik
        placeholder='Farm name'
        />
        <FormItem
        isRequired
        value={farm.address}
        onChangeText={(address) => setFarm({...farm, address})}
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
        onPress={() => editFarm()}
      />
    </View> 
  );
};