"use client";
import { createProduct, getProducts, ProductType, updateProduct } from "@/features/product/services/productServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export function useGetProduct(){
    return useQuery({
        queryKey: ["products"],
        queryFn: getProducts
    })
}

export function useCreateProduct() { 
    return useMutation({
        mutationFn: createProduct
    })
}

export function useUpdateProducts() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (variables: { id: string; data: Partial<ProductType> }) => updateProduct(variables.id, variables.data as ProductType),
        onSuccess(){
           queryClient.invalidateQueries(["products"])
        }
    })
}