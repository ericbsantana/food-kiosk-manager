import axios from "axios";
import useSWR from "swr";
import Table from "../components/Table";
import { Link } from "react-router-dom";
import { Fragment } from "react";

const fetcher = (endpoint: string) =>
  axios.get(`http://localhost:3001${endpoint}`).then((res) => res.data);

const App = () => {
  const { data = [], isLoading, error, mutate } = useSWR("/kiosks", fetcher);

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
          <Link type="button" to="/create" className="button">
            Create new kiosk
          </Link>
        </div>
      </div>
      <div>
        <Table data={data} mutate={mutate} />
      </div>
    </Fragment>
  );
};

export default App;
