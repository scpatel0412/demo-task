import axios from "axios";

const API_URL = "https://api.spacexdata.com/v4";

export const getLaunches = async () => {
  const response = await axios.get(`${API_URL}/launches`);
  return response.data;
};

export const getLaunchDetails = async (id: string) => {
  const response = await axios.get(`${API_URL}/launches/${id}`);
  return response.data;
};

export const getRocketDetails = async (rocketId: string) => {
  const response = await axios.get(`${API_URL}/rockets/${rocketId}`);
  return response.data;
};

