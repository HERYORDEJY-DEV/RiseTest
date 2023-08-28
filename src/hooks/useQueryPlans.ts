import { useQuery } from "react-query";
import plansApiRequests from "~services/plansRequests";

export const fetchPlansQuery = async () => {
  const { data } = await plansApiRequests.getPlans();
  return data;
};

export const useQueryPlans = () => useQuery("plans", fetchPlansQuery);
