import mongoose, { Schema } from 'mongoose';

// Define area schema

export const chatSchema = new Schema({
  title: {
    type: String,
    default: ''
  },
  sender: {
    type: String,
    default: ''
  },
  senderAvatar: {
    type: String,
    default: ''
  },
  receiverId: {
    type: String
  },
  message: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Export Mongoose model
export default mongoose.model('chat', chatSchema);