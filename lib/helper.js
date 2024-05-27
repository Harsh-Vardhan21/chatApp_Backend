import { userSocketIDs } from "../app.js";

export const getOtherMember = (members, userId) => {
  return members.find((member) => member._id.toString() !== userId.toString());
};

export const getSockets = (users = []) => {
  const sockets = users.map((user) => userSocketIDs.get(user.toString()));
  return sockets.filter(socket => socket !== undefined);
};

export const getBase64 = (file) => {
  if (!file || !file.mimetype || !file.buffer) {
    throw new Error("Invalid file object");
  }
  return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
};
