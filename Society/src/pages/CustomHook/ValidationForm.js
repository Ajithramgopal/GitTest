export default function ValidationForm(data, type) {
  let errors = {};
  if (type === "user") {
    if (!data.userid) errors.userid = "User ID is required";
    if (!data.username) errors.username = "Username is required";
    if (!data.password) errors.password = "Password is required";
    if (data.password && data.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    if (data.password !== data.conpassword)
      errors.conpassword = "Passwords do not match";
    if (!data.email) errors.email = "Email is required";
    if (!data.mobile) errors.mobile = "Mobile is required";
  }
  return errors;
}
