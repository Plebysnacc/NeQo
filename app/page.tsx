"use client"

import {Card, CardContent, CardDescription, CardTitle} from "@/components/ui/card";
import React, {useEffect, useState} from "react";
import QRCode from "qrcode";
import Canvas from "@/components/canvas";
import UrlForm from "@/components/forms/url-form";

const MAX_LENGTH = 120;

export default function Home() {
  const [url, setUrl] = useState("https://example.com/qr");
  const [image, setImage] = useState("");

  function handleURLChange(newUrl: string) {
    const shortenedUrl = newUrl.slice(0, MAX_LENGTH)
    if (shortenedUrl !== "") setUrl(shortenedUrl);
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
      const dataUrl = await QRCode.toDataURL(url, {
        margin: 0,
        errorCorrectionLevel: "medium"
      });
      setImage(dataUrl);
      await QRCode.toCanvas(document.getElementById("qr-code-canvas"), url, {
        margin: 0,
        width: 164
      });
    }

    void createImage()
  }, [url])

  return (
    <div className={'grow w-full flex justify-center items-center'}>
      <Card className="w-full m-2 md:w-1/2">
        <CardContent className={'flex gap-8 flex-wrap'}>
          <div className={' flex flex-col justify-evenly items-start grow'}>
            <CardTitle>Enter URL</CardTitle>
            <CardDescription className={'mb-4'}>
              Enter the url which should be encoded into the QR-Code
            </CardDescription>

            <UrlForm handleURLChange={handleURLChange} url={url} handleDownload={handleDownload}/>
          </div>

          <Canvas/>
        </CardContent>
      </Card>
    </div>
  );
}
