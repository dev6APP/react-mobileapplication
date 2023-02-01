import { View, Text, FlatList } from 'react-native';

//theme
import useThemedStyles from "../../styles/theme/useThemedStyles";
import { styles } from "../../styles/styles";

// Layout
import Fetching from '../../layout/message_fetching';
import Error from '../../layout/message_error';

// queries
import DbAPI from '../../api/DbAPI';
import { useState, useEffect } from "react";

export default function FarmDetailsScreen({ route, navigation }) {
    const { id } = route.params;
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    // Styling
    const style = useThemedStyles(styles);
    
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const result = await DbAPI.getFarmDetails(id);
          console.log('details', result.data[0]);
          setDetails(result.data[0]);
        } catch (error) {
          console.log('Something went wrong with the database api.', error);
          <Error/>
        }
        setLoading(false);
      }
      fetchData();
    }, []);
    
    if(loading) return <Fetching/>

    function handleDetails(item){
      navigation.navigate('FieldDetails', { id: item.id });
    }

  return (
    <View style={style.body}>
      <Text style={[style.text, style.name]}>{details.name}</Text>
      <Text style={style.text}>{details.started}</Text>
      <View style={style.listWithLabel}>
        {details.fields.map((field, index) => (
          <Text onPress={() => {handleDetails(index)}} style={style.text} key={index}>{field.name}</Text>
        ))}
        <Text style={[style.text, style.listWithLabelLabel]}>Fields</Text>
      </View>
    </View>
  );
};