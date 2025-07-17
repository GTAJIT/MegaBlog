import React, { useState, useEffect } from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'
import authService from '../appwrite/auth'


function PostCard({ $id, title, featuredimage, content, userid, status }) {
  const [author, setAuthor] = useState(null);
  useEffect(() => {
    authService.getUserById(userid).then((user) => {
      setAuthor(user);
    });
  }, [userid]);
  return (
    <Link to={`/post/${$id}`}>
      <div className="relative max-w-md rounded-xl bg-[#181f2a] shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col border border-[#232b3b7b] group">
        <div className="relative">
          <img
            src={appwriteService.getFilePreview(featuredimage)}
            alt={title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <p className="text-sm h-full w-full text-start text-gray-200 line-clamp-2">
              {content?.replace(/<[^>]+>/g, '') || "No content"}
            </p>
          </div>
        </div>
        <div className="p-4 bottom-0 absolute flex flex-col text-start">
          <h2 className="text-lg font-bold text-white">{title || "NA.."}</h2>
          <p className='text-xs text-gray-300 font-medium mt-auto'>Created by <span className="text-xs text-blue-300 font-medium mt-auto">{author?.name || "Unknown"}</span> This post is <span className='text-xs text-blue-300 font-medium mt-auto'>{status || "NA.."}</span></p>
        </div>
      </div>
    </Link>
  )
}

export default PostCard