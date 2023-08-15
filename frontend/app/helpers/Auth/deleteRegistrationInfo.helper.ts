import axios from "axios";

export const deleteRegistrationInfo = async (rId: string) => {
  const url = `${
    process.env.VITE_SERVICE_USER_MANAGEMENT_URL
  }/register?rId=${rId}`;
  const { data } = await axios.delete(url);
  return data;
};
