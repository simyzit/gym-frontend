export const emailValidation = {
  required: "Email is required",
  validate: (value: string) => {
    if (
      value.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      return true;
    }
    return "Is not correct!";
  },
};

export const passwordValidation = {
  required: "Password is required",
  validate: (value: string) => {
    if (value.length > 8) {
      return true;
    }
    return "Password must contain at least 8 characters";
  },
};

export const firstNameValidation = {
  required: "First name is required",
  validate: (value: string) => {
    if (value.match(/^[a-zA-Z]/)) {
      return true;
    }
    return "Is not correct!";
  },
};

export const surnameValidation = {
  required: "Surname is required",
  validate: (value: string) => {
    if (value.match(/^[a-zA-Z]/)) {
      return true;
    }
    return "Is not correct!";
  },
};

export const phoneValidation = {
  required: "Phone is required",
  validate: (value: string) => {
    if (value.length > 5 && value.match("^[0-9]$")) {
      return true;
    }
    return "Phone must contain at least 5 numbers";
  },
};
