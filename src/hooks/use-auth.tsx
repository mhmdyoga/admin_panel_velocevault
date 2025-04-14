"use client"; 
import { LoginService, LogoutService } from "@/features/auth/services/AuthServicess";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
    return useMutation({
        mutationFn: LoginService
    })
}

export const useLogut = () => {
    return useMutation({
        mutationFn: LogoutService
    })
}