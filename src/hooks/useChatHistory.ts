import { useState } from "react";
import type {ChatMessage} from  '../types/chat'

export const useChatHistory = () =>{
    const [chats,setChats] = useState<ChatMessage[]>([]);
    const [activeChat,setActiveChat] = useState<string|null>(null);

    const addChat = (prompt:string,response:string,model:string) =>{
        const newChat:ChatMessage = {
            id:Date.now().toString(),
            prompt,
            response,
            timestamp:new Date(),
            model
        };

        setChats(prev => [newChat,...prev]);
        setActiveChat(newChat.id);
    };

    const selectChat = (chatId:string) =>{
        setActiveChat(chatId);
        return chats.find(chat => chat.id === chatId);
    };

    return {chats,activeChat,addChat,selectChat};
}