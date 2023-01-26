import cron from "node-cron";

jest.useFakeTimers();

describe("Cron job testing", () => {
  it("cron job should be called every 60 seconds", async () => {
    const callback = jest.fn();
    cron.schedule("* * * * *", callback);
    expect(callback).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(60000);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
