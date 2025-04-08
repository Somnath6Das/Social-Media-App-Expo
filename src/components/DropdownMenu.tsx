import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  Button,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeProvider";

const MenuDropdown = () => {
  const [visible, setVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<View>(null);

  const showMenu = () => {
    if (buttonRef.current) {
      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        setMenuPosition({
          top: pageY + height / 3.5,
          left: pageX / 1.6,
        });
        setVisible(true);
      });
    }
  };
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        ref={buttonRef}
        onPress={showMenu}
        // style={styles.button}
      >
        <Text>Open Menu</Text>
      </TouchableOpacity>
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View
            style={[
              styles.menuContainer,
              {
                position: "absolute",
                top: menuPosition.top,
                left: menuPosition.left,
                backgroundColor: theme.background,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                console.log(`Selected: delete`);
                setVisible(false);
              }}
            >
              <MaterialIcons
                name="delete-outline"
                size={24}
                color={theme.text}
              />
              <Text style={{ color: theme.text, fontSize: 15, marginLeft: 15 }}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menuContainer: {
    width: 160,

    borderRadius: 10,
    overflow: "hidden",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
});

export default MenuDropdown;
