import { getToken } from "next-auth/jwt";

import { NextResponse } from "next/server";
const privateRoute=["/private","/dashboard","/secret"]
const adminRoute=["/dashboard"];


// This function can be marked `async` if using `await` inside
export async function proxy(req) {
      const reqPath = req.nextUrl.pathname;
       console.log(reqPath);
    const token=await getToken({req})
  
   const isPrivate=privateRoute.some((r)=>reqPath.startsWith(r))
    const isLogin=Boolean(token)
    const isUser=token?.role==="user";
    const isAdmin=token?.role==="admin"
    const isAdminRoute=adminRoute.some(r=>reqPath.startsWith(r))


    // logic for only private route 
    if(!isLogin&& isPrivate){
        const loginUrl = new URL("/api/auth/signin", req.url);
        loginUrl.searchParams.set("callbackUrl",reqPath)
        return NextResponse.redirect(loginUrl)
    }

    // login for only admin route 
    if(isLogin&& !isAdmin && isAdminRoute){
        return NextResponse.redirect(new URL("/forbidden",req.url))

    }
//   return NextResponse.redirect(new URL("/home", request.url));
return NextResponse.next()
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: ["/private/:path*", "/dashboard/:path*", "/secret/:path*"],
};
