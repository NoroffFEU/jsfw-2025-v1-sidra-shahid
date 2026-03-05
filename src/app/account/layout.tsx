import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account | Online Shop",
  description:
    "View and manage your Online Shop account details, track your orders, and update your information.",
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
