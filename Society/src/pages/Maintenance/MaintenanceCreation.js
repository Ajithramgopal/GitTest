import { useContext } from "react";
import { dataContext } from "../../App";
import { useNavigate, useLocation } from "react-router-dom";
import usePostApi from "../CustomHook/usePostApi";
import usePutApi from "../CustomHook/usePutApi";
import useFormState from "../CustomHook/useFormState";
import ValidationForm from "../CustomHook/ValidationForm";
import ReusableForm from "../CustomHook/ReusableForm";

export default function MaintenanceCreation() {
  const data = useContext(dataContext);
  const orgId = data?.[0]?.orgId || null;
  const userId = data?.[0]?.userId || null;
  const created = data?.[0]?.createdBy || null;
  const toDate = data?.[0]?.createdby || null;

  const navigate = useNavigate();
  const location = useLocation();
  const editData = location?.state?.editData || null;

  const { updateItem, waiting } = usePutApi("maintenance");
  const { postData, postLoading } = usePostApi("maintenance");

  const initialState = {
    maintainId: null,
    residentId: null,
    block: null,
    flat: null,
    category: null,
    desc: null,
    attach: null,
    status: null,
    priority: null,
    assignedTo: null,
    assignedAt: null,
    reslovedAt: null,
    rating: null,
    feedBack: null,
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
    idField: "maintainId",
    redirectPath: "/maintenancerep",
    formType: "maintenance",
  });

  const inputsField = [
    {
      label: "Maintenance ID",
      name: "maintainId",
      type: "text",
      required: true,
    },
    { label: "Resident ID", name: "residentId", type: "text", required: true },
    { label: "Block", name: "block", type: "text", required: true },
    { label: "Flat", name: "flat", type: "text", required: true },
    { label: "Category", name: "category", type: "text", required: true },
    { label: "Description", name: "desc", type: "textarea" },
    { label: "Attachment", name: "attach", type: "file" },
    { label: "Status", name: "status", type: "text" },
    { label: "Priority", name: "priority", type: "text" },
    { label: "Assigned To", name: "assignedTo", type: "text" },
    { label: "Assigned At", name: "assignedAt", type: "datetime-local" },
    { label: "Resolved At", name: "reslovedAt", type: "datetime-local" },
    { label: "Rating", name: "rating", type: "number", min: 1, max: 5 },
    { label: "Feedback", name: "feedBack", type: "textarea" },
    { label: "User ID", name: "userId", type: "text" },
  ];

  const error = ValidationForm(formData, "maintenance");

  return (
    <ReusableForm
      title="Maintenance"
      fields={inputsField}
      data={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      loading={postLoading || waiting}
      isEdit={!!editData}
      errorprint={error}
      redirect="/maintenance"
    />
  );
}
