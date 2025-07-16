import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  ID;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredimage, status, userId }) {
    try {
      if (!slug) {
        throw new Error("Missing slug for createPost");
      }
      return await this.databases.createDocument(
        conf.appwriteDBId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredimage: featuredimage,
          status,
          userid: userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
      return null;
    }
  }

  async updatePost(slug, { title, content, featuredimage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDBId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredimage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
      return null;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDBId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDBId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDBId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }

  // file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    if (!fileId) {
      console.warn("getFilePreview called with empty fileId");
      return null;
    }
    // console.log(conf.appwriteBucketId, fileId, "featuredImage-fileid")
    return this.bucket.getFilePreview(conf.appwriteBucketId ,fileId) + '&mode=admin';
  }
}

const service = new Service();
export default service;
