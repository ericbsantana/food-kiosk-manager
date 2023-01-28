import app from "./src/app";
import mongoose from "mongoose";
import config from "config";
import KioskService from "./src/services/kiosk.service";
import { ToadScheduler, SimpleIntervalJob, AsyncTask } from "toad-scheduler";

const port = process.env.PORT || 3001;

const databaseUrl: string = config.get("database.url");

mongoose.connect(databaseUrl);

const scheduler = new ToadScheduler();

scheduler.addSimpleIntervalJob(
  new SimpleIntervalJob(
    { seconds: 60 },
    new AsyncTask(
      "Close and open kiosks accordingly to its close and open time",
      () => {
        return KioskService.updateAllKiosksStatus().then((result) => {
          console.log(
            `Closed ${result.numberOfKiosksClosed} and opened ${result.numberOfKiosksOpened} kiosks.`
          );
        });
      },
      (err: Error) => {
        console.error("Failed to update kiosks.");
      }
    )
  )
);
app.listen(port, () => console.log(`Running on http://localhost:${port}`));
