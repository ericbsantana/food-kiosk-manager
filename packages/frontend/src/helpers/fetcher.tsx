import axios from "axios";

export const fetcher = (endpoint: string) =>
  axios.get(`http://localhost:3001${endpoint}`).then((res) => res.data);
