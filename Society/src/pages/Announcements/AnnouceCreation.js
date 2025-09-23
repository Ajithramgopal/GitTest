import { useContext } from "react";
import { dataContext } from "../../App";
import { useNavigate, useLocation } from "react-router-dom";
import usePostApi from "../CustomHook/usePostApi";
import usePutApi from "../CustomHook/usePutApi";
import useFormState from "../CustomHook/useFormState";
import ValidationForm from "../CustomHook/ValidationForm";
import ReusableForm from "../CustomHook/ReusableForm";

export default function AnnouceCreation() {
  const data = useContext(dataContext);
  const orgId = data?.[0]?.orgid || null;
  const toDate = data?.[0]?.todaydate || null;
  const created = data?.[0]?.createdby || "admin";
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location?.state?.editData || null;

  const { updateItem, waiting } = usePutApi("announce");
  const { postData, postLoading } = usePostApi("announce");

  const initialState = {
    announceid: "",
    title: "",
    message: "",
    postedBy: "",
    audienceType: "",
    targetBlock: "",
    targetFlat: "",
    attach: "",
    status: "",
    sendPush: "",
    createdby: created,
    createddate: toDate,
    updatedby: editData ? created : null,
    updateddate: editData ? toDate : null,
    organizationid: orgId,
  };

  const [formData, handleChange, handleSubmit, setFormData] = useFormState({
    initialState,
    editData,
    orgId,
    toDate,
    created,
    ValidationForm,
    updateItem,
    postData,
    navigate,
  });
  const inputsField = [
    {
      label: "Announce ID",
      name: "announceid",
      type: "number",
      required: true,
    },
    { label: "Title", name: "title", type: "text", required: true },
    { label: "Message", name: "message", type: "textarea", required: true },
    { label: "Posted By", name: "postedBy", type: "text", required: true },
    {
      label: "Audience Type",
      name: "audienceType",
      type: "select",
      options: ["All", "Block", "Flat"],
      required: true,
    },
    { label: "Target Block", name: "targetBlock", type: "text" },
    { label: "Target Flat", name: "targetFlat", type: "text" },
    { label: "Attachment", name: "attach", type: "file" },
    {
      label: "Status",
      name: "status",
      type: "select",
      options: ["Active", "Inactive"],
      required: true,
    },
    {
      label: "Send Push Notification",
      name: "sendPush",
      type: "select",
      options: ["Yes", "No"],
      required: true,
    },
  ];

  const error = ValidationForm(formData, "announce");

  return (
    <ReusableForm
      title="Announcement"
      fields={inputsField}
      data={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      loading={postLoading || waiting}
      isEdit={!!editData}
      errorprint={error}
      redirect="/announcerep"
    />
  );
}
