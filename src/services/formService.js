import { baseService } from "./baseService";

export const formService = {};

formService.getTrackStatus = getTrackStatus;

async function getTrackStatus(params) {
  let url = "/trackStatus";
  return await baseService.get(url, params);
}
