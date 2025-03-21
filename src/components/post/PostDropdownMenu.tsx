"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

import Link from "next/link";
import DeletePostDialog from "@/components/post/DeletePostDialog";
import { useState } from "react";

export default function PostDropdownMenu({ postId }: { postId: string }) {
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteDialogChange = (open: boolean) => {
    setShowDeleteDialog(open);
    // if(!open){
    //   setIsDropdownOpen(false)
    // }
  };
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50">
            <EllipsisHorizontalIcon className="size-5 text-gray-400" />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute left z-10 mt-2 w-32 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <div className="py-1">
            <MenuItem>
              <Link
                href={`/myposts/${postId}`}
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              >
                詳細
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href={`/myposts/${postId}/edit`}
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              >
                編集
              </Link>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => setShowDeleteDialog(true)}
                className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              >
                削除
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
      {showDeleteDialog && (
        <DeletePostDialog
          postId={postId}
          isOpen={showDeleteDialog}
          onOpenChange={handleDeleteDialogChange}
        />
      )}
    </>
  );
}
