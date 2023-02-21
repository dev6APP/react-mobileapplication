import { View, Text, ScrollView } from 'react-native';

import { FormItem } from 'react-native-form-component';
import {Button, FAB} from "react-native-elements";

//theme
import useThemedStyles from "../../styles/theme/useThemedStyles";
import { styles } from "../../styles/styles";

// Layout
import Error from '../../layout/message_error';
import Fetching from '../../layout/message_fetching';

import DbAPI from '../../api/DbAPI';
import { useState, useEffect } from 'react';
import { Flex } from '@react-native-material/core';

export default function AddField({ route, navigation }) {
    const {id} = route.params;
    const [field, setField] = useState({name: "", farmID:id});
    //const [loading, setLoading] = useState(true);


    useEffect(() =>{
      //setLoading(true);
      getExistingFields();
      //setLoading(false);
    }, [])

    async function getExistingFields(){
      try{
        const result = await DbAPI.getLastFieldId();
        const fieldId = result.data[result.data.length -1].fieldID + 1;
        console.log(result.data[result.data.length -1]);
        console.log("last ID: ", fieldId)

        setCoordinate1({...coordinate1, fieldId});
        setCoordinate2({...coordinate2, fieldId});
        setCoordinate3({...coordinate3, fieldId});
        setCoordinate4({...coordinate4, fieldId});

        //console.log(coordinate1, coordinate2, coordinate3, coordinate4);
  
      }
     catch (err){
      console.log(err);
    }

    }

    //if(loading) return <Fetching message="Getting existing field details..."/>



    const [coordinate1, setCoordinate1] = useState({x: "", y:"", fieldId: 0, boundaryOrder: 1});
    const [coordinate2, setCoordinate2] = useState({x: "", y:"", fieldId: 0, boundaryOrder: 2});
    const [coordinate3, setCoordinate3] = useState({x: "", y:"", fieldId: 0, boundaryOrder: 3});
    const [coordinate4, setCoordinate4] = useState({x: "", y:"", fieldId: 0, boundaryOrder: 4});


    console.log('init field:', field)
    const style = useThemedStyles(styles);
    
    async function addField(field, coordinate1, coordinate2, coordinate3, coordinate4){
      console.log('tf:', field)
      
        try {
            console.log(field)
            console.log("boundaries", coordinate1, coordinate2, coordinate3, coordinate4 )
            DbAPI.addField(field);
            DbAPI.addBoundary(coordinate1, coordinate2, coordinate3, coordinate4);
          } catch (error) {
            console.log('Something went wrong with the database api.', error);
            <Error/>
          }
        navigation.goBack();
    }

  return (
    <ScrollView style={[style.body]}>
      <FormItem
        isRequired
        value={field.name}
        onChangeText={(name) => setField({...field, name})}
        placeholder='Field name'
        />

      <Text>Coordinate 1:</Text>
      <View style={{display: 'flex', flexDirection: 'row'}}>
      <FormItem style={{marginRight: 5, flex: 1}}
        isRequired
        value={coordinate1.x}
        onChangeText={(x) => setCoordinate1({...coordinate1, x})}
        placeholder='Longitude'
        />
      <FormItem style={{flex: 1}}
        isRequired
        value={coordinate1.y}
        onChangeText={(y) => setCoordinate1({...coordinate1, y})}
        placeholder='Latitude'
        />
        </View>

        <Text>Coordinate 2:</Text>
      <View style={{display: 'flex', flexDirection: 'row'}}>
      <FormItem style={{marginRight: 5, flex: 1}}
        isRequired
        value={coordinate2.x}
        onChangeText={(x) => setCoordinate2({...coordinate2, x})}
        placeholder='Longitude'
        />
      <FormItem style={{flex: 1}}
        isRequired
        value={coordinate2.y}
        onChangeText={(y) => setCoordinate2({...coordinate2, y})}
        placeholder='Latitude'
        />
        </View>

        <Text>Coordinate 3:</Text>
      <View style={{display: 'flex', flexDirection: 'row'}}>
      <FormItem style={{marginRight: 5, flex: 1}}
        isRequired
        value={coordinate3.x}
        onChangeText={(x) => setCoordinate3({...coordinate3, x})}
        placeholder='Longitude'
        />
      <FormItem style={{flex: 1}}
        isRequired
        value={coordinate3.y}
        onChangeText={(y) => setCoordinate3({...coordinate3, y})}
        placeholder='Latitude'
        />
        </View>

        <Text>Coordinate 4:</Text>
      <View style={{display: 'flex', flexDirection: 'row'}}>
      <FormItem style={{marginRight: 5, flex: 1}}
        isRequired
        value={coordinate4.x}
        onChangeText={(x) => setCoordinate4({...coordinate4, x})}
        placeholder='Longitude'
        />
      <FormItem style={{flex: 1}}
        isRequired
        value={coordinate4.y}
        onChangeText={(y) => setCoordinate4({...coordinate4, y})}
        placeholder='Latitude'
        />
        </View>

        
      <Button
        onPress={() => addField(field, coordinate1, coordinate2, coordinate3, coordinate4)}
      >Save</Button>
    </ScrollView> 
  );
};