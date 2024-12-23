import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { Chat } from "./models/chat.js";

const app = express();
const port = 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

main()
  .then(() => console.log("Connection successfull"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
  {
    from: "Jitu",
    to: "Shreya",
    msg: "Good news aa gyi",
    created_at: new Date(),
  },
  {
    from: "Rohit",
    to: "Gambhir",
    msg: "Is bar me open krunga",
    created_at: new Date(),
  },
  {
    from: "KL Rahul",
    to: "Gautam",
    msg: "Century ban gyi",
    created_at: new Date(),
  },
  {
    from: "Vijay",
    to: "Lara",
    msg: "Pushpa 2 is hit.",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats);
