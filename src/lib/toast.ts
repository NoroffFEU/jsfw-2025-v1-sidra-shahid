export type ToastType = "success" | "error" | "info";
export type ToastTarget = "header" | "auth";

export function showToast(
  message: string,
  type: ToastType = "info",
  target: ToastTarget = "header",
) {
  window.dispatchEvent(
    new CustomEvent("showToast", {
      detail: { message, type, target },
    }),
  );
}
