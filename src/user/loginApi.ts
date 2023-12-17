import { Session, SessionCallback, ErrorCallback, User } from "../model/common";
import { CustomError } from "../model/CustomError";

export function loginUser(user: User, onResult: SessionCallback, onError: ErrorCallback) {
  fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then(async (response) => {
      if (response.ok) {
        const session = await response.json() as Session;
        console.log(session);
        if (session.id !== undefined) {
          sessionStorage.setItem('token', session.token);
          sessionStorage.setItem('idUser', session.id.toString());
          sessionStorage.setItem('externalId', session.externalId);
          sessionStorage.setItem('username', session.username || "");

          console.log("heeeee1");
          console.log(sessionStorage.getItem('idUser'));
          console.log("heeeee1");

          onResult(session);
        } else {
          onError(new CustomError("Session ID is undefined"));
        }
      } else {
        const error = await response.json() as CustomError;
        onError(error);
      }
    }, onError);
}
