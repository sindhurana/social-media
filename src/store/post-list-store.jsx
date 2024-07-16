import { createContext, useEffect, useReducer, useState } from "react";

export const PostListContext = createContext({
    postList: [],
    addPost: () => { },
    deletePost: () => { },
    fetching: false
})

const postListReducer = (currPostList, action) => {
    let newPostList = currPostList;
    if (action.type === "Delete") {
        newPostList = newPostList.filter(post => post.id !== action.payload.postId)
        return newPostList;
    }
    else if (action.type === "add") {
        // console.log(action.payload)
        // console.log("curr", currPostList)
        newPostList = [action.payload.post, ...currPostList];
        return newPostList;
    }
    else if (action.type === "addInitialPost") {

        newPostList = action.payload.posts;
        return newPostList;
    }

}

const PostListProvider = ({ children }) => {

    const [postList, dispatchPostList] = useReducer(postListReducer, []);
    const [fetching, setFetching] = useState(false);

    const addPost = (post) => {
        dispatchPostList({
            type: "add",
            payload: { post }
        })
    }
    const deletePost = (postId) => {
        dispatchPostList({
            type: "Delete",
            payload: { postId }
        })

    }

    const addInitialPost = (posts) => {
        dispatchPostList({
            type: "addInitialPost",
            payload: { posts }
        })
    }

    useEffect(() => {


        const controller = new AbortController();
        const signal = controller.signal;
        setFetching(true);

        fetch('https://dummyjson.com/posts', { signal })
            .then(res => res.json())
            .then(data => {
                addInitialPost(data.posts)
                setFetching(false);
            })

        return () => {
            console.log("cleaning up");
            controller.abort();
        }

    }, [])


    return <PostListContext.Provider value={{ postList, addPost, deletePost }}>{children}</PostListContext.Provider>
}

const DEFAULTPOSTLIST = [{
    id: 1,
    title: "test",
    body: "tst",
    userId: "user1",
    reactions: 5,
    tags: ["ff", "mm", "nn"]
},
{
    id: 2,
    title: "test2",
    body: "tst2",
    userId: "user2",
    reactions: 6,
    tags: ["ff", "mm", "nn"]
}
]

export default PostListProvider;