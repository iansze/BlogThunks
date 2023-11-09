import { useDispatch } from "react-redux";
import { reactionAdded } from "../store/feature/posts/postSlice";
import { Post, PostReaction } from "../types/types";

const reactionEmoji: { [K in keyof PostReaction]: string } = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕️",
};

type ReactionButtonProps = {
  post: Post;
};

const ReactionButton = ({ post }: ReactionButtonProps) => {
  const dispatch = useDispatch();

  const handleReaction = (reactionName: keyof PostReaction) => {
    dispatch(reactionAdded({ postId: post.id, reaction: reactionName }));
  };

  return (
    <div className="reaction">
      {Object.entries(reactionEmoji).map(([name, emoji]) => (
        <button
          className="reaction__btn"
          key={name}
          onClick={() => handleReaction(name as keyof PostReaction)}
        >
          {emoji} {post.reactions[name as keyof PostReaction]}
        </button>
      ))}
    </div>
  );
};

export default ReactionButton;
