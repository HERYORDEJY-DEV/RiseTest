import HttpBaseRequest from "./index";
import { AxiosResponse } from "axios";

class GeneralRequests extends HttpBaseRequest {
  constructor() {
    super();
    this.bindMethods();
  }

  bindMethods() {
    this.getTodaysQuote = this.getTodaysQuote.bind(this);
    this.getBankRates = this.getBankRates.bind(this);
  }

  async getTodaysQuote<T>(): Promise<AxiosResponse> {
    return await this.api.get("/quotes");
  }

  async getBankRates<T>(): Promise<AxiosResponse> {
    return await this.api.get("/rates");
  }
}

const generalApiRequests = new GeneralRequests();

export default generalApiRequests;
