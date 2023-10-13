import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import { NextRequest, NextResponse } from "next/server";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ]
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
// Explicitly specify the types for handler
// const GET = (req: NextRequest, res: NextResponse) => handler(req, res);
// const POST = (req: NextRequest, res: NextResponse) => handler(req, res);

// export { GET, POST };
