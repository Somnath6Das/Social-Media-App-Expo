import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { cld } from "~/src/lib/cloudinary";
import { AdvancedImage } from "cloudinary-react-native";
import { useTheme } from "../theme/ThemeProvider";

export default function CommentList({ comment }: any) {
  // console.log(JSON.stringify(comment, null, 2));
  const theme = useTheme();
  let avatar = cld.image(comment.user.avatar_url);
  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, marginLeft: 8, marginRight: 8 }}
    >
      <View style={{ marginBottom: 10 }}>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 10,
            alignItems: "center",
            gap: 10,
          }}
        >
          {comment.user.avatar_url ? (
            <AdvancedImage
              cldImg={avatar}
              style={{
                width: 40,
                height: 40,
                aspectRatio: 1,
                borderRadius: 50,
              }}
            />
          ) : (
            <Image
              source={require("~/assets/photos/user.png")}
              style={{
                width: 40,
                height: 40,
                aspectRatio: 1,
                borderRadius: 50,
              }}
            />
          )}
          <View style={{ gap: 3 }}>
            <Text
              style={{ fontSize: 15, fontWeight: "500", color: theme.text }}
            >
              {comment.user.username || "New User"}
            </Text>
            <Text style={{ color: theme.text }}>{comment.comment}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
