import service from "@/utils/axios";

export function ApiGetAllVocab() {
  return service({
    url: "/vocabulary",
    method: "get",
  });
}
export function ApiCreateVocab(data) {
  return service({
    url: "/vocabulary",
    method: "post",
    data,
  });
}

export function ApiUpdateVocab(id, data) {
  return service({
    url: "/vocabulary/" + id,
    method: "put",
    data,
  });
}

export function ApiDeleteVocab(id) {
  return service({
    url: "/vocabulary/" + id,
    method: "delete",
  });
}

export function ApiDeleteManyVocab(data) {
  return service({
    url: "/vocabulary/by-ids",
    method: "post",
    data,
  });
}

export function ApiImportVocab(file) {
  const formData = new FormData();
  formData.append("file", file);

  return service({
    url: "/vocabulary/upload",
    method: "post",
    data: formData,
    headers: {},
  });
}
