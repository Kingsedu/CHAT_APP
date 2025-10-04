import express from 'express';
import {
  sendMessage,
  getAllChats,
  getAllContacts,
  getMesssageBetweenUser,
  sendMessageBetweenUser,
} from '../controller/message.controller';
import { protectRoute } from '../middleware/auth.middleware';
import { arjectProtection } from '../middleware/arcject.middleware';

const messageRoutes = express.Router();
//will implement the arjectProtection in production
// messageRoutes.use(arjectProtection, protectRoute);
messageRoutes.use(protectRoute);

messageRoutes.route('/').get(sendMessage);
messageRoutes.route('/contacts').get(getAllContacts);
messageRoutes.route('/chats').get(getAllChats);
messageRoutes.route('/:id').get(getMesssageBetweenUser);
messageRoutes.route('/send/:id').post(sendMessageBetweenUser);
export default messageRoutes;
