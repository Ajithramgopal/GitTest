import { useContext } from "react";
import { dataContext } from "../../App";
import { useNavigate, useLocation } from "react-router-dom";
import usePostApi from "../CustomHook/usePostApi";
import usePutApi from "../CustomHook/usePutApi";
import useFormState from "../CustomHook/useFormState";
import ValidationForm from "../CustomHook/ValidationForm";
import ReusableForm from "../CustomHook/ReusableForm";

export default function OrgCreation() {
  const data = useContext(dataContext);
  const orgId = data?.[0]?.orgId || null;
  const userId = data?.[0]?.userId || null;
  const created = data?.[0]?.createdBy || null;
  const toDate = data?.[0]?.createdby || null;

  const navigate = useNavigate();
  const location = useLocation();
  const editData = location?.state?.editData || null;

  const { updateItem, waiting } = usePutApi("organization");
  const { postData, postLoading } = usePostApi("organization");

  const initialState = {
    orgId: null,
    orgName: null,
    status: null,
    startDate: null,
    endDate: null,
    userId: userId,
    createdBy: created,
    createdDate: null,
    updatedBy: editData ? created : null,
    updatedDate: editData ? toDate : null,
  };

  const [handleChange, handleSubmit, formData] = useFormState({
    initialState,
    editData,
    ValidationForm,
    updateItem,
    postData,
    navigate,
    idField: "orgid",
    redirectPath: "/orgrep",
    formType: "org",
  });

const inputsField = [
  { label: "Organization ID", name: "orgId", type: "text", required: true },
  { label: "Organization Name", name: "orgName", type: "text", required: true },
  { label: "Status", name: "status", type: "text" },
  { label: "Start Date", name: "startDate", type: "date" },
  { label: "End Date", name: "endDate", type: "date" },
  { label: "User ID", name: "userId", type: "text", hidden: true },
  { label: "Created By", name: "createdBy", type: "text", hidden: true },
  { label: "Created Date", name: "createdDate", type: "date", hidden: true },
  { label: "Updated By", name: "updatedBy", type: "text", hidden: true },
  { label: "Updated Date", name: "updatedDate", type: "date", hidden: true },
];


  const error = ValidationForm(formData, "organization");

  return (
    <ReusableForm
      title="organization"
      fields={inputsField}
      data={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      loading={postLoading || waiting}
      isEdit={!!editData}
      errorprint={error}
      redirect="/orgrep"
    />
  );
}
