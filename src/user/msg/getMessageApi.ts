import { ErrorCallback,  Message, MessageInfos} from "../../model/common";
import {CustomError} from "../../model/CustomError";

export function getMessage(messageInfos : MessageInfos, onResult: (message: Message[]) => void, onError: ErrorCallback) {  
    fetch("/api/getListMessages",
    {
        method: "POST", // ou 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(messageInfos),
    })
        .then(async (response) => {
            if (response.ok) {
                const messageList: Message[] = await response.json();
                onResult(messageList);
                console.log(messageList);
            } else {
              const error = await response.json() as CustomError;
              onError(error);
            }
        }, onError);
}
