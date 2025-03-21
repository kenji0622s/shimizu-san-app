import { getOwnPosts } from "@/lib/ownPost"
import { auth } from '@/auth'
import PostDropdownMenu from "@/components/post/PostDropdownMenu"
import Link from 'next/link'

export default async function DashBoardPage() {
  const session = await auth()
  const userId = session?.user?.id
  if(!session?.user?.email || !userId){
    throw new Error('不正なリクエストです')
  }

  const posts = await getOwnPosts(userId)
  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl foont-bold">記事一覧</h1>
          <Link className="bg-indigo-500 text-white px-4 py-2 rounded" href="/myposts/create">新規記事作成</Link>
      </div>
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-center">タイトル</th>
            <th className="border p-2 text-center">表示 / 非表示</th>
            <th className="border p-2 text-center">更新日時</th>
            <th className="border p-2 text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          { posts.map((post)=>(
            <tr key={post.id}>
              <td className="border p-2">{post.title}</td>
              <td className="border p-2 text-center">
                {post.published ? "表示" : "非表示"}
              </td>
              <td className="border p-2 text-center">
                {new Date(post.updatedAt).toLocaleString()}
              </td>
              <td className="border p-2 text-center">
                <PostDropdownMenu postId={post.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}