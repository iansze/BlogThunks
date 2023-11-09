import { memo } from "react";
import { Link } from "react-router-dom";
import PostAuth from "./PostAuth";
import TimeFormat from "./TimeFormat";
import ReactionButton from "./ReactionButton";
import { Post } from "../types/types";
import TextTruncate from "react-text-truncate";

type PostArticleProps = {
  post: Post;
};

const PostArticle = memo(({ post }: PostArticleProps) => {
  return (
    <article>
      <Link to={`/post/${post.id}`}>
        <TextTruncate containerClassName="heading-2" line={1} text={`${post.title}`}></TextTruncate>
        <p>{post.body.substring(0, 50)}</p>
      </Link>
      <p>
        <PostAuth userId={post.userId.toString()} />
        <TimeFormat timestamp={post.date} />
      </p>
      <ReactionButton post={post} />
    </article>
  );
});

export default PostArticle;
