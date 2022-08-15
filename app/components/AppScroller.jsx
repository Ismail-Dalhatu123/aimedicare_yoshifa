import { useRef } from "react";
import { Platform, ScrollView } from "react-native";

const AppScroller = ({
  children,
  scollOnchange,
  isOffSetting,
  setIsOffSetting,
  min100,
  contentContainerStyle = {},
  ...props
}) => {
  const scrollView = useRef(null);
  return (
    <ScrollView
      {...props}
      ref={scrollView}
      onContentSizeChange={() => {
        if (scollOnchange) {
          scrollView.current.scrollToEnd({ animated: true });
        }
      }}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={2}
      contentContainerStyle={[
        contentContainerStyle,
        min100 ? { minHeight: "98%" } : {},
      ]}
      onScroll={(e) => {
        const offset = e.nativeEvent.contentOffset.y;
        if (offset > 0 && isOffSetting) return;
        typeof setIsOffSetting === "function" &&
          setIsOffSetting(offset > 0 ? true : false);
      }}
    >
      {children}
    </ScrollView>
  );
};

export default AppScroller;
