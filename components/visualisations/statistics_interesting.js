import { Text, View } from "react-native";

// Theme
import useThemedStyles from "../../styles/theme/useThemedStyles";
import { styles } from "../../styles/styles";

export default function Stat_interesting(props){
    // Styling (theme)
    const style = useThemedStyles(styles);
    return (
      <View style={style.mb10}>
      <Text style={style.text}>{props.title}</Text>
          <Text style={[style.largeButton, style.textLargeButton]}>{props.beforeData}{props.data}{props.afterData}</Text>
      </View>
      )
}