import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { FontAwesome } from "@expo/vector-icons";

const BottomSheetComponent = ({
  bottomSheetRef,
  ViewModel,
  minIndex,
  maxIndex,
  commandInput = null,
}: any) => {
  const snapPoints = useMemo(() => [minIndex, maxIndex], []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      bottomSheetRef.current?.close();
    }
  }, []);
  const handleClosePress = () => bottomSheetRef.current?.close();

  // renders
  return (
    <BottomSheet
      index={-1}
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
    >
      <BottomSheetView style={styles.contentContainer}>
        <TouchableOpacity
          onPress={handleClosePress}
          style={{ alignItems: "flex-end", marginRight: 20 }}
        >
          <FontAwesome name="close" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.modelContent}>
          {ViewModel}
          {commandInput}
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  modelContent: {
    flex: 1,
    justifyContent: "space-between",
  },
});
export default BottomSheetComponent;
