/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { useGetTransaction } from "@/hooks/use-transaction";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { updatedStatusTx } from "@/features/transactions/services/ServicesTransaction";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { StatusTxSchema, StatusTxType } from "@/features/transactions/schema/SchemaTransaction";
import { zodResolver } from "@hookform/resolvers/zod";
  

const Transaction = () => {
    // hook to get all trasanction data;
    const {data: transaction, isLoading,isError} = useGetTransaction();
    // toast
    const {toast} = useToast();

    // useForm for update status transaction
    const { handleSubmit, setValue } = useForm<StatusTxType>({
       resolver: zodResolver(StatusTxSchema)
    })

    if(isLoading){
        return (
        <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-6 h-6 ml-[445px]"/>
        </div>
        )
    }

    if(isError){
        return (
            <div>error</div>
        )
    }


    return (
        <React.Fragment>
          <Table>
            <TableCaption>A list of all your invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[50px]">OrderId</TableHead>
                <TableHead className="w-[120px]">Username</TableHead>
                <TableHead className="w-[120px]">Email</TableHead>
                <TableHead className="w-[100px]">Amount</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[170px]">Product_Ordered</TableHead>
                <TableHead className="w-[140px]">Address</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transaction.data?.length === 0 ? (
                    <div>No transaction found</div>
                ) :(
                 transaction.data?.map((tx: any) => (
                <TableRow key={tx.id}>
                    <TableCell className="font-medium">{tx.id}</TableCell>
                    <TableCell>{tx.user?.username}</TableCell>
                    <TableCell>{tx.user?.email}</TableCell>
                    <TableCell>${tx.amount}</TableCell>
                    <TableCell>
                    <Select onValueChange={(value: any) => {
                        setValue("status", value);
                        handleSubmit(async (data) => {
                        try {
                            await updatedStatusTx(tx.id, { status: data.status });
                            toast({ title: "Successfully updated transaction" });
                        } catch (err) {
                            console.error(err);
                            toast({ title: "Failed to update", variant: "destructive" });
                        }
                        })();
                    }}>
                        <SelectTrigger className={`w-[140px] rounded-full ${tx.status === "SUCCESS" ? 'bg-green-500' : tx.status === "CANCELED" ? 'bg-red-500' : 'bg-gray-200'} border-none font-bold`}>
                            <SelectValue placeholder={tx.status}/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="SUCCESS">SUCCESS</SelectItem>
                            <SelectItem value="CANCELED">CANCELED</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                        </Select>
                    </TableCell>
                    <TableCell className="grid grid-cols-2">{tx.products.map((item: any) => (
                        <div key={item.id}>
                          <Image src={item.image} alt="product_order" width={64} height={64}/>
                        </div>
                    ))}</TableCell>
                    <TableCell>{tx.address}</TableCell>
                    
                </TableRow>   
                 ))
                )}
            </TableBody>
        </Table>
        </React.Fragment>
    )
}

export default Transaction;