"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginSchema } from "@/features/auth/schema/AuthSchemas";
import { useLogin } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const { mutate: Login } = useLogin();
  const { toast } = useToast();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const validateUser = LoginSchema.parse(formData);
      Login(validateUser, {
        onSuccess(data) {
          if (data.role !== "admin") {
            toast({
              title: "Access denied",
              description: "only admin can access this page",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Successfully",
              description: "Welcome back admin",
            });
            sessionStorage.setItem('value-data-role-user', data.role);
            router.push("/");
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError(err: any){
          toast({
            title: "Error",
            variant: "destructive",
            description: err.response.data.msg
          })
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ml-96">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>{`Welcome back to admin dashboard!`}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="****"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit">
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;
