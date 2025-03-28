import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { FontAwesome } from "@expo/vector-icons";
import { useCommentStore } from "../global/useComments";
import { useTheme } from "../theme/ThemeProvider";

const BottomSheetComponent = ({
  bottomSheetRef,
  minIndex,
  maxIndex,
  ViewModel,
  commandInput = null,
}: any) => {
  const snapPoints = useMemo(() => [minIndex, maxIndex], []);
  const theme = useTheme();
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      useCommentStore.getState().clearComments();
      bottomSheetRef.current?.close();
    }
  }, []);
  const handleClosePress = () => {
    useCommentStore.getState().clearComments();
    bottomSheetRef.current?.close();
  };

  // renders
  return (
    <BottomSheet
      index={-1}
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: theme.cardback }}
      handleIndicatorStyle={{ backgroundColor: theme.text }}
    >
      <BottomSheetView
        style={{
          flex: 1,
          backgroundColor: theme.cardback,
        }}
      >
        <TouchableOpacity
          onPress={handleClosePress}
          style={{ alignItems: "flex-end", marginRight: 20 }}
        >
          <FontAwesome name="close" size={20} color={theme.text} />
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
  modelContent: {
    flex: 1,
    justifyContent: "space-between",
  },
});
export default BottomSheetComponent;
