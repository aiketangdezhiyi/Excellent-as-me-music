import request from "./request";

export async function getHotStar() {
  return request.get("/api/home/hot/star");
}

export async function getTopSong() {
  return request.get("/api/home/top/song");
}

export async function getLightStar() {
  return request.get("/api/home/light/star");
}

export async function getRecentSong(params) {
  return request.get("/api/home/recent/song", {
    params,
  });
}
