import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sgMail from "@sendgrid/mail";

const app = express();
const port = 8000;

dotenv.config();

const sendGridApi = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(sendGridApi);

let msg = {
  to: "ildidvorani@gmail.com",
  from: "ildidvorani@gmail.com",
  subject: "Sending with SendGrid",
  text: "and easy to do anywhere, even with Node.js",
  html: "<h1>Title</h1>\n<p>This is the content</p>",
};

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ info: "preset text" });
});

app.post("/", (req, res) => {
  const { parcel } = req.body;
  res.status(200).send({ status: "received" });
  msg.html = `<h1>New Title</h1>\n<p>${parcel}</p>`;

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((err) => {
      console.error(err);
    });
});

app.listen(port, () => console.log(`Server has started on port ${port}`));
