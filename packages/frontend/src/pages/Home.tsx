import axios from "axios";
import useSWR from "swr";
import Table from "../components/Table";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { Fragment } from "react";

const fetcher = (endpoint: string) =>
  axios.get(`http://localhost:3001${endpoint}`).then((res) => res.data);

const App = () => {
  const { data = [], isLoading, error } = useSWR("/kiosks", fetcher);

  if (isLoading) {
    return null;
  }

  return (
    <Fragment>
      <div className="text-center space-y-5">
        <div>
          <h1 className="text-4xl">Welcome to our</h1>
          <h1 className="text-4xl font-bold">Kiosk Management</h1>
        </div>
        <div>
          <Link
            type="button"
            to="/create"
            className="text-white bg-neutral-600 hover:bg-neutral-700 focus:ring-2 focus:outline-none focus:ring-neutral-500 font-medium rounded-md text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
          >
            Create new kiosk
          </Link>
        </div>
      </div>
      <div>
        <Table data={data} />
      </div>
    </Fragment>
  );
};

export default App;
