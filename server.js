import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sgMail from "@sendgrid/mail";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const app = express();
const port = 8000;

dotenv.config();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.listen(port, () => console.log(`Server has started on port ${port}`));

const sendGridApi = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(sendGridApi);

const firebaseApi = process.env.FIREBASE_KEY;

// FIREBASE
const firebaseConfig = {
  apiKey: `${firebaseApi}`,
  authDomain: "cgl-contact-test.firebaseapp.com",
  projectId: "cgl-contact-test",
  storageBucket: "cgl-contact-test.appspot.com",
  messagingSenderId: "771397790027",
  appId: "1:771397790027:web:97e3200210cb7f8c17a0ce",
};

const fb = initializeApp(firebaseConfig);
let db = getFirestore(fb);
var ref = collection(db, "contact");

async function addDocument_AutoID(ref, email, fullName, phone, message) {
  const docRef = await addDoc(ref, {
    email: email,
    fullName: fullName,
    phone: phone,
    message: message,
  });
}

// SENDGRID
let msg = {
  to: "ildidvorani@gmail.com",
  from: "ildidvorani@gmail.com",
  subject: "Sending with SendGrid",
  text: "and easy to do anywhere, even with Node.js",
  html: "<p>Default email template</p>",
};

// app.get("/", (req, res) => {
//   res.status(200).json({ info: "preset text" });
// });

// Form submission post request middlware
app.post("/", (req, res) => {
  const { parcel } = req.body;
  console.log(parcel.email);
  res.status(200).send({ status: "received" });
  msg.html = `<h1>New Title</h1>
  <p>${parcel.fullName}</p>
  <p>${parcel.email}</p>
  <p>${parcel.phone}</p>
  `;

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((err) => {
      console.error(err);
    });

  addDocument_AutoID(
    ref,
    parcel.email,
    parcel.fullName,
    parcel.phone,
    parcel.message
  );
});
