import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {WifiObject} from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createQrCodeTextFromWifiObject(wifiObject: WifiObject) {
  const encoding = `T:${wifiObject.encoding};`
  const ssid = `S:${wifiObject.ssid};`
  const password = `P:${wifiObject.password};`
  const hidden = `H:${wifiObject.hidden};`
  return 'WIFI:' + encoding + ssid + password + hidden + ";"
}
