import api from "@/services/api";

export const fetchCoins = async () => {
  try {
    const response = await api.get("");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
