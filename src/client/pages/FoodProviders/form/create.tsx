import * as React from "react";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import FormPage from "../../../components/Layout/FormPage";
import Form from "./form";
export const CreateFoodProvider = () => <FormPage title="Create Food Provider" icon={<RestaurantIcon />} form={<Form />} />;
export default CreateFoodProvider;