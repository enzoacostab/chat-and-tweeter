import AuthPage from "@/components/auth/auth-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return <AuthPage form='login'/>
}
