import service from "@/utils/axios";

export function ApiLogin(data) {
  return service({
    url: "/auth/login",
    method: "post",
    data,
  });
}

export function ApiCheckPackage(words) {
  return service({
    url: "/user/check-package/" + words,
    method: "get",
  });
}

export function ApiGetLimit() {
  return service({
    url: "/user",
    method: "get",
  });
}
