import { Text, View, Dimensions } from "react-native";

// Theme
import useThemedStyles from "../../styles/theme/useThemedStyles";
import { text } from "../../styles/styles";
import { background } from "../../styles/styles";

import { LineChart } from "react-native-chart-kit";

export default function Stat_LineChart(props){
  // Styling (theme)
  const textColor = useThemedStyles(text);
  const backgroundColor = useThemedStyles(background);
  return (
    <View style={{marginBottom: 10}}>
    <Text style={{color: textColor}}>{props.title}</Text>
      <LineChart
        data={props.data}
        width={Dimensions.get("window").width - props.padding} // Width of screen - width of body - width of padding
        height={250}
        yAxisLabel=""
        yAxisSuffix=""
        verticalLabelRotation={45}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundGradientFrom: textColor,
          backgroundGradientTo: textColor,
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => backgroundColor,
          labelColor: () => backgroundColor,
          propsForDots: {
            r: "6",
            strokeWidth: "2.5",
            stroke: backgroundColor
          }
        }}
        style={{
          backgroundColor: backgroundColor,
        }}
      />
    </View>
    )
};