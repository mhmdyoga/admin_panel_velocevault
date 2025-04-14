"use client";
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Dashbord = () => {

  const router = useRouter();
  const {toast} = useToast();

  useEffect(() => {
    const roleUser = sessionStorage.getItem('value-data-role-user');
    if(roleUser !== 'admin'){
      toast({
        title: 'Access Denied!',
        description: 'Please Login before access this page',
        variant: 'destructive'
      })
           // untuk mencegah navigasi sebelum toast tampil
           setTimeout(() => {
            router.push('/auth/sign-in');
          }, 100);
    
    }
  }, [router, toast])
  


  return (
    <div className='p-6'>
        <h1>Dashboard page</h1>
    </div>
  )
}

export default Dashbord