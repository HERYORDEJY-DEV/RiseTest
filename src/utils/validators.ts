export function passwordValidator(password: string): {
  isMinCharValid: boolean;
  isUppercaseValid: boolean;
  isLowercaseValid: boolean;
  isSpecialCharValid: boolean;
} {
  const isMinCharValid = password.length >= 8;
  const isUppercaseValid = /^(?=.*[A-Z])/.test(password);
  const isLowercaseValid = /^(?=.*[a-z])/.test(password);
  const isSpecialCharValid = /[!@$&*\/?]/.test(password); ///[!@$&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
  // const isSpecialCharValid = /[!@$^&*\/?]+/.test(password);

  return {
    isMinCharValid,
    isUppercaseValid,
    isLowercaseValid,
    isSpecialCharValid,
  };
}
