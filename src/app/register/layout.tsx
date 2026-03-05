import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | Online Shop",
  description:
    "Create an Online Shop account to start shopping, manage your cart, and track your orders easily.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
