import { View, Text } from 'react-native';

//theme
import useThemedStyles from "../../../styles/theme/useThemedStyles";
import { styles } from "../../../styles/styles";

// Layout
import Fetching from '../../../layout/message_fetching';
import Error from '../../../layout/message_error';

import DbAPI from '../../../api/DbAPI';
import { useState, useEffect } from 'react';

export default function FieldOwnerDetails({ route, navigation }) {
    const { id } = route.params;
    const [details, setDetails] = useState(null);
    const [details2, setDetails2] = useState(null);
    const [loading, setLoading] = useState(true);

    const style = useThemedStyles(styles);
    
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const result1 = await DbAPI.getFieldOwnerDetails(id);
          const result2 = await DbAPI.getFarmFromFieldOwner(id);
          console.log('details', result2.data);
          setDetails(result1.data[0]);
          setDetails2(result2.data[0]);
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
      <Text style={[style.text, style.name]}>{details.name}</Text>
      <Text style={style.text}>{details.country}, {details.city}</Text>
      <View style={style.listWithLabel}>
        {details.farms.map((farm, indexFarm) => (
          <View style={(indexFarm === details.farms.length - 1) ? style.none : style.listWithLabelItem} key={`Farm${indexFarm}`}>
            <Text style={[style.text, style.listWithLabelItemTitle]} key={`keyFarmName${indexFarm}`}>{farm.name}</Text>
            {farm.started && (<Text style={[style.text, style.opacity6]} key={`keyFarmStartDate${indexFarm}`}>{farm.started}</Text>)}
          </View>
        ))}
        <View style={style.farmInfoList}>
        <Text style={[style.text, {fontWeight: "bold"}]}>Fields</Text>
        {details2.fields.map((field, indexField) => (
          <Text style={[style.text, style.farmInfoListItem]} key={`Field${indexField}`}>{field.name}</Text>
        ))}
        </View>

        <Text style={[style.text, style.listWithLabelLabel]}>Farms</Text>
      </View>
    </View>
  );
};