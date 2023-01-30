import useSWR from "swr";
import Table from "../components/Table";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { fetcher } from "../helpers/fetcher";
import { Spinner } from "../components/Spinner";

const Home = () => {
  const { data = [], isLoading, error, mutate } = useSWR("/kiosks", fetcher);

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex justify-center flex-col content-center text-center space-y-5">
        <h1 className="text-5xl font-bold">Oops!</h1>
        <h1 className="text-3xl">Could not get data.</h1>
        <div>
          <button className="button" onClick={() => mutate()}>
            Refresh data
          </button>
        </div>
      </div>
    );
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

export default Home;
