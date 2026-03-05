import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Online Shop",
  description:
    "Review your selected items and complete your purchase securely.",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
