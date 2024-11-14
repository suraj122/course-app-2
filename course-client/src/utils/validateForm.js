const validateForm = (formData) => {
  const error = {};
  const { username, password } = formData;
  const pwdRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
  if (username.trim() === "") {
    error.username = "Username cant be empty";
  }
  if (password.trim() === "") {
    error.password = "Password cant be empty";
  } else {
    const output = pwdRegex.test(password.trim());
    if (!output) {
      error.password =
        "Invalid passoword, use the combination 1 numeric, 1 lowercase, 1 uppercase, 1 special character and it must be at 8";
    }
  }
  return error;
};

export default validateForm;
