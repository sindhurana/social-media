import { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { PostListContext } from "../store/post-list-store";
const Post = ({ post }) => {

    const { deletePost } = useContext(PostListContext);
    return <>

        <div className="card" style={{ width: "18rem" }}>

            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">
                    {post.body}</p>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    onClick={() => deletePost(post.id)}>
                    <AiFillDelete />
                </span>
                <div className="alert alert-success" role="alert">
                    This post has been reacted by {post.reactions} people.
                </div>
                {post.tags.map(tag => <a href="#" key={tag} className="btn btn-primary">{tag}</a>)}

            </div>
        </div>
    </>
}

export default Post;