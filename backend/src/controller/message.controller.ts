import express, { Request, Response } from 'express';
import Message from '../models/message.models';
import ChatUser from '../models/User.models';
import { RequestExtend } from '../middleware/auth.middleware';
import { v2 as cloudinary } from 'cloudinary';
export const sendMessage = async (req: Request, res: Response) => {
  res.send('received message');
};
export const getAllContacts = async (req: RequestExtend, res: Response) => {
  try {
    if (!req.user) {
      res.status(400).json({ message: 'user not found' });
      return;
    }
    const loggedInUserId = req?.user._id;
    const filteredUsers = await ChatUser.find({
      _id: { $ne: loggedInUserId },
    }).select('-password');
    res.status(200).json({ user: filteredUsers });
  } catch (e) {
    console.log('something went wrong trying to get all contact', e);
    res
      .status(500)
      .json({ message: 'something went wrong trying to get the users' });
  }
};

export const getAllChats = async (req: RequestExtend, res: Response) => {
  try {
    if (!req.user) {
      res.status(400).json({ message: 'invalid user' });
    }
    const loggedInUserId = req.user._id;
    //find all the messages where the logged-in user is either sender or receiver
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });
    const chatPartnersIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString(),
        ),
      ),
    ];
    const chatPartners = await ChatUser.find({
      _id: { $in: chatPartnersIds },
    }).select('-password');
    res.status(200).json(chatPartners);
  } catch (e: any) {
    console.error('Error in getChatPartners: ', e.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMesssageBetweenUser = async (
  req: RequestExtend,
  res: Response,
) => {
  try {
    if (!req.user) {
      res.status(400).json({ message: 'user not verified' });
      return;
    }
    const myId = req.user._id;
    const { id: userToChatId } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (e) {
    console.log('something went wrong trying to get all messages', e);
    res
      .status(500)
      .json({ message: 'something went wrong trying to get all messages' });
  }
};

export const sendMessageBetweenUser = async (
  req: RequestExtend,
  res: Response,
) => {
  try {
    if (!req.user) {
      res.status(400).json({ message: 'invalid' });
      return;
    }
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    // todo: send message in real-time if user is online-socket.io
    res.status(201).json(newMessage);
  } catch (e) {
    console.log('something went wrong in this message', e);
    res.status(500).json({ errorMessage: 'something went wrong', e });
  }
};
