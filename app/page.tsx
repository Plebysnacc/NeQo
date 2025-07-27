"use client"

import {Card, CardContent, CardDescription, CardTitle} from "@/components/ui/card";
import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import QRCode from "qrcode";
import {Button} from "@/components/ui/button";
import {Download} from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("https://example.com/qr");
  const [image, setImage] = useState("");

  function handleURLChange(newUrl: string) {
    if (newUrl !== "") setUrl(newUrl);
  }

  async function handleDownload() {
    const link = document.createElement('a');
    link.href = image;
    link.download = 'qqr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  useEffect(() => {
    const createImage = async () => {
      const dataUrl = await QRCode.toDataURL(url, {margin: 0})
      setImage(dataUrl);
      await QRCode.toCanvas(document.getElementById("qr-code-canvas"), url, {
        width: 164,
        margin: 0
      })
    }

    void createImage()
  }, [url])

  return (
    <div className={'w-full h-full flex justify-center items-center'}>
      <Card className="min-w-fit">
        <CardContent className={'flex gap-8 flex-wrap'}>
          <div className={' flex flex-col justify-evenly items-start gap-4 grow'}>
            <div className={'flex flex-col'}>
              <CardTitle>Enter the URL</CardTitle>
              <CardDescription>Enter the URL for the website you want as a QR-Code here</CardDescription>
            </div>

            <div className={'flex flex-col gap-2 w-full'}>
              <Input
                className={'w-full'}
                placeholder={'https://example.com/qr'}
                onChange={event => handleURLChange(event.target.value)}
              />
              <Button className={'w-full'} onClick={handleDownload}>
                <Download/> Download
              </Button>
            </div>

          </div>

          <canvas id={'qr-code-canvas'} className={'rounded-2xl'}/>
        </CardContent>
      </Card>
    </div>
  );
}
