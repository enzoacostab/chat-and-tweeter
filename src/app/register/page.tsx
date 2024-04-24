import AuthPage from "@/components/auth/auth-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default function Page() {
  return <AuthPage form='register'/>
}
