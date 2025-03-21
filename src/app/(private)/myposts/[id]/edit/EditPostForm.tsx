"use client";
import { useState, useActionState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { updatePost } from "@/lib/actions/updatePost";

type EditPostFormProps = {
  post: {
    id: string;
    title: string;
    content: string;
    published: boolean;
  };
};

export default function EditPostForm({ post }: EditPostFormProps) {
  const [content, setContent] = useState(post.content);
  const [contentLength, setContentLength] = useState(0);
  const [title, setTitle] = useState(post.title);
  const [published, setPublished] = useState(post.published);

  const [state, formAction] = useActionState(updatePost, {
    success: false,
    errors: {},
  });

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setContentLength(value.length);
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">新規記事投稿(Markdown対応)</h1>
      <form action={formAction}>
        <div className="mb-4">
          <label htmlFor="title">タイトル</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="タイトルを入力してください"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2"
          />
          {state.errors.title && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.title.join(",")}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="content">内容</label>
          <TextareaAutosize
            id="content"
            name="content"
            className="w-full border p-2"
            placeholder="内容を入力してください"
            minRows={8}
            value={content}
            onChange={handleContentChange}
          />
          {state.errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.content.join(",")}
            </p>
          )}
        </div>
        <div className="text-right text-sm text-gray-500 mt-1">
          文字数: {contentLength}
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              value="true"
              name="published"
              checked={published === true}
              onChange={() => {
                setPublished(true);
              }}
            />
            <label htmlFor="published-one">表示</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              value="false"
              id="published-two"
              name="published"
              checked={published === false}
              onChange={() => {
                setPublished(false);
              }}
            />
            <label htmlFor="published-two">非表示</label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded"
        >
          更新する
        </button>
        <input type="hidden" name="postId" value={post.id} />
      </form>
    </div>
  );
}
