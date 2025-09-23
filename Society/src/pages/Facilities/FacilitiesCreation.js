import { useContext } from "react";
import { dataContext } from "../../App";
import { useNavigate, useLocation } from "react-router-dom";
import usePostApi from "../CustomHook/usePostApi";
import usePutApi from "../CustomHook/usePutApi";
import useFormState from "../CustomHook/useFormState";
import ValidationForm from "../CustomHook/ValidationForm";
import ReusableForm from "../CustomHook/ReusableForm";

export default function FacilitiesCreation() {
  const data = useContext(dataContext);
  const orgId = data?.[0]?.orgId || null;
  const userId = data?.[0]?.userId || null;
  const created = data?.[0]?.createdBy || null;
  const toDate = data?.[0]?.createdby || null;

  const navigate = useNavigate();
  const location = useLocation();
  const editData = location?.state?.editData || null;

  const { updateItem, waiting } = usePutApi("facilitymaster");
  const { postData, postLoading } = usePostApi("facilitymaster");

  const initialState = {
    facilitymasId: "",
    name: "",
    desc: "",
    availableslot: "",
    priceslot: "",
    isPaid: "",
    attach: "",
    status: "",
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
    idField: "facilitymasId",
    redirectPath: "/facilitymasrep",
    formType: "facility",
  });
  const inputsField = [
    {
      label: "Facility ID",
      name: "facilitymasId",
      type: "number",
      required: true,
    },
    { label: "Facility Name", name: "name", type: "text", required: true },
    { label: "Description", name: "desc", type: "textarea" },
    {
      label: "Available Slot",
      name: "availableslot",
      type: "number",
      required: true,
    },
    {
      label: "Price Per Slot",
      name: "priceslot",
      type: "number",
      required: true,
    },
    {
      label: "Is Paid",
      name: "isPaid",
      type: "select",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    { label: "Attachment URL", name: "attach", type: "text" },
    {
      label: "Status",
      name: "status",
      type: "select",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
  ];

  const error = ValidationForm(formData, "facilitymaster");

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
      redirect="/facilitymasrep"
    />
  );
}
