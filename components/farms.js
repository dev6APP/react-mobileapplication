import { FlatList, View } from "react-native"

// apollo, queries
import { useQuery } from "@apollo/client";
import { GET_FIELDOWNER_FARMS } from "../gql/queries";

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
      const fetchData = async () => {
        setLoading(true);
        try {
          const result = await DbAPI.getFarms();
          console.log('result', result.data);
          setFarms(result.data);
        } catch (error) {
          console.log('Something went wrong with the database api.', error);
        }
        setLoading(false);
      }
      fetchData();
    }, []);
    
    if(loading) return <Fetching/>


    function handleDetails(item){
      navigation.navigate('FarmDetails', { id: item.farmID });
    }
  
      return (
        <View style={style.body}>
        <FlatList
          data={farms} 
          renderItem={({ item }) => <FarmItem item={item} onPress={handleDetails}/>}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={Separator}
        />
      </View>
      );
  }