import { useContext, useState } from "react";
import { dataContext } from "../../App";
import { useNavigate, useLocation } from "react-router-dom";
import usePostApi from "../CustomHook/usePostApi";
import usePutApi from "../CustomHook/usePutApi";
import useFormState from "../CustomHook/useFormState";
import ValidationForm from "../CustomHook/ValidationForm";
import ReusableForm from "../CustomHook/ReusableForm";
import CallDate from "../../components/CallDate";
export default function UserCreation() {
  const data = useContext(dataContext);
  const orgId = data?.[0]?.orgId || null;
  console.log("orgId", data.organizationid);
  const toDate = data?.[0]?.formatted || null;
  const created = data?.[0]?.createdBy || "admin";
  const userId = data?.[0]?.userId;

  const navigate = useNavigate();
  const location = useLocation();
  const editData = location?.state?.editData || null;
  const { formatted } = CallDate();
  const { updateItem, waiting } = usePutApi("user");
  const { postData, postLoading } = usePostApi("user");

  const initialState = {
    userid: "",
    username: "",
    password: "",
    conpassword: "",
    email: "",
    mobile: "",
    role: "",
    block: "",
    flat: "",
    createdby: created,
    createddate: formatted,
    updatedby: editData ? created : null,
    updateddate: editData ? formatted : null,
    organizationid: orgId,
  };

  const [handleChange, handleSubmit, formData] = useFormState({
    initialState,
    editData,
    ValidationForm,
    updateItem,
    postData,
    navigate,
    idField: "userid", // ✅ fixed here
    redirectPath: "/userrep", // ✅ fixed here
    formType: "user", // ✅ fixed here
  });

  const inputsField = [
    { label: "User ID", name: "userid", type: "number", required: true },
    { label: "Username", name: "username", type: "text", required: true },
    { label: "Password", name: "password", type: "password", required: true },
    {
      label: "Confirm Password",
      name: "conpassword",
      type: "password",
      required: true,
    },
    { label: "Email", name: "email", type: "email", required: true },
    { label: "Mobile", name: "mobile", type: "tel", required: true },
    { label: "Role", name: "role", type: "text", required: true },
    {
      name: "block",
      label: "Block",
      type: "select",
      apiEndpoint: "block", // your Supabase table
      valueKey: "blockname", // key used for option.value
      labelKey: "blockname", // key used for option.label
      required: true,
    },
    {
      name: "flatName",
      label: "flatName",
      type: "select",
      apiEndpoint: "flat", // your Supabase table
      valueKey: "flatName", // key used for option.value
      labelKey: "flatName", // key used for option.label
      required: true,
    },
  ];

  const error = ValidationForm(formData, "user");

  return (
    <ReusableForm
      title="User"
      fields={inputsField}
      data={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      loading={postLoading || waiting}
      isEdit={!!editData}
      errorprint={error}
      redirect="/userrep"
    />
  );
}
