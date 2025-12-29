import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div className='border-2 space-x-4 text-center font-bold '>
            <Link href={"/"}>Home </Link>
            <Link href={"/public"}>Public</Link>
            <Link href={"/private"}>Private</Link>
            <Link href={"/admin"}>Admin</Link>
            
        </div>
    );
};

export default Navbar;