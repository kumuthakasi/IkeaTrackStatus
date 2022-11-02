import { baseService } from "./baseService";

export const formService = {};

formService.getTrackStatus = getTrackStatus;

async function getTrackStatus(params) {
  let url = "/findorder";
  return await baseService.post(url, params);
}
