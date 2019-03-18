import * as React from "react";
import FormPage from "../../components/Layout/FormPage";
import SignUpForm from "./form";
export const SignUp = () => <FormPage title="Sign Up" form={<SignUpForm />} />;
export default SignUp;