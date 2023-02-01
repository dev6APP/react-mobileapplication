import { Text } from "react-native";

// Theme
import useThemedStyles from "../../styles/theme/useThemedStyles";
import { styles } from "../../styles/styles";

export default function Stat_heatmap(){
    // Styling (theme)
    const style = useThemedStyles(styles);

    return(
        <Text style={style.text}>Heatmap</Text>
    )
}