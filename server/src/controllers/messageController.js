import asyncHandler from "express-async-handler";
import Conversation from "../models/conversationModel.js";
import Message from '../models/messageModel.js'

const sendMessage = asyncHandler(async (req, res) => {
    try{
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]},
        });

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        //this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);
    }catch(error){
        console.log("Error is sendMessage controller: ", error);
        res.status(500).json({error: "Internal server error"});
    }
});

const getMessages = asyncHandler(async (req, res) => {
    try{
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]},
        }).populate("messages");

        res.status(200).json(conversation.messages);
    }catch(error){
        console.log("Erro in getMessages controller: ", error.message);
        res.status(500).json({error: "Internal server error"});
    }
})

export {
    sendMessage,
    getMessages,
}