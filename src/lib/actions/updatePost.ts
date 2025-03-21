'use server'
import { postSchema } from "@/validations/post"
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

type ActionState = {
    success: boolean,
    errors: Record<string, string[]>
}

export async function updatePost(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState>{

    // フォームの情報を取得
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const postId = formData.get('postId') as string
    const published = formData.get('published') === 'true'

    // バリデーション
    const validationResult = postSchema.safeParse({ title, content})
    if(!validationResult.success){
        return { success: false, errors: validationResult.error.flatten().fieldErrors}
    }
    // DB更新保存

    await prisma.post.update({
        where: { id: postId },
        data: {
            title,
            content,
            published,
        }
    })

    redirect('/dashboard')
}