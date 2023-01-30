import dayjs from "dayjs";

const formatKioskData = (data: any) => {
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

  return {
    ...data,
    isKioskClosed: true,
    storeClosesAt: formattedStoreClosesAt,
    storeOpensAt: formattedStoreOpensAt,
  };
};

export default formatKioskData;
