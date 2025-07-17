import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userid === userData.$id : true;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredimage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 w-full">
      <Container>
        <div className="flex justify-start items-start">
          <div className="w-5xl flex mb-4 relative  border rounded-xl p-2">
            <img
              src={appwriteService.getFilePreview(post.featuredimage)}
              alt={post.title}
              className="rounded-xl object-cover w-full"
            />
            <div className="">
              {isAuthor ? (
                <div className="absolute right-6 top-6">
                  <Link to={`/edit-post/${post.$id}`}>
                    <button className="px-6 py-2 bg-green-500 text-white rounded-full font-semibold shadow-md hover:bg-white hover:text-green-600ition-all duration-200 focus:ring-2 focus:ring-green-400 mr-3">
                      Edit
                    </button>
                  </Link>
                  <button onClick={deletePost} className="px-6 py-2 bg-red-500 text-white rounded-full font-semibold shadow-md hover:bg-white hover:text-red-600ition-all duration-200 focus:ring-2focus:ring-red-400">
                    Delete
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <div className="w-full mb-6 flex flex-col justify-start items-start ml-5 text-start gap-2">
            <h1 className="text-5xl font-bold">{post.title}</h1>
            <h1 className="text-xl font-bold">It's created by {post.createdBy || "Unknown"}</h1>
            <h1 className="text-xl font-bold">It's {post.status || "NA..."}</h1>
            {/* {console.log(post.status)} */}
            <div className="browser-css">{parse(post.content)}</div>
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
