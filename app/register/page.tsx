import RegisterForm from "@components/RegisterForm";
import Link from "next/link";
import React from "react";

function Register() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="shadow-xl px-8 pb-8 pt-12 bg-white rounded-xl space-y-12">
        <h1 className="font-semibold text-2xl">Create an account</h1>
        <RegisterForm />
        <p className="text-center">
          Already have an account?{" "}
          <Link className="text-indigo-500 hover:underline" href="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
