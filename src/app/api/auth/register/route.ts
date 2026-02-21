import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  // Will contain data we are sending through the post request to the database
  try {
    const body = await req.json(); // Whatever parameters are passed in the request are received by this body:
    const email = (body.email ?? "").toLowerCase().trim();
    const password = body.password ?? "";
    const name = body.name ?? "";
    const username = body.username ?? "";

    // basic server validation to check if required fields present
    if (!name || !email || !password || !username) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Check for existing user with same email or username
    // Need to first setup prisma client to connect to database and perform queries.
    const existingUser = await prisma.user.findFirst({
      // Since this is js and the variable names are same as the field names in the database,
      // we don't ne email: email and username: username
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email or username already exists" },
        { status: 409 },
      );
    }

    // if user is unique, then hash password, first installing bcryptjs library
    const hashedPassword = await hash(password, 10);

    // create new user in database with prisma client
    await prisma.user.create({
      data: {
        name,
        email,
        username,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 },
    );
    
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
