import { PrismaClient, Role } from "@prisma/client";
import * as bcypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // クリーンアップ
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcypt.hash("password", 12);

  // ユーザーを作成
  const usersData = [];

  for (let i = 0; i < 11; i++) {
    // 例として10人のユーザーを作成
    let role;

    if (i === 0) {
      role = Role.ADMIN; // iが0の時はADMIN
    } else if (i % 2 === 0) {
      role = Role.GUEST; // iが偶数の時はGUEST
    } else {
      role = Role.USER; // iが奇数の時はUSER
    }

    usersData.push({
      email: `test${i}@test.com`,
      name: `test${i}`,
      role: role,
      password: hashedPassword,
      posts: {
        create: [
          {
            title: `Test${i}の1つ目の記事`,
            content: `これは1つ目の記事です。`,
            published: true,
          },
          {
            title: `Test${i}の2つ目の記事`,
            content: `これは2つ目の記事です。`,
            published: true,
          },
        ],
      },
    });
  }

  // ユーザーをデータベースに作成
  for (const userData of usersData) {
    await prisma.user.create({
      data: userData,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
