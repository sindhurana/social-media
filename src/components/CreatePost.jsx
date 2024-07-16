import { useContext, useRef } from "react";
import { PostListContext } from "../store/post-list-store";

const CreatePost = () => {

    const { addPost } = useContext(PostListContext);

    const postTitleElement = useRef();
    const postBodyElement = useRef();
    const userIdElement = useRef();
    const reactionsElement = useRef();
    const tagsElement = useRef();


    const handleSubmit = (event) => {
        event.preventDefault();
        const title = postTitleElement.current.value;
        const body = postBodyElement.current.value;
        const userId = userIdElement.current.value;
        const reactions = reactionsElement.current.value;
        const tags = tagsElement.current.value.split(" ");

        // console.log(title, body, userId, reactions, tags)

        // addPost(title, body, userId, reactions, tags);

        fetch('https://dummyjson.com/posts/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title, body, userId, reactions, tags
                /* other post data */
            })
        })
            .then(res => res.json())
            .then(post => { addPost(post) });
    }


    return <>
        <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Post Title</label>
                <input type="text" className="form-control" id="title" ref={postTitleElement} />
            </div>

            <div className="mb-3">
                <label htmlFor="body" className="form-label">Post Content</label>
                <textarea rows="4" className="form-control" id="body" ref={postBodyElement} />
            </div>

            <div className="mb-3">
                <label htmlFor="UserId" className="form-label">User-Id</label>
                <input type="text" className="form-control" id="UserId" ref={userIdElement} />
            </div>

            <div className="mb-3">
                <label htmlFor="reactions" className="form-label">Reactions</label>
                <input type="text" className="form-control" id="reactions" ref={reactionsElement} />
            </div>

            <div className="mb-3">
                <label htmlFor="tags" className="form-label">Tags</label>
                <input type="text" className="form-control" id="tags" ref={tagsElement} />
            </div>

            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Post</button>
        </form>
    </>
}

export default CreatePost;