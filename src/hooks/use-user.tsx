"use client";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../features/users/services/userServices";


export function useUser() {
   return useQuery({
        queryKey: ["users"],
        queryFn: getUsers 
    })
};


