"use client"

import { useSession } from "next-auth/react";

const UserCard = () => {
     const session=useSession()
     console.log(session)
    return (
        <div>
            <h1>Client user :{JSON.stringify(session)}</h1>
            
        </div>
    );
};

export default UserCard;