import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
  from: {
    type: String,
    required: true,
  },

  to: {
    type: String,
    required: true,
  },

  msg: {
    type: String,
    maxLength: 50,
  },

  created_at: {
    type: Date,
    required: true,
  },
});

export const Chat = mongoose.model("Chat", chatSchema);
