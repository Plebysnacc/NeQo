export type NeqoMode = "wifi" | "url" | "bluesky"

export type WifiEncoding = "nopass" | "WEP" | "WPA" | "WPA2" | "WPA3"

export type WifiObject = {
  encoding: WifiEncoding,
  ssid: string,
  password: string,
  hidden: boolean,
}