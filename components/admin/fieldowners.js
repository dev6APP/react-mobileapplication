import { FlatList, ScrollView, View, TouchableOpacity, Text } from "react-native"
import {FAB, Icon} from "react-native-elements";

// Theme
import useThemedStyles from "../../styles/theme/useThemedStyles";
import { styles } from "../../styles/styles";

// Layout
import Separator from "../../layout/seperator";
import Fetching from '../../layout/message_fetching';
import Error from '../../layout/message_error';

// Item in list
import FieldOwnerItem from "./fieldowner/fieldOwner_item";

// recoil
import { useRecoilValue } from "recoil";
import { adminFieldOwnerState } from "../../store";

import { useState, useEffect } from "react";
import DbAPI from "../../api/DbAPI";

export default function FarmsScreen({ navigation }) {
    // Styling (theme)
    let style = useThemedStyles(styles);
    const [fieldOwners, setFieldOwners] = useState(null);
    const [loading, setLoading] = useState(true);

    const fieldOwnerId = useRecoilValue(adminFieldOwnerState);
    
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const result = await DbAPI.getFieldOwners();
          console.log('fieldowners', result.data);
          setFieldOwners(result.data);
        } catch (error) {
          console.log('Something went wrong with the database api.', error);
          <Error/>
        }
        setLoading(false);
      }
      const focusHandler = navigation.addListener('focus', () => {
        fetchData();
      });
    }, []);
    
    if(loading) return <Fetching/>
    
    function handleAdd(){
      navigation.navigate('AddFieldOwner');
    }


    function handleDetails(item){
      navigation.navigate('FieldOwnerDetails', { id: item.fieldOwnerID });
    }
  
      return (
        <View style={style.body}>
          <View style={style.farmsList}>
        <FlatList
          data={fieldOwners}
          renderItem={({ item }) => <FieldOwnerItem item={item} onPress={handleDetails}/>}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={Separator}
        />
        </View>

        <TouchableOpacity style={style.addButton} onPress={handleAdd}>
          <Icon name="add" />
          <Text style={style.addButtonText}>Add a Field Owner</Text>
        </TouchableOpacity>
      </View>
      );
  }