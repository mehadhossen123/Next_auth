'use client'
import React from 'react';
import {  signIn } from "next-auth/react";

const LoginButton = () => {
    return <button className='btn' onClick={()=>signIn()}>Login now </button>
};

export default LoginButton;