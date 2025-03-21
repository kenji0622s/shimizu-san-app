import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import Link from "next/link";
import { PostCardProps } from "@/types/post";

export default function PostCard({ post }: PostCardProps) {
  return (
      <Link href={`/posts/${post.id}`} className="overflow-hidden rounded-lg bg-white shadow-[0_0_4px_0px_rgba(0,0,0,0.4)] hover:shadow-[0_0_8px_0_rgba(0,0,0,0.4)] transition-shadow">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="line-clamp-2">{post.title}</h2>
        </div>
        <div className="px-4 py-5 sm:p-6 text-sm text-gray-600 mb-2 line-clamp-2"> {post.content}</div>
        <div className="px-4 py-4 sm:px-6 flex items-center justify-between text-sm text-gray-500">
          <span>{post.author.name}</span>
          <time>
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: true,
              locale: ja,
            })}
          </time>
        </div>
      </Link>
  );
}
