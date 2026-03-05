import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Online Shop",
  description:
    "Sign in to your Online Shop account to manage your orders, view your cart, and continue shopping.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
