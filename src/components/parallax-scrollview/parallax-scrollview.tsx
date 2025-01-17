import type { ReactElement } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { View, StatusBar, SafeAreaView } from "react-native";

const HEADER_HEIGHT = 250;

interface Props {
  headerImage?: ReactElement;
  headerBackgroundColor?: any;
  children?: any;
  title?: any;
}

export default function ParallaxScrollView(props: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.2]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: props.headerBackgroundColor },
            headerAnimatedStyle,
          ]}
        >
          {props.headerImage && props.headerImage}
          {props.title && props.title}
        </Animated.View>
        <View style={styles.content}>{props.children}</View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 140,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: 16,
    gap: 32,
    overflow: "hidden",
  },
});
