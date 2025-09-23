// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import CallDate from "../../components/CallDate";

// export default function useFormState({
//   initialState = {},
//   editData = null,
//   orgId,
//   toDate,
//   created,
//   ValidationForm,
//   updateItem,
//   postData,
//   navigate,
//   idField,
//   redirectPath,
//   formType,
// })

// {
//   const [formData, setFormData] = useState(initialState);
//   const [errors, setErrors] = useState({});
//   const formatted = CallDate();

//   useEffect(() => {
//     if (editData) {
//       setFormData({
//         ...editData,
//         conpassword: editData.password || "",
//         organizationId: editData.organizationid || orgId,
//         updatedBy: created,
//         updatedDate: formatted,
//       });
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         organizationId: orgId,
//         createdDate: null,
//         createdBy: null,
//       }));
//     }
//   }, [editData]);

//   const handleChange = (key, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const resetForm = () => {
//     setFormData(initialState);
//     setErrors({});
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("formData", formData);
//     const validationErrors = ValidationForm(formData, formType);
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length > 0) {
//       toast.error("Please fix validation errors!");
//       return;
//     }

//     try {
//       if (editData) {
//         const updatedData = {
//           ...formData,
//           updatedBy: created,
//           updatedDate: formatted,
//         };
//         await updateItem(idField, formData[idField], updatedData);
//         toast.success("Updated successfully!");
//       } else {
//         await postData(formData);
//         toast.success("Created successfully!");
//       }

//       navigate(redirectPath);
//     } catch (err) {
//       console.error("Form Submission Error:", err);
//       toast.error("Something went wrong during submission.");
//     }
//   };

//   return [formData, handleChange, handleSubmit, setFormData, resetForm, errors];
// }

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import CallDate from "../../components/CallDate";

export default function useFormState({
  initialState = {}, //Form Input Filed Passing
  editData = null, //If Editdata have data showing
  ValidationForm,
  updateItem,
  postData,
  navigate,
  idField,
  redirectPath,
  formType,
}) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const formatted = CallDate();

  useEffect(() => {
    if (editData) {
      let updatedData = {
        ...editData,
      };
      if (formType === "user") {
        updatedData.conpassword = editData.password || "";
        updatedData.organizationId = editData.organizationId || null;
      }
      setFormData(updatedData);
    } else {
      setFormData((prev) => ({
        ...prev,
        // organizationId: null,
        createdDate: null,
        createdBy: null,
      }));
    }
  }, [editData]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData", formData);
    const validationErrors = ValidationForm(formData, formType);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix validation errors!");
      return;
    }

    try {
      if (editData) {
        const updatedData = {
          ...formData,
          // updatedBy: created,
          // updatedDate: formatted,
        };
        await updateItem(idField, formData[idField], updatedData);
        toast.success("Updated successfully!");
      } else {
        await postData(formData);
        toast.success("Created successfully!");
      }

      navigate(redirectPath);
    } catch (err) {
      console.error("Form Submission Error:", err);
      toast.error("Something went wrong during submission.");
    }
  };

  return [handleChange, handleSubmit, formData, resetForm, errors];
}
