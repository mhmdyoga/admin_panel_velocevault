import baseApi from "@/BaseApi/baseApi"

interface userType{
    email?:string
    username?:string
    password?:string
}

export const LoginService = async(credential: userType) => {
    const response = await baseApi.post('/auth/login', credential);
    return response.data
};

export const LogoutService = async() => {
    const response = await baseApi.post("/auth/logout");
    return response.data;
  }