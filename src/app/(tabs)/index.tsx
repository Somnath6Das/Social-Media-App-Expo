import { useEffect, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PostList from "~/src/components/PostList";
import { supabase } from "~/src/lib/superbase";
import { useAuth } from "~/src/global/useAuth";
import { AuthContextType } from "~/src/types";

export default function Home() {
  const { auth, updateAuth } = useAuth() as AuthContextType;
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<any[] | null>([]);

  const fetchPosts = async () => {
    setLoading(true);
    let { data, error } = await supabase
      .from("posts")
      .select("*, user:profiles(*), my_likes:likes(*), likes(count)")
      // .eq("id", 34)
      .eq("my_likes.user_id", auth.user?.id)
      .order("created_at", { ascending: false });

    if (error) {
      Alert.alert("Something went wrong");
    }
    // console.log(JSON.stringify(data, null, 2));
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <PostList className="gap-10 max-w-40 self-center w-full" /> */}
      <FlatList
        data={posts}
        renderItem={({ item }: any) => <PostList post={item} />}
        contentContainerStyle={{
          gap: 10,
          maxWidth: 512,
          alignSelf: "center",
          width: "100%",
        }}
        showsVerticalScrollIndicator={false}
        onRefresh={fetchPosts}
        refreshing={loading}
      />
    </SafeAreaView>
  );
}
