import axios from "axios";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useTable } from "react-table";
import useSWR from "swr";
import Table from "./components/Table";

const fetcher = (endpoint: string) =>
  axios.get(`http://localhost:3001${endpoint}`).then((res) => res.data);

const App = () => {
  const { data = [], isLoading, error } = useSWR("/kiosks", fetcher);

  if (isLoading) {
    return null;
  }

  return (
    <div className="h-screen w-full bg-neutral-900 text-white p-10">
      <div className="text-center space-y-1">
        <h1 className="text-4xl">Welcome to our</h1>
        <h1 className="text-4xl font-bold">Kiosk Management</h1>
      </div>
      <div>
        <Table data={data} />
      </div>
    </div>
  );
};

export default App;
