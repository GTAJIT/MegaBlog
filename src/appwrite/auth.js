import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  users;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
    // this.users = new this.users(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call login
        return this.logIn({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async logIn({ email, password }) {
    try {
      // First try to get current user to check if already logged in
      try {
        const currentUser = await this.account.get();
        console.log("User already logged in:", currentUser.email);
        return currentUser;
      } catch (error) {
        // User not logged in, proceed with login
        if (error.code === 401) {
          return await this.account.createEmailPasswordSession(email, password);
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.log("Login error:", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("getCurrentUser error:", error);
      return null;
    }
  }

  async logOut() {
    try {
      await this.account.deleteSessions();
      console.log("User logged out successfully");
    } catch (error) {
      console.log("Logout error:", error);
    }
  }
  async logOutCurrent() {
    try {
      await this.account.deleteSession("session");
    } catch (error) {
      console.log(error);
    }
  }
  async getUserById(userId) {
    try {
      const user = await this.account.get(userId);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

const authService = new AuthService();
export default authService;
