/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useUser } from '@/hooks/use-user'
import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { deleteUser } from '@/features/users/services/userServices';
import { useToast } from '@/hooks/use-toast';

const Users = () => {
   const { data: users } = useUser();
   const { toast } = useToast()

   const deleteUsers = (id: {params: {id: string}}) => {
      try{
        deleteUser(id)
        toast({
          title: "Successfully deleted item"
        })
      }catch(error){
        console.log(error)
      }
   }

  return (
    <div>
       <Table>
      <TableCaption>A list of your recent Users.</TableCaption>
      <TableHeader>
        <TableRow>
        <TableHead className="w-[100px]">Id</TableHead>
          <TableHead className="w-[250px]">Username</TableHead>
          <TableHead className="w-[150px]">E-mail</TableHead>
          <TableHead className="text-right w-[160px]">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.data?.map((items: any) => (
          <TableRow key={items.id}>
            <TableCell className="font-medium">{items.id}</TableCell>
            <TableCell className="font-medium">{items.username}</TableCell>
            <TableCell>{items.email}</TableCell>
            <TableCell className="text-right flex justify-center items-center gap-2">
              <Button variant="ghost">Edit</Button>
              <Button variant="destructive" onClick={() => deleteUsers(items.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}

export default Users