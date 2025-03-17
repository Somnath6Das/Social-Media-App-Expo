import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const BottomSheetComponent = ({ bottomSheetRef }: any) => {
  const snapPoints = useMemo(() => ["50%", "70%"], []);

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
        <Text onPress={handleClosePress}>Awesome 🎉</Text>
      </BottomSheetView>
    </BottomSheet>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});
export default BottomSheetComponent;
