import { log } from "console";
import express from "express";
import methodOverride from "method-override";
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

// Middlewares
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Routes
app.get("/", (req, res) => {
  res.send("Route working:: Homepage");
});

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  //   console.log(chats);
  res.render("chats.ejs", { chats });
});

app.get("/chats/new", async (req, res) => {
  res.render("newChat.ejs");
});

app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = {
    from,
    msg,
    to,
    created_at: new Date(),
  };

  if (newChat) {
    const chat = new Chat(newChat);
    chat.save().then(() => console.log("Msg sent successfully"));
  }

  res.redirect("/chats");
});

// app.get("/chats/:id/edit", (req, res) => {
//   const { id } = req.params;
//   console.log("Editing msg: ", id);

//   res.render("edit.ejs", { chat });
// });

app.get("/chats/:id/edit", async (req, res) => {
  const { id } = req.params;
  try {
    const chat = await Chat.findById(id);
    if (!chat) {
      return res.status(404).send("Chat not found");
    }
    res.render("edit.ejs", { chat });
  } catch (error) {
    console.log("Error fetching chat for editing:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;

  console.log(newMsg);

  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true, new: true }
  );

  console.log(updatedChat);
  res.redirect("/chats");
});

app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);

  console.log(deletedChat);
  res.redirect("/chats");
});

// let chat1 = new Chat({
//   from: "sachin",
//   to: "virat",
//   msg: "Play fast...",
//   created_at: new Date(),
// });

// chat1.save().then(() => console.log("Chat1 was saved")); //

// Server
app.listen(port, (req, res) => {
  console.log("Server is running at port: ", port);
});
