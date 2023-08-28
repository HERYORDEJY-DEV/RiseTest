import * as yup from "yup";

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .test(
      "email",
      "Please enter your email address in this format: yourname@domain.com.",
      value => {
        return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value);
      },
    ),

  password: yup.string().required("Password is required"),
});

export const createAccountSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .test(
      "email",
      "Please enter your email address in this format: yourname@domain.com.",
      value => {
        return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value);
      },
    ),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "")
    .test("password", "", value => {
      // return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(
      return /[!@$&*\/?]/.test(value);
    }),
});

export const aboutYouSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name should contain a minimum of 2 characters.")
    .max(40, "First name should contain a maximum of 40 characters.")
    .test("firstName", "First name is invalid.", value => {
      return /^[\.\-/A-Za-z\u00C0-\u017F ]+$/.test(value);
    }),

  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name should contain a minimum of 2 characters.")
    .max(40, "Last name should contain a maximum of 40 characters.")
    .test("lastName", "Last name is invalid.", value => {
      return /^[\.\-/A-Za-z\u00C0-\u017F ]+$/.test(value);
    }),

  dateOfBirth: yup.date().required(),

  // nickname: yup.string(),
  //
  // phone: yup.object().shape({
  //   dialCode: yup.string().when("number", {
  //     is: (number: string) => Boolean(number?.length),
  //     then: yup => yup.required("Dial code is required"),
  //     otherwise: yup => yup.notRequired(),
  //   }),
  //   number: yup
  //     .string()
  //     // .required("Phone number is required")
  //     .test("phone", "Mobile number is not valid.", function (value) {
  //       return Boolean(value?.length) ? !isNaN(Number(`${value}`)) : true;
  //       // return /^\d+$/.test(`${value}`);
  //     }),
  // }),
});
