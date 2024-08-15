# TOP - Mini Message Board

This is just a practice assignment from [The Odin Project](https://www.theodinproject.com/lessons/node-path-nodejs-mini-message-board)

## Model

### Messages

the Messages model is a pg table names `messages`. It has the following columns

- id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY
- text VARCHAR(512)
- username VARCHAR(30)
- createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP

### DB populate script

this script in the `./db` folder takes an argument connection string to target the database. The script is written in Typescript so use esbuild-register to run it like so:

```Bash
node -r esbuild-register populate.ts <connection-string>
```

**Connection String:** `postgresql://<dbuser>:<secretpassword>@<domain-or-localhost>:5432/message_app`

## routes

### `GET - /` Homepage

This route will display all the messages for now. It will fetch data from the messages table. It will display the `user`, `text`, and `createdAt` fields as well as a link to send a new message.

### `GET - /new` Create a new message form

This route will have a form to accept the `user`, and `text` while autocalculation the `createdAt` value. It will redirect to the `/` page which displays the messages.

### `POST - /new` Submit new message

This route will validate the submitted data and either reject it and rerender the `GET - /new` page with the error description, or successfully submit the nessage to the DB and redirect to `GET - /` page to see the messages.

**Request FormData body as json**

```json
{
  "user": "John Doe",
  "text": "this is a cool app!"
}
```
