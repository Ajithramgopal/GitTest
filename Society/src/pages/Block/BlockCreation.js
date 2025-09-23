import { useContext } from "react";
import { dataContext } from "../../App";
import { useNavigate, useLocation } from "react-router-dom";
import usePostApi from "../CustomHook/usePostApi";
import usePutApi from "../CustomHook/usePutApi";
import useFormState from "../CustomHook/useFormState";
import ValidationForm from "../CustomHook/ValidationForm";
import ReusableForm from "../CustomHook/ReusableForm";

export default function BlockCreation() {
  const data = useContext(dataContext);
  const orgId = data?.[0]?.orgid || null;
  const toDate = data?.[0]?.todaydate || null;
  const created = data?.[0]?.createdby || "admin";
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location?.state?.editData || null;

  const { updateItem, waiting } = usePutApi("block");
  const { postData, postLoading } = usePostApi("block");

  const initialState = {
    blockid: "",
    blockname: "",
    flatcount: "",
    desc: "",
    userid: null,
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
    idField: "blockid", // ✅ fixed here
    redirectPath: "/blockrep", // ✅ fixed here
    formType: "block", // ✅ fixed here
  });

  const inputsField = [
    { label: "Block ID", name: "blockid", type: "number", required: true },
    { label: "Block Name", name: "blockname", type: "text", required: true },
    { label: "Flat Count", name: "flatcount", type: "number", required: true },
    { label: "Description", name: "desc", type: "textarea" },
  ];

  const error = ValidationForm(formData, "block");

  return (
    <ReusableForm
      title="Block"
      fields={inputsField}
      data={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      loading={postLoading || waiting}
      isEdit={!!editData}
      errorprint={error}
      redirect="/blockrep"
    />
  );
}
