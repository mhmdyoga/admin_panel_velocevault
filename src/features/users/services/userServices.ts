import baseApi from "@/BaseApi/baseApi"

export interface UserType {
    id?: string
    username?: string
    password?: string
    email?: string
}

export const getUsers = async() => {
    const response = await baseApi.get('/users');
    return response.data;
}

export const deleteUser = async(id: {params: {id: string}}) => {
   const response = await baseApi.delete(`/users/${id}`);
   return response.data
};

export const updateUser = async(id: {params: {id:string}}, data: UserType) => {
    const response = await baseApi.put(`/users/${id}`, data)
    return response.data
}