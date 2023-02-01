import { View, Text } from 'react-native';

//theme
import useThemedStyles from "../../styles/theme/useThemedStyles";
import { styles } from "../../styles/styles";

// Layout
import Fetching from '../../layout/message_fetching';
import Error from '../../layout/message_error';

// Apollo
import { useQuery } from "@apollo/client";
import { GET_WORKER_DETAILS } from '../../gql/queries';

import DbAPI from '../../api/DbAPI';
import { useState, useEffect } from 'react';

export default function WorkerDetailsScreen({ route, navigation }) {
    const { id } = route.params;
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const style = useThemedStyles(styles);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const result = await DbAPI.getWorkerDetails(id);
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

  return (
    <View style={style.body}>
      {console.log(details)}
      <Text style={[style.text, style.name]}>{details.name}</Text>
      <Text style={style.text}>{details.country}, {details.city}</Text>
      <Text style={[style.text, style.opacity6]}>({details.language.name})</Text>
      <View style={style.listWithLabel}>
        <Text style={style.text}>{details.emailAddress}</Text>
        <Text style={style.text}>{details.phoneNumber}</Text>
        <Text style={[style.text, style.listWithLabelLabel]}>Contact information</Text>
      </View>
    </View> 
  );
};