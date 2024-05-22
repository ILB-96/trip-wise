import Link from "next/link";
import React from "react";

const Licensing = () => {
  return (
    <div className="font-inter lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 dark:text-white pb-4">
          Licensing Information
        </h1>
        <p className="font-normal text-base leading-6 text-gray-600 dark:text-white mb-4">
          Welcome to our app. Please read the following information carefully to
          understand the licensing terms and conditions under which you are
          allowed to use our services.
        </p>

        <h2 className="text-2xl font-semibold leading-8 text-gray-800 dark:text-white mt-8">
          License Overview
        </h2>
        <p className="font-normal text-base leading-6 text-gray-600 dark:text-white mb-4">
          Our app is licensed under the MIT license. This means that you are
          free to use, modify, and distribute the software under the terms of
          the MIT license. Please ensure that you comply with all the terms and
          conditions outlined in the license.
        </p>

        <h2 className="text-2xl font-semibold leading-8 text-gray-800 dark:text-white mt-8">
          Terms of Use
        </h2>
        <p className="font-normal text-base leading-6 text-gray-600 dark:text-white mb-4">
          By using this app, you agree to the following terms of use:
          <ul className="list-disc pl-5">
            <li className="mb-2">
              You will not use the app for any illegal activities.
            </li>
            <li className="mb-2">
              You will not distribute any harmful content through the app.
            </li>
            <li className="mb-2">
              You will respect the intellectual property rights of others.
            </li>
            <li className="mb-2">
              You will comply with all applicable laws and regulations.
            </li>
          </ul>
        </p>

        <h2 className="text-2xl font-semibold leading-8 text-gray-800 dark:text-white mt-8">
          Attribution
        </h2>
        <p className="font-normal text-base leading-6 text-gray-600 dark:text-white mb-4">
          If you use our app or any part of its codebase in your projects, we
          kindly ask that you provide proper attribution to our team and include
          a link to our website.
        </p>

        <h2 className="text-2xl font-semibold leading-8 text-gray-800 dark:text-white mt-8">
          Contact Information
        </h2>
        <p className="font-normal text-base leading-6 text-gray-600 dark:text-white">
          If you have any questions about the licensing terms or need further
          clarification, please feel free to{" "}
          <Link
            href="/contact"
            className="text-blue-500 underline me-4 md:me-6"
          >
            contact us
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Licensing;
