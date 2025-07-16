import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredimage }) {
  console.log(appwriteService.getFilePreview(featuredimage), "featuredImage")
  
  return (
    <Link to={`/post/${$id}`}>
      <div className="flex flex-col w-full max-w-xs bg-gray-100 rounded-xl p-4 shadow hover:shadow-lg transition">
        <div className="flex justify-center mb-4 overflow-hidden rounded-xl">
          <img
            src={appwriteService.getFilePreview(featuredimage)}
            alt={title}
            className="object-cover w-full h-48 rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard
