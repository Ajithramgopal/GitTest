import { useContext } from "react";
import { dataContext } from "../../App";
import { useNavigate, useLocation } from "react-router-dom";
import usePostApi from "../CustomHook/usePostApi";
import usePutApi from "../CustomHook/usePutApi";
import useFormState from "../CustomHook/useFormState";
import ValidationForm from "../CustomHook/ValidationForm";
import ReusableForm from "../CustomHook/ReusableForm";

export default function FacilityBookingCreation() {
  const data = useContext(dataContext);
  const orgId = data?.[0]?.orgId || null;
  const userId = data?.[0]?.userId || null;
  const created = data?.[0]?.createdBy || null;
  const toDate = data?.[0]?.createdby || null;

  const navigate = useNavigate();
  const location = useLocation();
  const editData = location?.state?.editData || null;

  const { updateItem, waiting } = usePutApi("facilityBooking");
  const { postData, postLoading } = usePostApi("facilityBooking");

  const initialState = {
    facilityBookId: "",
    residentId: "",
    facilityId: "",
    bookingDate: "",
    timeSlot: "",
    paymentStatus: "",
    notes: "",
    status: "",
    approvedBy: "",
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
    idField: "facilityBookId",
    redirectPath: "/facilityrep",
    formType: "facility",
  });
  const inputsField = [
    {
      label: "Facility Booking ID",
      name: "facilityBookId",
      type: "number",
      required: true,
    },
    {
      label: "Resident ID",
      name: "residentId",
      type: "number",
      required: true,
    },
    {
      label: "Facility ID",
      name: "facilityId",
      type: "number",
      required: true,
    },
    {
      label: "Booking Date",
      name: "bookingDate",
      type: "date",
      required: true,
    },
    { label: "Time Slot", name: "timeSlot", type: "time", required: true },
    {
      label: "Payment Status",
      name: "paymentStatus",
      type: "select",
      options: [
        { label: "Paid", value: "paid" },
        { label: "Pending", value: "pending" },
        { label: "Failed", value: "failed" },
      ],
    },
    { label: "Notes", name: "notes", type: "textarea" },
    {
      label: "Status",
      name: "status",
      type: "select",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
      ],
    },
    { label: "Approved By", name: "approvedBy", type: "text" },
  ];

  const error = ValidationForm(formData, "facilityBooking");

  return (
    <ReusableForm
      title="Facility"
      fields={inputsField}
      data={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      loading={postLoading || waiting}
      isEdit={!!editData}
      errorprint={error}
      redirect="/facilityrep"
    />
  );
}
