"use client";

import { useState, useRef } from "react";

export const ContactUs = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [disabled, setDisabled] = useState(false);
  const formRef = useRef(null);

  const onContactFormSubmit = async (e) => {
    e.preventDefault();
    const formData = {};
    const elements = e.currentTarget.elements;

    // Check if all fields are filled
    let allFieldsFilled = true;
    Array.from(elements).forEach((field) => {
      if (!field.name) return;
      formData[field.name] = field.value;
      if (field.value.trim() === "") {
        allFieldsFilled = false;
      }
    });

    if (!allFieldsFilled) {
      setMessage("Please fill all fields");
      setStatus("error");
      return;
    }

    await fetch("/api/sendgrid", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => {
        setMessage(res.message);
        setStatus(res.status);
        setDisabled(res.message.length > 0);
        if (res.status === "success") {
          formRef.current.reset();
        }
      });
  };

  return (
    <>
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4 pt-10 lg:px-40 bg-blue-50 dark:bg-blue-900 md:h-96">
        <div className="mx-auto mb-10 md:mt-20">
          <div className="badge bg-green-500 inline-block rounded-xl">
            <p className="font-light text-base px-4 py-1 text-gray-50">
              Lets talk
            </p>
          </div>
          <h1 className="text-4xl font-bold mt-4 dark:text-gray-50 text-gray-700">
            Lets talk about your projects.
          </h1>
          <p className="text-sm text-gray-700 mt-4 font-light dark:text-gray-200">
            Fill the form and send in your queries. I will respond as soon as I
            can. Alternatively, You can reach out to me at my email address.
          </p>
        </div>
        <form
          ref={formRef}
          className="rounded-lg shadow-xl flex flex-col px-8 py-8 bg-white dark:bg-blue-500"
          onSubmit={onContactFormSubmit}
        >
          <h1 className="text-2xl font-bold dark:text-gray-50">
            Send a message
          </h1>

          <label
            htmlFor="fullName"
            className="text-gray-500 font-light mt-8 dark:text-gray-50"
          >
            Full name
            <span className="text-red-500 dark:text-gray-50">*</span>
          </label>
          <input
            type="text"
            className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
            name="fullName"
            id="fullName"
            required
            disabled={disabled}
          />

          <label
            htmlFor="email"
            className="text-gray-500 font-light mt-8 dark:text-gray-50"
          >
            Email
            <span className="text-red-500 dark:text-gray-50">*</span>
          </label>
          <input
            type="email"
            className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
            name="email"
            id="email"
            required
            disabled={disabled}
          />

          <label
            htmlFor="subject"
            className="text-gray-500 font-light mt-8 dark:text-gray-50"
          >
            Subject
            <span className="text-red-500 dark:text-gray-50">*</span>
          </label>
          <input
            type="text"
            className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
            name="subject"
            id="subject"
            required
            disabled={disabled}
          />

          <label
            htmlFor="message"
            className="text-gray-500 font-light mt-8 dark:text-gray-50"
          >
            Message
            <span className="text-red-500 dark:text-gray-50">*</span>
          </label>
          <textarea
            className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500"
            name="message"
            id="message"
            required
            disabled={disabled}
          ></textarea>

          <div className="flex flex-row items-center justify-start">
            <button
              type="submit"
              className={`px-10 mt-8 py-2 bg-[#130F49] text-gray-50 font-light rounded-md text-lg flex flex-row items-center ${
                disabled ? "btn-disabled" : "btn-primary"
              }`}
              disabled={disabled}
            >
              Send Message
            </button>
          </div>
          <div className="text-left">
            {message.length > 0 ? (
              <div
                className={`text-green-500 font-semibold text-sm my-2 ${
                  status === "success" ? "alert-success" : "alert-error"
                }`}
              >
                <span>{message}</span>
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </>
  );
};
