import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../store/feature/posts/postsThunks";
import { AppDispatch, RootState } from "../store/index";
import PostArticle from "../components/PostArticle";
import "../styles/_post.scss";

const PostsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const status = useSelector((state: RootState) => state.posts.status);
  const error = useSelector((state: RootState) => state.posts.error);
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
  const limitedPosts = orderedPosts.slice(0, 20);
  let content;

  if (status === "loading") {
    content = <p>"Loading..."</p>;
  } else if (status === "idle") {
    dispatch(fetchPosts());
    content = "";
  } else if (status === "failed") {
    content = <p>{error}</p>;
  }

  const renderPosts = limitedPosts.map((post) => <PostArticle key={post.id} post={post} />);

  return (
    <section>
      {content}
      {!content && renderPosts}
    </section>
  );
};

export default PostsList;
