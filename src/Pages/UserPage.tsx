import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Link, useParams } from "react-router-dom";

const UserPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const users = useSelector((state: RootState) => state.users);
  const user = users.find((user) => user.id.toString() === userId);
  const posts = useSelector((state: RootState) => state.posts.posts);

  return (
    <section>
      <h2>{user?.name}</h2>
      <ol>
        {posts
          .filter((post) => post.userId.toString() === userId)
          .map((post) => (
            <li key={post.id}>
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </li>
          ))}
      </ol>
    </section>
  );
};

export default UserPage;
