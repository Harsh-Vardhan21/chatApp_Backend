import { body, param, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors
      .array()
      .map((error) => error.msg)
      .join(", ");
    return next(new ErrorHandler(errorMessages, 400));
  }

  next();
};

const registerValidator = () => [
  body("name", "Name is required").notEmpty(),
  body("username", "Username is required").notEmpty(),
  body("bio", "Bio is required").notEmpty(),
  body("password", "Password is required").notEmpty(),
];

const loginValidator = () => [
  body("username", "Username is required").notEmpty(),
  body("password", "Password is required").notEmpty(),
];

const newGroupValidator = () => [
  body("name", "Group name is required").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Members are required")
    .isArray({ min: 2, max: 100 })
    .withMessage("Members must be between 2 and 100"),
];

const addMemberValidator = () => [
  body("chatId", "Chat ID is required").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Members are required")
    .isArray({ min: 1, max: 97 })
    .withMessage("Members must be between 1 and 97"),
];

const removeMemberValidator = () => [
  body("chatId", "Chat ID is required").notEmpty(),
  body("userId", "User ID is required").notEmpty(),
];

const sendAttachmentsValidator = () => [
  body("chatId", "Chat ID is required").notEmpty(),
];

const chatIdValidator = () => [param("id", "Chat ID is required").notEmpty()];

const renameValidator = () => [
  param("id", "Chat ID is required").notEmpty(),
  body("name", "New name is required").notEmpty(),
];

const sendRequestValidator = () => [
  body("userId", "User ID is required").notEmpty(),
];

const acceptRequestValidator = () => [
  body("requestId", "Request ID is required").notEmpty(),
  body("accept")
    .notEmpty()
    .withMessage("Acceptance status is required")
    .isBoolean()
    .withMessage("Acceptance status must be a boolean value"),
];

const adminLoginValidator = () => [
  body("secretKey", "Secret key is required").notEmpty(),
];

export {
  acceptRequestValidator,
  addMemberValidator,
  adminLoginValidator,
  chatIdValidator,
  loginValidator,
  newGroupValidator,
  registerValidator,
  removeMemberValidator,
  renameValidator,
  sendAttachmentsValidator,
  sendRequestValidator,
  validateHandler,
};
