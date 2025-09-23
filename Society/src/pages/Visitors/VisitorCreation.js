import { useContext } from "react";
import { dataContext } from "../../App";
import { useNavigate, useLocation } from "react-router-dom";
import usePostApi from "../CustomHook/usePostApi";
import usePutApi from "../CustomHook/usePutApi";
import useFormState from "../CustomHook/useFormState";
import ValidationForm from "../CustomHook/ValidationForm";
import ReusableForm from "../CustomHook/ReusableForm";

export default function VisitorCreation() {
  const data = useContext(dataContext);
  const orgId = data?.[0]?.orgId || null;
  const userId = data?.[0]?.userId || null;
  const created = data?.[0]?.createdBy || null;
  const toDate = data?.[0]?.createdby || null;

  const navigate = useNavigate();
  const location = useLocation();
  const editData = location?.state?.editData || null;
  //Call Api for Post,Put Method
  const { postData, postLoading } = usePostApi("visitors");
  const { updateItem, waiting } = usePutApi("visitors");
  //Assign Initial Values
  const initialState = {
    visitId: null,
    residentId: null,
    name: null,
    mobile: null,
    purpose: null,
    preApprovedBy: null,
    expectedTime: null,
    entryTime: null,
    exitTime: null,
    status: null,
    entryMethod: null,
    otpCode: null,
    qrCodeurl: null,
    vehicleNo: null,
    photoUrl: null,
    notes: null,
    verifiedBy: null,
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
    idField: "visitorid",
    redirectPath: "/visitorrep",
    formType: "vsitor",
  });

  const inputsField = [
    { label: "Visit ID", name: "visitId", type: "text", required: true },
    { label: "Resident ID", name: "residentId", type: "text", required: true },
    { label: "Visitor Name", name: "name", type: "text", required: true },
    { label: "Mobile", name: "mobile", type: "tel" },
    { label: "Purpose", name: "purpose", type: "text" },
    { label: "Pre-approved By", name: "preApprovedBy", type: "text" },
    { label: "Entry Time", name: "entryTime", type: "datetime-local" },
    { label: "Exit Time", name: "exitTime", type: "datetime-local" },
    { label: "Expected Time", name: "expectedTime", type: "datetime-local" },
    { label: "Status", name: "status", type: "text" },
    { label: "Entry Method", name: "entryMethod", type: "text" },
    { label: "OTP Code", name: "otpCode", type: "text" },
    { label: "QR Code URL", name: "qrCodeurl", type: "text" },
    { label: "Vehicle No", name: "vehicleNo", type: "text" },
    { label: "Photo URL", name: "photoUrl", type: "text" },
    { label: "Notes", name: "notes", type: "text" },
    { label: "Verified By", name: "verifiedBy", type: "text" },
    { label: "userId ", name: "userId", type: "text" },
    { label: "createdBy", name: "createdBy", type: "text" },
    { label: "createdDate ", hidden: true, name: "createdDate", type: "date" },
    { label: "updatedBy ", hidden: true, name: "updatedBy", type: "text" },
    {
      label: "updatedDate ",
      type: "hidden",
      name: "updatedDate",
      type: "date",
    },
    {
      label: "organizationId ",
      hidden: true,
      name: "organizationId",
      type: "text",
    },
  ];

  const error = ValidationForm(formData, "visitors");

  return (
    <ReusableForm
      title="Visitor"
      fields={inputsField}
      data={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      loading={postLoading || waiting}
      isEdit={!!editData}
      errorprint={error}
      redirect="/visitorrep"
    />
  );
}
