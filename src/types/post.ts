export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  author: {
    name: string;
  };
};

export type PostCardProps = { post: Post };
