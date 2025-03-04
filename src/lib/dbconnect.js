import { pool } from "./db";
import Swal from "sweetalert2";

export default async function dbConnect() {
  await pool.connect((err, client, release) => {
    if (err) {
      return console.error(
        "ST-001: Error in setting up db connection",
        err.stack
      );
    } else {
      console.log("ST-002: DB connection setup successfully");
    }

    client.query("SELECT NOW()", (err, result) => {
      // Release connection
      release();

      if (err) {
        return console.error(
          "ST-003: DB connection ok but Error in Query execution",
          err.stack
        );
      }
    });
    console.log("ST-004: DB connection setup and query execution success");
  });
}
