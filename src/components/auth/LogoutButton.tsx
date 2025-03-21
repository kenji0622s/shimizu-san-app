import { signOut } from "@/auth";

export default function LogoutButton() {
  const handleLogout = async () => {
    "use server";
    await signOut({redirectTo: "/"});
  };
  return (
    <button
    type="button"
    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    onClick={handleLogout}
  >
    Log out
  </button>
  );
}
