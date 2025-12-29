'use client'
import React from 'react';
import {  signIn } from "next-auth/react";

const LoginButton = () => {
    return <button className='btn' onClick={()=>signIn("hello")}>Login now </button>
};

export default LoginButton;