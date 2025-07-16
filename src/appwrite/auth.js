import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
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
      await this.account.get();
      console.log("User already logged in. Skipping new session.");
      return true;
    } catch (error) {
      if (error.code === 401) {
        return await this.account.createEmailPasswordSession(email, password);
      } else {
        console.log(error);
        throw error;
      }
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async logOut() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log(error);
    }
  }
  async logOutCurrent() {
    try {
      await this.account.deleteSession("session");
    } catch (error) {
      console.log(error);
    }
  }
}

const authService = new AuthService();
export default authService;
