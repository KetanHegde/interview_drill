// NOTE: Hit http://localhost:4000/api/drills in your browser, copy any drill _id, and replace it below in the script
import http from "k6/http";
import { sleep } from "k6";

export let options = {
  vus: 100,
  duration: "60s",
};

export default function () {
  http.get("http://localhost:4000/api/drills");
  http.get("http://localhost:4000/api/drills/68c7136136b7a15bebfa3350");
  sleep(1);
}
