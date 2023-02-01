import { Text, Pressable, View } from 'react-native';

//theme
import useThemedStyles from "../../styles/theme/useThemedStyles";
import { styles } from "../../styles/styles";

export default function WorkerItem({ item, onPress }) {
  const style = useThemedStyles(styles);
  
  return (
    <Pressable style={style.flatListItem} onPress={() => onPress(item)}>
      <View style={style.flatListTitle}>
        <Text style={[style.text, style.flatListTitleText]}>{item.name}</Text>
      </View>
      <View>
        <Text style={[style.text, style.flatListInfo]}>{item.country}</Text>
        <Text style={[style.text, style.flatListInfo]}>{item.city}</Text>
      </View>
    </Pressable>
  );
};