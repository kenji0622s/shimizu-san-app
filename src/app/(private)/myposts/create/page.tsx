'use client'
import { useState, useActionState } from "react";
import TextareaAutosize from "react-textarea-autosize"
import { createPost } from "@/lib/actions/createPost";

export default function CreatePage() {
    const [content, setContent] = useState('')
    const [contentLength, setContentLength] = useState(0)

     const [state, formAction] = useActionState(createPost, {
            success: false, errors: {}
        })

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setContent(value)
        setContentLength(value.length)
    }   

  return (
    <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">新規記事投稿</h1>
        <form action={formAction} className="space-y-4">
            <div>
                <label htmlFor="title">タイトル</label>
                <input type="text" id="title" name="title" placeholder="タイトルを入力してください" className="w-full border p-2"/>
                {state.errors.title && (
                    <p className="text-red-500 text-sm mt-1">{state.errors.title.join(',')}</p>
                )}
            </div>
            <div>
                <label htmlFor="content">内容</label>
                <TextareaAutosize 
                    id="content" name="content" className="w-full border p-2" placeholder="内容を入力してください"
                    minRows={8} value={content} onChange={handleContentChange} />
                {state.errors.content && (
                    <p className="text-red-500 text-sm mt-1">{state.errors.content.join(',')}</p>
                )}
            </div>
            <div className="text-right text-sm text-gray-500 mt-1">
                文字数: {contentLength}
            </div>

            <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded">投稿する</button>
        </form>
    </div>
  )
}