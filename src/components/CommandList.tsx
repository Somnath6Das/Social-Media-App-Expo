import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { cld } from "~/src/lib/cloudinary";
import { AdvancedImage } from "cloudinary-react-native";

export default function CommentList({ comment }: any) {
  // console.log(JSON.stringify(comment, null, 2));
  let avatar = cld.image(comment.profiles.avatar_url);
  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={{ marginBottom: 18 }}>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 10,
            alignItems: "center",
            gap: 10,
          }}
        >
          {comment.profiles.avatar_url ? (
            <AdvancedImage
              cldImg={avatar}
              style={{
                width: 40,
                height: 40,
                aspectRatio: 1,
                borderRadius: 50,
                marginLeft: 10,
              }}
            />
          ) : (
            <Image
              source={require("~/assets/photos/user.png")}
              style={{
                width: 35,
                height: 35,
                aspectRatio: 1,
                borderRadius: 50,
              }}
            />
          )}

          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            {comment?.profiles?.username || "new user"}
          </Text>
        </View>
        <View style={{ marginLeft: 70, marginRight: 6 }}>
          <Text>{comment.comment}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
