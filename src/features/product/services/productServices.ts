import baseApi from "@/BaseApi/baseApi";

export interface ProductType{
    id?: string
    title: string;
    description: string;
    price: number;
    image: string;
}

export const getProducts = async() => {
    const response = await baseApi.get("/products");
    return response.data;
}

export const createProduct = async(data: ProductType) => {
    const response = await baseApi.post("/products", data ,{
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
}

export const updateProduct = async(id: string, data: ProductType) => {
    const response = await baseApi.put(`/products/${id}`, data, {
        headers: {
            "Content-Type": "application/json" 
        }
    });
    return response.data;
}

export const deleteProduct = async(id: string) => {
    const response = await baseApi.delete(`/products/${id}`);
    return response.data;
}