import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostListContext } from "../store/post-list-store";
import WelcomeMesage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {
    const { postList, fetching } = useContext(PostListContext);

    // console.log("post", postList)
    // console.log(postList);


    return <>
        {fetching && <LoadingSpinner />}
        {!fetching && postList.length === 0 && <WelcomeMesage />}
        {postList.map(post => <Post key={post.id} post={post}></Post>)}
    </>
}

export default PostList;