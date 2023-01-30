import useSWR from "swr";
import Table from "../components/Table";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { fetcher } from "../helpers/fetcher";

const Spinner = () => {
  return (
    <svg
      className="animate-spin -ml-1 mr-3 h-10 w-10 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

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
