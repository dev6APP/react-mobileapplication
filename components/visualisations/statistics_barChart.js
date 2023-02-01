import { Text, View, Dimensions } from "react-native";

// Theme
import useThemedStyles from "../../styles/theme/useThemedStyles";
import { text } from "../../styles/styles";
import { background } from "../../styles/styles";

import { BarChart } from "react-native-chart-kit";

export default function Stat_BarChart(props){
  // Styling (theme)
  const textColor = useThemedStyles(text);
  const backgroundColor = useThemedStyles(background);
  return (
    <View style={{marginBottom: 10}}>
      <Text style={{color: textColor}}>{props.title}</Text>
      <BarChart
        data={props.data}
        width={Dimensions.get("window").width - props.padding} // Width of screen - width of body - width of padding
        height={220}
        yAxisLabel=""
        yAxisSuffix="k"
        withInnerLines={false}
        showValuesOnTopOfBars={true}
        chartConfig={{
          backgroundGradientFrom: textColor,
          backgroundGradientTo: textColor,
          color: (opacity = 1) => backgroundColor,
        }}
        style={{
          backgroundColor: backgroundColor,
        }}
      />
    </View>
    )
};