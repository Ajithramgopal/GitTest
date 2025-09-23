// Validation.js
export default function Validation(tableName, values, userData = []) {
  let validationError = {};

  if (tableName === "users") {
    if (!values.userName || values.userName.trim() === "") {
      validationError.userName = "Please enter userName";
    }
    if (!values.email || values.email.trim() === "") {
      validationError.email = "Please enter email";
    }
    if (!values.password || values.password.trim() === "") {
      validationError.password = "Please enter password";
    }
    if (values.password !== values.conPassword) {
      validationError.conPassword = "Passwords do not match";
    }
    if (
      userData.length > 0 &&
      userData.some((item) => item.email === values.email)
    ) {
      validationError.email = "Email already exists";
    }
  }

  if (tableName === "block") {
    if (!values.blockName) {
      validationError.blockName = "Please enter BlockName";
    }
  }

  if (tableName === "flat") {
    if (!values.blockName) {
      validationError.blockName = "Please enter BlockName";
    }
    if (!values.flatNo) {
      validationError.flatNo = "Please enter FlatNo";
    }
  }

  if (tableName === "category") {
    if (!values.name) {
      validationError.name = "Please enter Category Name";
    }
  }

  if (tableName === "status") {
    if (!values.name) {
      validationError.name = "Please enter Status Name";
    }
    if (!values.code) {
      validationError.code = "Please enter Code Name";
    }
  }

  if (tableName === "role") {
    if (!values.role) {
      validationError.role = "Please enter Role";
    }
  }

  return validationError;
}
