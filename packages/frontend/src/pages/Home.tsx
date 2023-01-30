import useSWR from "swr";
import Table from "../components/Table";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { fetcher } from "../helpers/fetcher";
import { Spinner } from "../components/Spinner";
import { Heading } from "../components/Heading";
import { Button } from "../components/Button";

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
        <Heading bold>Oops!</Heading>
        <Heading>Could not get data.</Heading>
        <div>
          <Button onClick={() => mutate()}>Refresh data</Button>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="text-center space-y-5">
        <div>
          <Heading>Welcome to our</Heading>
          <Heading bold>Kiosk Management</Heading>
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
