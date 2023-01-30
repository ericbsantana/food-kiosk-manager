import axios from "axios";

const editKiosk = async (_id: string, dataToPost: any) => {
  try {
    await axios
      .patch(`http://localhost:3001/kiosks/${_id}`, dataToPost)
      .then((response) => response.data);
  } catch (err) {
    throw err;
  }
};

export default editKiosk;
