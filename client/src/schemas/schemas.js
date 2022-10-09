import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Required."),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters long. ")
    .required("Required"),
});

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Required."),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters long. ")
    .required("Required"),
  firstName: yup
    .string()
    .max(25, "Your first name must be less than 25 characters long.")
    .required("Required"),
  lastName: yup
    .string()
    .max(25, "Your last name must be less than 25 characters long.")
    .required("Required"),
});

export const noteSchema = yup.object().shape({
  title: yup
    .string()
    .max(50, "Your title must be less than 50 characters long.")
    .required("Required."),
  text: yup
    .string()
    .max(1000, "Your text must be less than 1000 characters long.")
    .required("Required."),
});
