import service from "@/utils/axios";

export function ApiCreateOrder(data) {
  return service({
    url: "/order",
    method: "post",
    data,
  });
}
