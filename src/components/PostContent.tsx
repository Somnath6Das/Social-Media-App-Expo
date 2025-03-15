import { AdvancedImage, AdvancedVideo } from "cloudinary-react-native";
import { Image, View } from "react-native";
import { useWindowDimensions } from "react-native";
import { thumbnail, scale } from "@cloudinary/url-gen/actions/resize";
import { cld } from "../lib/cloudinary";
import { useVideoPlayer, VideoView } from "expo-video";

export default function PostContent({ post }: { post: any }) {
  const { width, height } = useWindowDimensions();
  const image = cld.image(post.image);
  image.resize(thumbnail().width(width).height(width));
  const video = cld.video(post.image);
  video.resize(scale().width(width));

  const videoUrl = post.media_type === "video" ? video.toURL() : null;

  const player = useVideoPlayer(videoUrl || "", (player) => {
    player.loop = false;
    player.play();
  });

  return post.media_type === "image" ? (
    <AdvancedImage
      cldImg={image}
      style={{ width: "100%", aspectRatio: 4 / 3 }}
    />
  ) : post.media_type === "video" ? (
    <VideoView
      style={{ width: "100%", aspectRatio: 16 / 9 }}
      player={player}
      allowsFullscreen
      allowsPictureInPicture
      nativeControls={true}
    />
  ) : null;
}
