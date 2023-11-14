import { useSelector } from "react-redux";
import { RootState } from "../store";
import PostAuth from "../components/PostAuth";
import TimeFormat from "../components/TimeFormat";
import ReactionButton from "../components/ReactionButton";
import { Link, useParams } from "react-router-dom";

const SinglePost = () => {
  const { id } = useParams<{ id: string }>();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const post = posts.find((post) => post.id.toString() === id);

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <article key={post.id}>
      <h2 className="heading-2">{post.title}</h2>
      <p className="singlePost_content">{post.body.substring(0, 50)}</p>
      <Link to={`/post/edit/${post.id}`} className="edit_link">
        Edit Post
      </Link>
      <p className="singlePost_author">
        <PostAuth userId={post.userId.toString()} />
        <TimeFormat timestamp={post.date} />
      </p>
      <ReactionButton post={post} />
    </article>
  );
};

export default SinglePost;
