import HttpBaseRequest from "./index";
import { AxiosResponse } from "axios";

class PlansRequests extends HttpBaseRequest {
  constructor() {
    super();
    this.bindMethods();
  }

  bindMethods() {
    this.getPlans = this.getPlans.bind(this);
    this.createPlan = this.createPlan.bind(this);
    this.getPlan = this.getPlan.bind(this);
  }

  async createPlan<T>(data: T): Promise<AxiosResponse> {
    return await this.api.post("/plans", data);
  }

  async getPlans<T>(): Promise<AxiosResponse> {
    return await this.api.get("/plans");
  }

  async getPlan<T>(planId: string): Promise<AxiosResponse> {
    return await this.api.get(`/plan/${planId}`);
  }
}

const plansApiRequests = new PlansRequests();

export default plansApiRequests;
