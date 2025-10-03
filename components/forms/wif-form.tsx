import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {createQrCodeTextFromWifiObject} from "@/lib/utils";
import {defaultWifiObject} from "@/lib/defaults";
import {WifiEncoding, WifiObject} from "@/lib/types";
import Canvas from "@/components/canvas";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface WifiFormProps {
  setQrCodeText: React.Dispatch<React.SetStateAction<string>>;
}

export default function WifiForm({setQrCodeText}: WifiFormProps) {
  const MAX_LENGTH_SSID = 120
  const [wifiObject, setWifiObject] = useState<WifiObject>(defaultWifiObject);

  useEffect(() => {
    setQrCodeText(createQrCodeTextFromWifiObject(wifiObject));
  }, [wifiObject, wifiObject.encoding, wifiObject.ssid, wifiObject.password, wifiObject.hidden, setQrCodeText])

  return (
    <div className={'flex flex-wrap items-center gap-12 w-full'}>
      <div className={'flex flex-col gap-2 grow'}>
        {/*Encryption Input*/}
        <div>
          <p className={'font-bold text-muted-foreground text-sm mb-2'}>Encryption</p>
          <Select
            onValueChange={value => setWifiObject(prevState => ({
              ...prevState,
              encoding: value as WifiEncoding
            }))}
          >
            <SelectTrigger defaultValue={"WPA3"} className="w-full">
              <SelectValue placeholder={wifiObject.encoding}/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="WPA3">WPA3</SelectItem>
                <SelectItem value="WPA2">WPA2</SelectItem>
                <SelectItem value="WPA">WPA</SelectItem>
                <SelectItem value="WEP">WEP</SelectItem>
                <SelectItem value="nopass">nopass</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/*SSID Input*/}
        <div>
          <p className={'font-bold text-muted-foreground text-sm mb-2'}>Network Name (SSID)</p>
          <Input
            className={'w-full mb-1'}
            placeholder={'Wifi-Network'}
            maxLength={MAX_LENGTH_SSID}
            onChange={event => setWifiObject(prevState => ({
              ...prevState,
              ssid: event.target.value
            }))}
          />
          <p className={'text-muted-foreground w-full text-right text-xs'}>
            {wifiObject.ssid.length} / {MAX_LENGTH_SSID}
          </p>
        </div>

        {/*Password Input*/}
        <div>
          <p className={'font-bold text-muted-foreground text-sm mb-2'}>Password</p>
          <Input
            className={'w-full mb-1'}
            placeholder={'Password'}
            maxLength={MAX_LENGTH_SSID}
            onChange={event => setWifiObject(prevState => ({
              ...prevState,
              password: event.target.value
            }))}
          />
        </div>
      </div>

      <Canvas/>
    </div>
  )
}