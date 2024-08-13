import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { UserSchema } from '../validations/userSchema';
import { Link, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    photo:  '', 
  };

  const { values, errors, touched, handleSubmit, handleBlur, handleChange, setFieldValue } = useFormik({
    initialValues,
    validationSchema: UserSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append('photo', file);
        formData.append('firstName', values.firstName);
        formData.append('lastName', values.lastName);
        formData.append('email', values.email);
        formData.append('password', values.password);

        const uploadRes = await axios.post(`${import.meta.env.VITE_API_URL}/user_photo`, formData);
        const photoPath = uploadRes.data.file;

        const registerRes = await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
          ...values,
          photo: photoPath,
        });

        if (registerRes.data.success) {
          toast.success(registerRes?.data?.message || "User Registered Successfully");
          resetForm();
          setFile(null);
          setPreviewImage(null);
          navigate('/');
      } else {
          toast.error(registerRes.data.message);
      }
      } catch (err) {
        console.error(err);
        toast.error('An error occurred during registration');
      }
    },
  });

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    setFieldValue('photo', file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: 'image/*',
  });

  return (
    <div
      className="relative min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover items-center"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1621243804936-775306a8f2e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)' }}
    >
      <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
      <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10 overflow-y-scroll max-h-[95vh] no-scrollbar">
        <div className="text-center">
          <h2 className="mt-5 text-3xl font-bold text-gray-900">Register</h2>
          <p className="mt-2 text-sm text-gray-400">Please fill out the form below to join with us.</p>
        </div>
        <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">First Name</label>
            <input
              className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
            />
            {errors.firstName && touched.firstName && <div className="text-red-500 text-sm">{errors.firstName}</div>}
          </div>
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Last Name</label>
            <input
              className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
            />
            {errors.lastName && touched.lastName && <div className="text-red-500 text-sm">{errors.lastName}</div>}
          </div>
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Email</label>
            <input
              className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && <div className="text-red-500 text-sm">{errors.email}</div>}
          </div>
          <div className="grid grid-cols-1 space-y-2">
            <label className="text-sm font-bold text-gray-500 tracking-wide">Password</label>
            <input
              className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && <div className="text-red-500 text-sm">{errors.password}</div>}
          </div>
          {previewImage ? (
            <div className="flex flex-col rounded-lg border-4 border-dashed w-full h-72 p-10 group text-center">
              <img src={previewImage} alt="Preview" className="max-w-full max-h-40 mb-4" />
              <button
                type="button"
                onClick={() => {
                  setPreviewImage(null);
                  setFile(null);
                  setFieldValue('photo', null);
                }}
                className="mb-4 bg-red-500 text-white p-2 rounded"
              >
                Remove Image
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Photo</label>
              <div
                {...getRootProps()}
                className="flex items-center justify-center w-full rounded-lg border-4 border-dashed h-60 p-10 group text-center"
              >
                <input {...getInputProps()} />
                <div className="h-full w-full text-center flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                    <img className="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="Upload illustration" />
                  </div>
                  <p className="pointer-none text-gray-500">
                    <span className="text-sm">Drag and drop</span> files here <br /> or <a href="#" className="text-blue-600 hover:underline">select a file</a> from your computer
                  </p>
                </div>
              </div>
            </div>
          )}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
            >
              Register
            </button>
          </div>
          <p className="text-black">Already have Account <Link to={"/login"} className="underline text-blue-600">Login</Link> instead.</p>

        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
