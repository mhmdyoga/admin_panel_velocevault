/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import { useCreateProduct, useGetProduct } from '@/hooks/useProduct';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea"
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { EditProductSchema, ProductSchema } from '@/features/product/schema/productSchemas';
import { deleteProduct, ProductType, updateProduct } from '@/features/product/services/productServices';
import { useToast } from '@/hooks/use-toast';
import { Loader } from 'lucide-react';


const Products = () => {
    // hook fetch data product;
    const { data } = useGetProduct();
    const [isSelectProduct, setIsSelectProduct] = React.useState<ProductType | null>(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    // hook notification
    const { toast } = useToast()

    // hook create product;
    const createProduct = useCreateProduct();

    // useform untuk create product;
    const { register, handleSubmit, reset,  formState: { errors } } = useForm({
      resolver: zodResolver(ProductSchema)
    });

    // usefrom untuk edit product;
    const {
      register: editRegister,
      handleSubmit: editHandleSubmit,
      setValue: editSetValue,
      formState: {errors: editErrors},
      reset: editReset
    } = useForm({
      resolver: zodResolver(EditProductSchema)
    })

    // onsubmit upload product
    const onSubmit = async(formData: any) => {
       try{
       const form = new FormData();
        form.append("title", formData.title)
        form.append("price", formData.price.toString())
        form.append("description", formData.description)
        if(formData.image[0]) form.append("image", formData.image[0])
        await createProduct.mutateAsync(form as unknown as ProductType, {
          onSuccess(){
            toast({
          title: "Successfuly uploded",
          description: "successfully added your collection"
         })
         reset();
         setIsLoading(false);
          },
          onError(err: any){
            toast({
              title: "Something Wrong",
              description: err.response.data.msg,
              variant: "destructive"
            })
            setIsLoading(false);
          }
        })
         setIsLoading(true);
       }catch(error: unknown){
         if(error instanceof z.ZodError){
          toast({
            title: "Error",
            description: error.errors[0].message,
            variant: "destructive"
          })
         }
       }
    }

    // onselect product
    const onSelectProduct = (product: ProductType) => {
      setIsSelectProduct(product)
      setIsOpen(true)
      editSetValue("title", product.title)
      editSetValue("price", product.price)
      editSetValue("description", product.description)
    }

    // deleting product;
    const deleteProducts = async(id: string) => {
      try {
       await deleteProduct(id);
        toast({
          title: "Successfully remove item"
        })
      } catch (error: unknown) {
        toast({
          title: "Something Wrong",
          description: (error as any).message,
        });
      }
    }

    // onSubmitUpdateProduct
    const onSubmitUpdateProduct = async(formData: any) => {
      try {
        const payload = {
          title: formData.title,
          price: formData.price,
          description: formData.description
        };
        
        await updateProduct(isSelectProduct?.id as string, payload as ProductType);
        toast({
        title: "Successfully update product"
        })
        setIsOpen(false)
        editReset();
      } catch (error: unknown) {
        toast({
          title: "Error",
          description: (error as any).massage,
          variant: "destructive"
        })
      }
    }

  return (
    <div className="flex flex-col">
    <div className="p-4 ml-[850px]">
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default">Add Product</Button>
      </SheetTrigger>
      <SheetContent>
        <form onSubmit={handleSubmit(onSubmit)} encType="application/json">
        <SheetHeader>
          <SheetTitle>Add your products</SheetTitle> 
          <SheetDescription>
            Make a new product you want. Click save when youre done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" type='text'  {...register("title")} placeholder='Porsche GT3RS' className="col-span-3" />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input id="price" type='number'  {...register("price", { valueAsNumber: true })} placeholder='$200000' className="col-span-3" />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            <Input id="image" type='file' {...register("image")} placeholder='fill with your image' className="col-span-3" />
            {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea placeholder='Type your description' {...register("description")} className="col-span-3" />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
        </div>
        <SheetFooter> 
          <SheetClose asChild>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader className="animate-spin"/> : "Add Product"}
            </Button>
          </SheetClose>
        </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
    </div>
    <Table>
    <TableCaption>A list of your products.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">Id</TableHead>
        <TableHead className="w-[100px]">Title</TableHead>
        <TableHead className="w-[100px]">Price</TableHead>
        <TableHead className="w-[150px]">Image</TableHead>
        <TableHead className="w-[150px]">Description</TableHead>
        <TableHead className="w-[150px]">Action</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody> 
      {data?.data?.map((items: any) => (
      <TableRow key={items.id}>
          <TableCell>{items.id}</TableCell>
          <TableCell className="font-medium">{items.title}</TableCell>
          <TableCell>{items.price}</TableCell>
          <TableCell>
            <Image src={items.image} alt="cars" width={86} height={86} className='rounded-full'/>
          </TableCell>
          <TableCell>{items.description}</TableCell>
          <TableCell className="text-right flex flex-row gap-2">
            <Button variant="outline" onClick={() => onSelectProduct(items)}>Edit</Button>
            <Button variant="destructive" onClick={() => deleteProducts(items.id)}>Delete</Button>
          </TableCell>
      </TableRow>
       ))}
    </TableBody>
  </Table>    

            {/* sheet untuk edit product */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent>
                    <form onSubmit={editHandleSubmit(onSubmitUpdateProduct)}>
                        <SheetHeader>
                            <SheetTitle>Edit Product</SheetTitle>
                            <SheetDescription>Modify your product details and click save.</SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            <Label>Title</Label>
                            <Input {...editRegister("title")} className="col-span-3" />
                            {editErrors.title && <p className="text-red-500 text-sm">{editErrors.title.message}</p>}
                            
                            <Label>Price</Label>
                            <Input type='number' {...editRegister("price", { valueAsNumber: true })} className="col-span-3" />
                            {editErrors.price && <p className="text-red-500 text-sm">{editErrors.price.message}</p>}
                            
                            <Label>Description</Label>
                            <Textarea {...editRegister("description")} className="col-span-3" />
                            {editErrors.description && <p className="text-red-500 text-sm">{editErrors.description.message}</p>}
                        </div>
                        <SheetFooter>
                          <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                          </SheetClose>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
    </div>
  )
}

export default Products