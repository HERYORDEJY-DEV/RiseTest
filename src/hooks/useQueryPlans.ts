import { useQuery } from "react-query";
import plansApiRequests from "~services/plansRequests";

const fetchPlans = async () => {
  const { data } = await plansApiRequests.getPlans();
  return data;
};

export const useQueryPlans = () => useQuery("plans", fetchPlans);
