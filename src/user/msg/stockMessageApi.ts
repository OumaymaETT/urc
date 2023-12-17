import { ErrorCallback,  Message} from "../../model/common";
import {CustomError} from "../../model/CustomError";

export function addMessage(message : Message, onResult: (success: boolean) => void, onError: ErrorCallback) { 
    fetch("/api/stockemessage",
    {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
    })
        .then(async (response) => { 
            if (response.ok) { 
                onResult(true);
                console.log("bien enregiistttee")
            } else {
              const error = await response.json() as CustomError;
              onError(error);
              onResult(false); 
            }
        }, onError);
}