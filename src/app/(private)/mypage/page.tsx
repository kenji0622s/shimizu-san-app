import LogoutButton from "@/components/auth/LogoutButton";
import { auth } from "@/auth";

export default async function MyPage() {
  const session = await auth();

  return (
    <div className="overflow-hidden rounded-lg bg-slate-50 shadow-[0_0_2px_0px_rgba(0,0,0,04)] w-fit mx-auto ">
      <div className="px-4 py-5 sm:p-6 flex justify-between items-center flex-col">
        <div className="mb-4">
          <table>
            <tbody>
              <tr>
                <td>ユーザーID</td>
                <td>{session?.user?.id}</td>
              </tr>
              <tr>
                <td>ユーザー名</td>
                <td>{session?.user?.name}</td>
              </tr>
              <tr>
                <td>メールアドレス</td>
                <td>{session?.user?.email}</td>
              </tr>
              <tr>
                <td>ユーザー権限</td>
                <td>{session?.user?.role}</td>
              </tr>
              <tr>
                <td>トークン期限</td>
                <td>{session?.expires}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}
