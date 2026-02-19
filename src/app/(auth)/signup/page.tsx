import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import SignupComponent from "../../../components/auth/SignupComponent";

// server component that implements my client component for sign up page
export default async function SignupPage() {
  const session = await auth();

  if (session) {
    redirect("/home");
  }

  return <SignupComponent />;
}
