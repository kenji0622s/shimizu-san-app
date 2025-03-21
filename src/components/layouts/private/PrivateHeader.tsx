import Image from "next/image";
import PrivateMobileOpenMenu from "./PrivateMobileOpenMenu";
import Link from "next/link";

export default function PrivateHeader() {
  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/dashboard" className="-m-1.5 p-1.5 flex items-center gap-x-2">
            <Image
              alt=""
              src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              width={40}
              height={40}
              className="h-8 w-auto"
            />
            <span className="text-sm/6 font-semibold text-gray-900">
              NEXT TEMPLATE
            </span>
          </Link>
        </div>
        <PrivateMobileOpenMenu />
        <div className="hidden lg:flex lg:gap-x-12">
          <Link href="#" className="text-sm/6 font-semibold text-gray-900">
            Features
          </Link>
          <Link href="#" className="text-sm/6 font-semibold text-gray-900">
            Marketplace
          </Link>
          <Link href="#" className="text-sm/6 font-semibold text-gray-900">
            Company
          </Link>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/mypage"
            className="text-sm/6 font-semibold text-gray-900"
          >
            My Page <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
