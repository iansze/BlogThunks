export type Post = {
  id: string;
  title: string;
  body: string;
  userId: string;
  date: string;
  reactions: PostReaction;
};

export type PostReaction = {
  thumbsUp: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
};

export type PostInitialState = {
  posts: Post[];
  status: "idle" | "loading" | "failed" | "succeeded";
  error: string | null;
};

export type ReactionAddedPayload = {
  postId: string;
  reaction: keyof PostReaction;
};

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  address: string;
  phone: string;
  website: string;
  company: string;
};

export type FetchPostsResponse = {
  body: string;
  id: number;
  title: string;
  userId: number;
  reactions: PostReaction;
  date: string;
};
