import { View, StyleSheet } from 'react-native';

export default function Separator() {
  return (
    <View
      style={styles.line}
    />
  );
};

const styles = StyleSheet.create({
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE",
  },
});