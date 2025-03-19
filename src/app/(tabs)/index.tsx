import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import PostList from "~/src/components/PostList";
import { supabase } from "~/src/lib/superbase";
import { useAuth } from "~/src/global/useAuth";
import { AuthContextType } from "~/src/types";
import BottomSheet from "@gorhom/bottom-sheet";
import BottomSheetComponent from "~/src/components/BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CommandView from "~/src/components/CommandView";

export default function Home() {
  const { auth, updateAuth } = useAuth() as AuthContextType;
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<any[] | null>([]);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const openSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

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
    <GestureHandlerRootView>
      <FlatList
        data={posts}
        renderItem={({ item }: any) => (
          <PostList post={item} openSheet={openSheet} />
        )}
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
      <BottomSheetComponent
        bottomSheetRef={bottomSheetRef}
        ViewModel={
          <FlatList
            data={posts}
            renderItem={({ item }: any) => (
              <CommandView post={item} openSheet={openSheet} />
            )}
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
        }
        minIndex="50%"
        maxIndex="70%"
      />
    </GestureHandlerRootView>
  );
}
