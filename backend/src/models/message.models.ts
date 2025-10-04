import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatUser',
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatUser',
      required: true,
    },
    text: {
      type: String,
      maxlength: 2000,
      trim: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
