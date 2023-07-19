const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp = /^\w+@\w+\.[a-z]{2,3}$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

const registerSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp),
  password: Joi.string().required().min(6),
  subscription: Joi.string().valueOf("starter", "pro", "business"),
});

const loginSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp),
  password: Joi.string().required().min(6),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string().required().valueOf("starter", "pro", "business"),
});

const schemas = {
  register: registerSchema,
  login: loginSchema,
  updateSubscription: updateSubscriptionSchema,
};

module.exports = { User, schemas };
