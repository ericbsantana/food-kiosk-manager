import { Fragment } from "react";
import { useForm } from "react-hook-form";

const CreateKiosk = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Fragment>
      <div>
        <h1 className="text-center text-4xl">Create a new Kiosk</h1>
      </div>
      <div className="flex justify-center">
        <form className="w-1/3" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5 justify-center">
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Serial Key
              </label>
              <input
                type="text"
                className="text-input"
                {...register("serialKey")}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Description
              </label>
              <input
                type="text"
                className="text-input"
                {...register("description")}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Store opens at
              </label>
              <input
                type="time"
                className="text-input"
                {...register("storeOpensAt")}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-white">
                Store closes at
              </label>
              <input
                type="time"
                className="text-input"
                {...register("storeClosesAt")}
              />
            </div>
            <button type="submit" className="button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default CreateKiosk;
