
import { Metadata } from "next";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import Dashboard from "@/components/Dashboard";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
         <Dashboard></Dashboard>
      </DefaultLayout>
    </>
  );
}
