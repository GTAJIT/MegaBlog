import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../../appwrite/config";
import Input from "../Input";
import Select from "../Select";
import RTE from "../RTE";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, formState: { errors, defaultValues, isSubmitting } } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
      fileId: post?.featuredimage || "",
      name: post?.name || "Unknown",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // console.log(userData.name)

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
        data.userid = userData?.$id;
        data.name = userData?.name;

        // Ensure slug is valid
        const safeSlug = slugTransform(data.slug);
        if (!safeSlug) {
          alert("Invalid or empty slug. Please enter a valid title.");
          return;
        }
        data.slug = safeSlug;

        const newPost = await appwriteService.createPost({
          userId: userData?.$id,
          name: userData?.name,
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
    <div className="flex items-center justify-center  bg-gradient-to-br py-8">
      <form
        onSubmit={handleSubmit(submit)}
        className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-3xl flex flex-col md:flex-row gap-8"
      >
        {/* Left: Main Content */}
        <div className="flex-1 flex flex-col gap-4">
          <Input
            label="Title"
            placeholder="Enter blog title"
            className="mb-2"
            {...register("title", { required: true })}
          />
          <RTE
            name="content"
            control={control}
            label="Content"
            defaultValue={defaultValues.content || ""}
          />
          {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
        </div>

        {/* Right: Meta & Image */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-2"
            {...register("status", { required: true })}
          />
          <Input
            label="Featured Image"
            type="file"
            className="mb-2"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post?.featuredimage && (
            <div className="w-full mb-2">
              <img
                src={appwriteService.getFilePreview(post.featuredimage)}
                alt={post.title}
                className="rounded-lg border border-gray-200 shadow"
              />
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold shadow-md hover:bg-indigo-700 transition-all duration-200 focus:ring-2 focus:ring-indigo-400"
          >
            {post ? "Update" : "Submit"}
          </button>
          <p className="text-sm text-gray-500">
            {isSubmitting ? "Submitting..." : "???"}
          </p>
        </div>
      </form>
    </div>
  );
}
