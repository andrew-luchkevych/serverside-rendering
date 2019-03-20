import * as React from "react";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import FormPage from "../../../components/Layout/FormPage";
import Form from "./form";
export const CreateFoodType = () => <FormPage title="Create Food Type" icon={<FastfoodIcon />} form={<Form />} />;
export default CreateFoodType;