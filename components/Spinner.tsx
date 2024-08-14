import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Image, Easing } from "react-native";
const DizzyDishSpinner = require("../assets/DizzyDishSpinner.png");

export default function Spinner({ isSpinning }: { isSpinning: boolean }) {
  const spinValue = useRef(new Animated.Value(0)).current;

  const startSpinAnimation = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.easeOut, // Adjust the timing function
      useNativeDriver: true,
    }).start(() => {
      console.log("Spinner Finished!");
    });
  };

  useEffect(() => {
    if (isSpinning) {
      startSpinAnimation();
    }
  }, [isSpinning]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "1800deg"], // Adjust the degrees for a single rotation
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <Image source={DizzyDishSpinner} style={styles.image} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "80%",
    aspectRatio: 1,
    maxWidth: 320,
    maxHeight: 320,
  },
});
