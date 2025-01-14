import {getConnecterUser, triggerNotConnected} from "../lib/session";
import {kv} from "@vercel/kv";

export default async (request, response) => {
    try {
        const headers = new Headers(request.headers);
        const user = await getConnecterUser(request);
        if (user === undefined || user === null) {
            console.log("Not connected");
            triggerNotConnected(response);
        }
        const message = await request.body;
        const userId = user.userId;
        const recipientId = message.recipientId;
        const messagesKey = `messages:${userId}:${recipientId}`;
        await kv.lpush(messagesKey, JSON.stringify(message));
        response.send("OK");
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
};
