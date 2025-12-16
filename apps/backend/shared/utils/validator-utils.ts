export const getValidationErrorMessages = (resultError: any) => {
  let errors: Record<string, string> = {};
  resultError.forEach((value: { path: string; message: string }) => {
    errors[value.path] = value.message;

    return value;
  });

  return errors;
};
