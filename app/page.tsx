"use client"

import {Card, CardContent} from "@/components/ui/card";
import React, {useEffect, useState} from "react";
import UrlForm from "@/components/forms/url-form";
import {defaultBskyUser, defaultURL, defaultWifiObject} from "@/lib/defaults";
import {CodeMode, NeqoMode} from "@/lib/types";
import {createQrCodeTextFromWifiObject} from "@/lib/utils";
import WifiForm from "@/components/forms/wif-form";
import {Button} from "@/components/ui/button";
import {Download} from "lucide-react";
import BlueskyForm from "@/components/forms/bluesky-form";
import ModeSelectorBar from "@/components/mode-selector-bar";
import CodeModeSelectorBar from "@/components/code-mode-selector-bar";
import {createDmc, createQRCode} from "@/lib/code-generation";


export default function Home() {
  const [qrImage, setQrImage] = useState("");
  const [qrText, setQrText] = useState(defaultURL);
  const [mode, setMode] = useState<NeqoMode>("url");
  const [codeMode, setCodeMode] = useState<CodeMode>("qr");

  async function handleDownload() {
    const link = document.createElement('a');
    link.href = qrImage;
    link.download = 'code-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  useEffect(() => {
    switch (mode) {
      case "url" : {
        setQrText(defaultURL);
        return
      }
      case "wifi": {
        setQrText(createQrCodeTextFromWifiObject(defaultWifiObject));
        return
      }
      case "bluesky": {
        setQrText(defaultBskyUser);
        return
      }
    }
  }, [mode]);

  useEffect(() => {
    const handleImageCreation = async () => {
      const canvas = document.getElementById('qr-code-canvas')
      switch (codeMode) {
        case "qr": {
          const newQrImage = await createQRCode(qrText, canvas)
          if (newQrImage) setQrImage(newQrImage);
          return
        }
        case "dmc": {
          const newDmcImage = await createDmc(qrText, canvas as HTMLCanvasElement);
          if (newDmcImage) setQrImage(newDmcImage.uri)
          return
        }
      }
    }

    void handleImageCreation();
  }, [qrText, codeMode])

  return (
    <div className={'grow w-full flex justify-center items-center'}>
      <Card className="w-full m-2 md:w-1/2">
        <CardContent className={'flex gap-8 flex-wrap'}>
          <div className={'w-full flex flex-col gap-2'}>
            <CodeModeSelectorBar codeMode={codeMode} setCodeMode={setCodeMode}/>
            <ModeSelectorBar mode={mode} setMode={setMode}/>
          </div>


          <div className={'flex flex-col justify-evenly items-start grow gap-8'}>
            {mode === "url" && (<UrlForm setQrCodeText={setQrText}/>)}
            {mode === "wifi" && (<WifiForm setQrCodeText={setQrText}/>)}
            {mode === "bluesky" && (<BlueskyForm setQrCodeText={setQrText}/>)}
            <Button className={'w-full'} onClick={handleDownload}>
              <Download/> Download
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
