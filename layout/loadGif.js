import { Image, View } from "react-native"

// Theme
import useThemedStyles from "../styles/theme/useThemedStyles";
import { styles } from "../styles/styles";
export default function LoadGif(){
    // Styling (theme)
    let style = useThemedStyles(styles);

    return(
        <Image style={style.loader} source={{ uri: 'https://jonaswouters.sinners.be/project4/loader.gif'}} />
    )
}