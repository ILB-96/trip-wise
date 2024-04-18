import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import React from "react";

function RegisterForm() {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Clicked on register form thing");
  };
  return (
    <form className="space-y-12 w-[400px]">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" />
      </div>
      <div className="w-full">
        <Button className="w-full" size="lg">
          Register
        </Button>
      </div>
    </form>
  );
}

export default RegisterForm;
