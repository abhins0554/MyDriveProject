import { makeUnauthorizedRequest } from "@/src/config/apiConfig";

const loginService = (data: any) => {
  return makeUnauthorizedRequest("POST", "/auth/login", data);
};

const signupService = (data: any) => {
  return makeUnauthorizedRequest("POST", "/auth/signup", data);
};

const googleSignupService = (data: any) => {
  return makeUnauthorizedRequest("POST", "/auth/signup-google", data);
};

const googleLoginService = (data: any) => {
  return makeUnauthorizedRequest("POST", "/auth/login-google", data);
};

const forgotPasswordService = (params: string) => {
  return makeUnauthorizedRequest("GET", "/auth/forgot-password" + params);
};

const validateOTPService = (params: string) => {
  return makeUnauthorizedRequest("GET", "/auth/validate-otp-password" + params);
};

const authService = {
  loginService,
  signupService,
  googleLoginService,
  googleSignupService,
  forgotPasswordService,
  validateOTPService,
};

export default authService;
