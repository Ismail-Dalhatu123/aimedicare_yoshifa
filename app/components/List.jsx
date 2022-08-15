import { useEffect, useRef } from "react";
import { FlatList } from "react-native";
const List = ({
  items,
  showIndicator = false,
  renderItem,
  setRef,
  ...props
}) => {
  const scrollRef = useRef();
  useEffect(() => {
    if (typeof setRef === "function") {
      setRef(scrollRef);
    }
  }, []);
  return (
    <FlatList
      {...props}
      ref={scrollRef}
      showsHorizontalScrollIndicator={showIndicator}
      showsVerticalScrollIndicator={showIndicator}
      data={items}
      renderItem={({ item }) => renderItem(item)}
      keyExtractor={(_, idx) => idx.toString()}
    />
  );
};
export default List;
