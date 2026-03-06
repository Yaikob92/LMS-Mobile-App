import Slide from "@/components/onboarding/slide";
import Slider from "@/components/onboarding/slider";
import { onBoardingSlides } from "@/config/constants";
import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Slider() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Slider
        key={index}
        index={index}
        setindex={setIndex}
        prev={
          prev && <Slide slide={prev} totalSlidess={onBoardingSlides.length} />
        }
        next={
          next && <Slide slide={next} totalSlidess={onBoardingSlides.length} />
        }
      ></Slider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
