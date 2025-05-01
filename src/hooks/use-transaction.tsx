"use client";
import { PercentOfMonths, PercentOfTransaction, chartDataTransaction, getTransactions } from "@/features/transactions/services/ServicesTransaction";
import { useQuery } from "@tanstack/react-query";


export function useGetTransaction(){
    return useQuery({
        queryKey: ["transaction"],
        queryFn: () => getTransactions()
    })
}

export function useGetPercentOfMonths(){
    return useQuery({
        queryFn: () => PercentOfMonths(),
        queryKey: ["percent-of-months"],
    })
}

export function useGetPercentTransaction(){
    return useQuery({
        queryFn: () => PercentOfTransaction(),
        queryKey: ["percent-of-transaction"],
    })
}

export function useChartDataTx(){
    return useQuery({
        queryFn: () => chartDataTransaction(),
        queryKey: ["chart_data_transaction"]
    })
}
