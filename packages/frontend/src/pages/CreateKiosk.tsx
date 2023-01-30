import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import createKiosk from "../helpers/create-kiosk";
import formatKioskData from "../helpers/format-kiosk-data";
import { Heading } from "../components/Heading";

const CreateKiosk = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: any) => {
    const dataToPost = formatKioskData(data);

    try {
      const response = await createKiosk(dataToPost);
      navigate("/");
      enqueueSnackbar(response.message, {
        variant: "success",
        preventDuplicate: true,
      });
    } catch (error: any) {
      const res: AxiosError<any> = error;
      if (res.response) {
        const responseErrors = res.response.data.errors;
        Object.keys(responseErrors).forEach((key) => {
          setError(key, {
            type: "custom",
            message: responseErrors[key].msg,
          });
        });
      }
    }
  };

  return (
    <Fragment>
      <div>
        <Heading>Create a new Kiosk</Heading>
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
              {errors.serialKey && (
                <span className="text-red-400">
                  {errors.serialKey.message?.toString()}
                </span>
              )}
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
              {errors.description && (
                <span className="text-red-400">
                  {errors.description.message?.toString()}
                </span>
              )}
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
              {errors.storeOpensAt && (
                <span className="text-red-400">
                  {errors.storeOpensAt.message?.toString()}
                </span>
              )}
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
              {errors.storeClosesAt && (
                <span className="text-red-400">
                  {errors.storeClosesAt.message?.toString()}
                </span>
              )}
            </div>
            <div className="space-x-5">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="button"
              >
                Cancel
              </button>
              <button type="submit" className="button">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default CreateKiosk;
