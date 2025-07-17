// components/BlogsShow.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { PostCard } from "../components";

export default function BlogsShow() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService
            .getPosts()
            .then((res) => {
                setPosts(res?.documents || []);
            })
            .catch((err) => {
                console.error("Error fetching posts:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="w-full py-12">
            <div className="max-w-7xl flex flex-col text-start mx-auto">
                <h1 className="text-2xl mb-2 text-start font-bold text-gray-900">
                    Trending Blogs
                </h1>

                {loading ? (
                    <div className="text-center text-gray-500 text-lg">Loading posts...</div>
                ) : posts.length === 0 ? (
                    <div className="text-center text-gray-500 text-lg">Login to read posts.</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {posts.map((post) => (
                                <PostCard key={post.$id} {...post} />
                            ))}
                        </div>
                        <div className="flex justify-center mt-10">
                            <Link
                                to="/all-posts"
                                className="inline-block px-6 py-3 bg-indigo-600 text-white text-sm font-medium rounded-full shadow-md hover:bg-indigo-700 transition-colors duration-300"
                            >
                                Show More
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
