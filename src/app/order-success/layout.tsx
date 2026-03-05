import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Complete | Online Shop",
  description:
    "Your order has been successfully placed. Thank you for shopping with Online Shop.",
};

export default function OrderSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
