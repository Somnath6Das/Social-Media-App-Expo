import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import PostList from "~/src/components/PostList";
import { supabase } from "~/src/lib/superbase";
import { useAuth } from "~/src/global/useAuth";
import { AuthContextType } from "~/src/types";
import BottomSheet from "@gorhom/bottom-sheet";
import BottomSheetComponent from "~/src/components/BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CommandList from "~/src/components/CommandList";

import CommandInput from "~/src/components/CommentInput";
import { useCommentStore } from "~/src/global/useComments";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const isMounted = useRef(false);
  const { auth, updateAuth } = useAuth() as AuthContextType;
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<any[] | null>([]);
  const comments = useCommentStore((state) => state.comments);
  // console.log(JSON.stringify(comments, null, 2));
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
    isMounted.current = true;
    if (isMounted.current) {
      fetchPosts();
    }
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <>
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
            data={comments}
            renderItem={({ item }: any) => <CommandList comment={item} />}
            contentContainerStyle={{
              gap: 10,
              maxWidth: 512,
              alignSelf: "center",
              width: "100%",
            }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>No comments yet</Text>
              </View>
            }
            onRefresh={fetchPosts}
            refreshing={loading}
          />
        }
        commandInput={<CommandInput />}
        minIndex="50%"
        maxIndex="70%"
      />
    </>
  );
}
