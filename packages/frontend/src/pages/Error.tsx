import { useRouteError, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const error: any = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="h-full flex justify-center flex-col content-center text-center space-y-5">
      <h1 className="text-5xl font-bold">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{error.statusText}</p>
      <div>
        <button
          type="button"
          className="button"
          onClick={() => {
            navigate("/");
          }}
        >
          Back to home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
