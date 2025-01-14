import {CustomError} from "./CustomError";

export const AUTHENT_HEADER = "Authentication";
export const BEARER = "Bearer ";

export interface User {
    user_id: number;
    username: string;
    email?: string;
    password: string;
    last_login?: string;
    external_id?: string;
}

export interface Session {
    token: string;
    username?: string;
    id?: number;
    externalId: string;
}


export interface EmptyCallback {
    (): void;
}

export interface SessionCallback {
    (session: Session): void;
}


export interface ErrorCallback {
    (error: CustomError): void;
}
export interface Account {
    username: string;
    email: string;
    password: string;
  }

  export interface Message {
    senderId: number;
    receiverId: number;
    messageContent: string;
    timestamp?: EpochTimeStamp;
    senderName: string;
}
export interface MessageInfos {
    senderId: number;
    receiverId: number;
    }