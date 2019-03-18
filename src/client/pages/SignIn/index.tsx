import * as React from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormPage from "../../components/Layout/FormPage";
import LoginForm from "./form";
export const Login = () => <FormPage title="Sign In" icon={<LockOutlinedIcon />} form={<LoginForm />} />;
export default Login;