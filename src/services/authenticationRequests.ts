import HttpBaseRequest from "./index";
import { AxiosResponse } from "axios";

class AuthenticationRequests extends HttpBaseRequest {
  constructor() {
    super();
    this.bindMethods();
  }

  bindMethods() {
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.getSession = this.getSession.bind(this);
  }

  async signUp<T>(data: T): Promise<AxiosResponse> {
    // console.log("\n\n data :>> \t\t", data, "\n\n---");
    return await this.api.post("/users", {
      ...data,
    });
  }

  async signIn<T>(data: T): Promise<AxiosResponse> {
    return await this.api.post("/sessions", data);
  }

  async getSession<T>(): Promise<AxiosResponse> {
    return await this.api.get("/sessions");
  }
}

const authenticationApiRequests = new AuthenticationRequests();

export default authenticationApiRequests;
