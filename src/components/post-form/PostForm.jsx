import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
      fileId: post?.featuredimage || "",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  /**
   * Slug transform utility
   */
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  /**
   * Watch title field and automatically generate slug
   */
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  /**
   * Submit handler
   */
  const submit = async (data) => {
    try {
      if (post) {
        // Update existing post
        const file = data.image && data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) {
          await appwriteService.deleteFile(post.featuredimage);
        }

        const updatedPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredimage: file ? file.$id : post.featuredimage,
        });

        if (updatedPost && updatedPost.$id) {
          navigate(`/post/${updatedPost.$id}`);
        } else {
          console.error("Error updating post:", updatedPost);
          alert("Failed to update post. Check console for details.");
        }

      } else {
        // Create new post
        if (!data.image || !data.image[0]) {
          alert("Please upload a featured image!");
          return;
        }

        const file = await appwriteService.uploadFile(data.image[0]);
        if (!file) {
          console.error("Failed to upload image");
          alert("Image upload failed. Please try again.");
          return;
        }

        data.featuredimage = file.$id;
        data.fileId = file.$id;

        // Ensure slug is valid
        const safeSlug = slugTransform(data.slug);
        if (!safeSlug) {
          alert("Invalid or empty slug. Please enter a valid title.");
          return;
        }
        data.slug = safeSlug;

        const newPost = await appwriteService.createPost({
          userId: userData?.$id,
          ...data,
        });

        if (newPost && newPost.$id) {
          navigate(`/post/${newPost.$id}`);
        } else {
          console.error("Error creating post:", newPost);
          alert("Failed to create post. Check console for details.");
        }
      }
    } catch (error) {
      console.error("Post submission error:", error);
      alert("An error occurred. Please check the console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post?.featuredimage ? (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredimage)|| "no post synced"}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        ) : (
          <div className="w-full mb-4 text-gray-400 text-sm">
            No featured image.
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
