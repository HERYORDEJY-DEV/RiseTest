import { useQuery } from "react-query";
import generalApiRequests from "~services/generalRequests";
import plansApiRequests from "~services/plansRequests";

const fetchApi = async () => {
  const { data } = await generalApiRequests.getBankRates();
  return data;
};

export const useQueryBankRates = () => useQuery("rates", fetchApi);
