import { useContext } from "react";
import { dataContext } from "../../App";
import { useNavigate, useLocation } from "react-router-dom";
import usePostApi from "../CustomHook/usePostApi";
import usePutApi from "../CustomHook/usePutApi";
import useFormState from "../CustomHook/useFormState";
import ValidationForm from "../CustomHook/ValidationForm";
import ReusableForm from "../CustomHook/ReusableForm";

export default function UserCreation() {
  const data = useContext(dataContext);
  const orgId = data?.[0]?.orgId || null;
  const userId = data?.[0]?.userId || null;
  const created = data?.[0]?.createdBy || null;
  const toDate = data?.[0]?.createdby || null;

  const navigate = useNavigate();
  const location = useLocation();
  const editData = location?.state?.editData || null;

  const { updateItem, waiting } = usePutApi("flat");
  const { postData, postLoading } = usePostApi("flat");

  const initialState = {
    flatId: null,
    blockName: null,
    flatNo: null,
    flatName: null,
    ownerName: null,
    mobile: null,
    userId: userId,
    createdBy: created,
    createdDate: null,
    updatedBy: editData ? created : null,
    updatedDate: editData ? toDate : null,
    organizationId: orgId,
  };

  const [handleChange, handleSubmit, formData] = useFormState({
    initialState,
    editData,
    ValidationForm,
    updateItem,
    postData,
    navigate,
    idField: "flatid", // ✅ fixed here
    redirectPath: "/flatrep", // ✅ fixed here
    formType: "flat", // ✅ fixed here
  });

  const inputsField = [
    { label: "Flat ID", name: "flatId", type: "text", required: true },
    { label: "Block Name", name: "blockName", type: "text", required: true },
    { label: "Flat Number", name: "flatNo", type: "text", required: true },
    { label: "Flat Name", name: "flatName", type: "text" },
    { label: "Owner Name", name: "ownerName", type: "text" },
    { label: "Mobile", name: "mobile", type: "tel" },

    // Hidden system fields
    { label: "User ID", name: "userId", type: "text", hidden: true },
    { label: "Created By", name: "createdBy", type: "text", hidden: true },
    { label: "Created Date", name: "createdDate", type: "date", hidden: true },
    { label: "Updated By", name: "updatedBy", type: "text", hidden: true },
    { label: "Updated Date", name: "updatedDate", type: "date", hidden: true },
    {
      label: "Organization ID",
      name: "organizationId",
      type: "text",
      hidden: true,
    },
  ];

  const error = ValidationForm(formData, "flat");

  return (
    <ReusableForm
      title="Flat"
      fields={inputsField}
      data={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      loading={postLoading || waiting}
      isEdit={!!editData}
      errorprint={error}
      redirect="/flatrep"
    />
  );
}
