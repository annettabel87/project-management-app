export const nameValidation = (value: string) => {
  return /^[a-zA-Z ]{2,30}$/.test(value);
};

export const loginValidation = (value: string) => {
  return /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/i.test(value);
};

export const passwordValidation = (value: string) => {
  return /[0-9a-zA-Z!@#$%^&*]{8,}/.test(value);
};
