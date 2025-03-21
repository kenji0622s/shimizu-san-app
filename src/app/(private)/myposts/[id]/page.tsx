import { notFound } from 'next/navigation'
import { getOwnPost } from '@/lib/ownPost'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { auth } from '@/auth'

  

type Params = {
  params: Promise<{id: string}>
}

export default async function ShowPage({params}: Params) {
  const session = await auth()
    const userId = session?.user?.id
    if(!session?.user?.email || !userId){
      throw new Error('不正なリクエストです')
    }

  const {id} = await params
  const post = await getOwnPost(userId, id)

  if(!post){
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500">
              投稿者: { post.author.name }
            </p>
            <time className="text-sm text-gray-500">
              { format(new Date(post.createdAt), 'yyyy年MM月dd日', { locale: ja })}
            </time>
          </div>
          <h1 className="text-3xl font-bold">{post.title}</h1>
        </div>
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </div>
  )
}