import { FlatList, ScrollView, View, TouchableOpacity, Text } from "react-native"
import {FAB, Icon} from "react-native-elements";


// Theme
import useThemedStyles from "../styles/theme/useThemedStyles";
import { styles } from "../styles/styles";

// Layout
import Separator from "../layout/seperator";
import Fetching from '../layout/message_fetching';
import Error from '../layout/message_error';

// Item in list
import FarmItem from "./farms/farm_item";

// recoil
import { useRecoilValue } from "recoil";
import { farmState } from "../store";

import { useState, useEffect } from "react";

import DbAPI from "../api/DbAPI";

export default function FarmsScreen({ navigation }) {
    // Styling (theme)
    let style = useThemedStyles(styles);

    const farmId = useRecoilValue(farmState);

    const [farms, setFarms] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      const focusHandler = navigation.addListener('focus', () => {
        fetchData();
      });
      const fetchData = async () => {
        setLoading(true);
        try {
          const result = await DbAPI.getFarms();
          //console.log('result', result.data);
          setFarms(result.data);
        } catch (error) {
          console.log('Something went wrong with the database api.', error);
        }
        setLoading(false);
      }
    });
    
    if(loading) return <Fetching/>
    function handleAdd(){
      navigation.navigate('AddFarm');
    }

    function handleDetails(item){
      navigation.navigate('FarmDetails', { id: item.farmID });
    }
  
      return (
        <View style={style.body}>
          <View style={style.farmsList}>
            <FlatList
              data={farms} 
              renderItem={({ item }) => <FarmItem item={item} onPress={handleDetails}/>}
              keyExtractor={(item, index) => index}
              ItemSeparatorComponent={Separator}
            />
        </View>
        <TouchableOpacity style={style.addButton} onPress={handleAdd}>
          <Icon name="add" />
          <Text style={style.addButtonText}>Add a farm</Text>
        </TouchableOpacity>
      </View>
      );
  }