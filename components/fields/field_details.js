//import { View, Text } from 'react-native';
//
////theme
//import useThemedStyles from "../../styles/theme/useThemedStyles";
//import { styles } from "../../styles/styles";
//
//// Layout
//import Fetching from '../../layout/message_fetching';
//import Error from '../../layout/message_error';
//
//// apollo queries
//import { useQuery } from "@apollo/client";
//import { GET_FIELD } from '../../gql/queries';
//
//export default function FieldDetailsScreen({ route, navigation }) {
//    const { id } = route.params;
//    const { data, loading, error } = useQuery(GET_FIELD, { variables: {id}});
//    const style = useThemedStyles(styles);
//  
//    if (loading) return <Fetching message="Fetching data..." />
//    if (error) return <Error error={error} />
//
//    console.log(data);
//
//  return (
//    <View style={style.body}>
//    </View>
//  );
//};
