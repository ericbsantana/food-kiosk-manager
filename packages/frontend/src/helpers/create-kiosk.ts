import axios from "axios";

const createKiosk = async (dataToPost: any) => {
  try {
    return axios
      .post("http://localhost:3001/kiosks", dataToPost)
      .then((response) => response.data);
  } catch (err) {
    throw err;
  }
};

export default createKiosk;
