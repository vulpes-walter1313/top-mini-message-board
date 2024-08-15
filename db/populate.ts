import { Client } from "pg";
import "dotenv/config";

const sql = `CREATE TABLE IF NOT EXISTS messages (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text VARCHAR(512),
  username VARCHAR(30),
  createdat TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages(text, username)
VALUES
('This app is so cool!', 'Wilson Smith'),
('This app is really cool!', 'Vilmer Monroe'),
('Alright, nice app.', 'Quintin Coldwater');
`;

async function main() {
  const connectionString = process.argv[2];
  const client = new Client({ connectionString });
  try {
    console.log("connecting to db");
    await client.connect();
    console.log("connected to db");
    console.log("Populating db...");
    await client.query(sql);
    console.log("Finished, exiting now");

    process.exit(0);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
    process.exit(1);
  }
}
main();
