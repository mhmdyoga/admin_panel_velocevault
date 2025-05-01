import baseApi from "@/BaseApi/baseApi"

type PayloadStatus = {
 status: string
}

export const getTransactions = async () => {
    const response = await baseApi.get('/transactions');
    return response.data
}

export const PercentOfMonths = async () => {
    const response = await baseApi.get('/month-percent');
    return response.data;
}

export const PercentOfTransaction = async () => {
    const response = await baseApi.get('/transactions-percent');
    return response.data;
}

export const chartDataTransaction = async () => {
    const response = await baseApi.get('/chart-data/monthly');
    return response.data
}

export const updatedStatusTx = async (id: string, payload: PayloadStatus) => {
    const response = await baseApi.put(`/status/transaction/${id}`, payload);
    return response.data
}