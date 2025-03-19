import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { supabase } from "../lib/superbase";

export default function CommandView({ post }: any) {
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          marginLeft: 10,
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          source={require("~/assets/photos/user.png")}
          style={{ width: 35, height: 35, aspectRatio: 1, borderRadius: 50 }}
        />

        <Text style={{ fontSize: 15, fontWeight: "500" }}>{post.id}</Text>
      </View>
      <View style={{ marginLeft: 55, marginRight: 6 }}>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          possimus tenetur vel assumenda, temporibus nulla, tempore at explicabo
          enim libero minima id deserunt nobis minus molestias dolores! Error,
          itaque reiciendis?
        </Text>
      </View>
    </ScrollView>
  );
}
