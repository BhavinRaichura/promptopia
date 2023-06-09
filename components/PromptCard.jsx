'use client'

import Image from "next/image"
import { useState } from "react"

import tickIcon from '/assets/icons/tick.svg'
import copyIcon from '/assets/icons/copy.svg'
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"



const PromptCard = ({post,handleTagClick,handleEdit, handleDelete}) => {

  const {data:session}  = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] =useState("");

  const handleCopy =()=>{
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(()=>setCopied(""),3000);

  }


  return (
    <div className="prompt_card">
      <div className="flex justify-between item-start gap-5">
          <Link href={`/profile/${post.creator._id}?name=${post.creator.username}`}>
        <div className="flex-1 flex justify-start item-center gap-3 cursor-pointer">
          <Image
            src = {post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-grey-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-grey-500">
              {post.creator.email}
            </p>

          </div>

        </div>
          </Link>
        <div className="copy_btn" onClick={handleCopy}>
          <Image 
            src={copied === post.prompt ? tickIcon : copyIcon}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-grey-700">
        {post.prompt}
      </p>
      <p className="fomnt-inter text-sm blue_gradient cursor-pointer"
        onClick={()=>handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id ===post.creator._id && pathName === '/profile'
        && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p className="fonst-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p className="fonst-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )
      }
    </div>
  )
}

export default PromptCard