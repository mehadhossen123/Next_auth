'use client'

import { SessionProvider } from "next-auth/react";


const nextAuthProvider = ({children}) => {
    return (
        <SessionProvider>{children}</SessionProvider>
    );
};

export default nextAuthProvider;