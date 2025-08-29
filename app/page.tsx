"use client"

import {Card, CardContent} from "@/components/ui/card";
import React, {useEffect, useState} from "react";
import QRCode from "qrcode";
import UrlForm from "@/components/forms/url-form";
import {defaultURL, defaultWifiObject} from "@/lib/defaults";
import {NeqoMode} from "@/lib/types";
import {cn, createQrCodeTextFromWifiObject} from "@/lib/utils";
import WifiForm from "@/components/forms/wif-form";
import {Button} from "@/components/ui/button";
import {Download, Link, Wifi} from "lucide-react";


export default function Home() {
  const [qrImage, setQrImage] = useState("");
  const [qrCodeText, setQrCodeText] = useState(defaultURL);
  const [mode, setMode] = useState<NeqoMode>("wifi");

  async function handleDownload() {
    const link = document.createElement('a');
    link.href = qrImage;
    link.download = 'qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  useEffect(() => {
    if (mode === "wifi") setQrCodeText(createQrCodeTextFromWifiObject(defaultWifiObject));
    else setQrCodeText(defaultURL)
  }, [mode]);

  useEffect(() => {
    const createImage = async () => {
      const dataUrl = await QRCode.toDataURL(qrCodeText, {
        margin: 0,
        errorCorrectionLevel: "medium"
      });
      setQrImage(dataUrl);
      await QRCode.toCanvas(document.getElementById("qr-code-canvas"), qrCodeText, {
        margin: 0,
        width: 164
      });
    }
    console.log("triggering rerender")
    void createImage()
  }, [qrCodeText])

  return (
    <div className={'grow w-full flex justify-center items-center'}>
      <Card className="w-full m-2 md:w-1/2">
        <CardContent className={'flex gap-8 flex-wrap'}>
          <div className={'w-full flex gap-0 border rounded-lg'}>
            <Button
              variant={'ghost'}
              className={cn('rounded-none grow', mode === "url" && 'bg-accent/50')}
              onClick={() => setMode("url")}
            >
              <Link/>
              URL
            </Button>
            <Button
              variant={'ghost'}
              className={cn('rounded-none grow', mode === "wifi" && 'bg-accent/50')}
              onClick={() => setMode("wifi")}
            >
              <Wifi/>
              WIFI
            </Button>
          </div>

          <div className={'flex flex-col justify-evenly items-start grow gap-8'}>
            {mode === "url" && (<UrlForm setQrCodeText={setQrCodeText}/>)}
            {mode === "wifi" && (<WifiForm setQrCodeText={setQrCodeText}/>)}
            <Button className={'w-full'} onClick={handleDownload}>
              <Download/> Download
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
