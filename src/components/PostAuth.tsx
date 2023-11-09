import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Link } from "react-router-dom";

type PostAuthProps = {
  userId?: string;
};

const PostAuth = ({ userId }: PostAuthProps) => {
  const users = useSelector((state: RootState) => state.users);
  const author = users.find((user) => user.id.toString() === userId);

  return (
    <span>
      By {author ? <Link to={`/user/${author.id}`}>{author.name}</Link> : "Unknown author"}
    </span>
  );
};

export default PostAuth;
