import { Text, StyleSheet  } from 'react-native';
// Theme
import useThemedStyles from "../styles/theme/useThemedStyles";
import { styles } from "../styles/styles";

export default function Error({ error }) {
  // Styling (theme)
  let style = useThemedStyles(styles);

  return (
    <View style={style.body}>
      <Text style={[style.error, style.text]}>Error! {error.message}</Text>
    </View>
  );
};