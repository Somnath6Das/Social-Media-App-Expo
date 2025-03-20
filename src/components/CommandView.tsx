import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function CommentView({ post, comment }: any) {
  console.log(JSON.stringify(comment, null, 2));

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

        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          {comment?.profiles?.username}
        </Text>
      </View>
      <View style={{ marginLeft: 55, marginRight: 6 }}>
        <Text>{comment.comment}</Text>
      </View>
    </ScrollView>
  );
}
