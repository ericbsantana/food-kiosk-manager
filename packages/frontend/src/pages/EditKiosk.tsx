import axios, { AxiosError } from "axios";
import dayjs from "dayjs";
import { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const EditKiosk = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm();

  const navigate = useNavigate();

  const { id: _id } = useParams();

  const onSubmit = async (data: any) => {
    const { storeClosesAt, storeOpensAt } = data;
    const splittedStoreOpensAt = storeOpensAt.split(":");
    const splittedStoreClosesAt = storeClosesAt.split(":");

    const formattedStoreOpensAt = dayjs()
      .set("hour", splittedStoreOpensAt[0])
      .set("minute", splittedStoreOpensAt[1])
      .toDate();

    const formattedStoreClosesAt = dayjs()
      .set("hour", splittedStoreClosesAt[0])
      .set("minute", splittedStoreClosesAt[1])
      .toDate();

    const dataToBeSent = {
      ...data,
      isKioskClosed: true,
      storeClosesAt: formattedStoreClosesAt,
      storeOpensAt: formattedStoreOpensAt,
    };

    try {
      await axios
        .patch(`http://localhost:3001/kiosks/${_id}`, dataToBeSent)
        .then((response) => response.data);
      navigate("/");
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

  const loadFormData = async () => {
    try {
      const response = await axios
        .get(`http://localhost:3001/kiosks/${_id}`)
        .then((response) => response.data);

      Object.keys(response).forEach((key) => {
        if (["storeOpensAt", "storeClosesAt"].includes(key)) {
          setValue(key, dayjs(response[key]).format("HH:mm"));
          return;
        }

        setValue(key, response[key]);
      });
    } catch (error: any) {
      const res: AxiosError<any> = error;
    }
  };

  useEffect(() => {
    loadFormData();
  }, [loadFormData]);

  return (
    <Fragment>
      <div>
        <h1 className="text-center text-4xl">Edit an existing Kiosk</h1>
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

export default EditKiosk;
