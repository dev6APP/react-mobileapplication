import React, { useState} from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import useThemedStyles from "../styles/theme/useThemedStyles";
import { red } from "../styles/styles";


const FloatingButton = () => {

  const [icon_1] = useState(new Animated.Value(10));
  const [icon_2] = useState(new Animated.Value(10));
  const [icon_3] = useState(new Animated.Value(10));


  const [pop, setPop] = useState(false);

  const popIn = () => {
    setPop(true);
    Animated.timing(icon_1, {
      toValue: 90,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 70,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
        toValue: 90,
        duration: 300,
        useNativeDriver: false,
    }).start();
  }

  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: 10,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 10,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
        toValue: 10,
        duration: 300,
        useNativeDriver: false,
    }).start();
  }
  return(
    <View style={{
      flex: 1
    }}>
      <Animated.View style={[styles.circle, { bottom: icon_1}, { backgroundColor: useThemedStyles(red)}]}>
        <TouchableOpacity>
          <Icon name="pencil" size={25} color="#FFFF" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, { bottom: icon_2, right: icon_2}]}>
        <TouchableOpacity>
          <Icon name="print" size={25} color="#FFFF" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, { right: icon_3}, { backgroundColor: useThemedStyles(red)}]}>
        <TouchableOpacity>
          <Icon name="trash" size={25} color="#FFFF" />
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity
        style={[styles.circle, {backgroundColor: useThemedStyles(red)}]}
        onPress={() => {
          pop === false ? popIn() : popOut();
        }}
      >
        <Icon name="plus" size={25} color="#FFFF" />
      </TouchableOpacity>
    </View>
  )

}

export default FloatingButton;

const styles = StyleSheet.create({
  circle: {
     width: 60,
     height: 60,
     position: 'absolute',
     bottom: 10,
     right: 10,
     borderRadius: 50,
     justifyContent: 'center',
     alignItems: 'center',
  },
})