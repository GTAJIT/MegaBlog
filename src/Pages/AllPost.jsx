import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        });
    }, []);
    // console.log(posts, "posts")
    return (
        <div className='w-full'>
            <Container>
                <h1 className='text-2xl mb-2 ml-5 text-start font-bold text-gray-900'>All Posts</h1>
                <div className='flex flex-wrap justify-start items-start'>
                    {posts.map((post) => (
                        <div key={post.$id} className='px-5 w-1/4'>
                            <PostCard {...post} />
                            {/* {console.log(post, "post")} */}
                            {/* {console.log(post.featuredimage, "featuredImage")} */}
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts