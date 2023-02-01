import { Text, StyleSheet, View  } from 'react-native';

import LoadGif from "../layout/loadGif";

// Theme
import useThemedStyles from "../styles/theme/useThemedStyles";
import { styles } from "../styles/styles";

export default function Fetching(props) {
  // Styling (theme)
  let style = useThemedStyles(styles);

  return (
    <View style={style.body}>
      <Text style={[style.loading, style.text]}>{props.message}</Text>
      
      <LoadGif/>
    </View>
  );
};