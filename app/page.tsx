"use client"

import {Card, CardContent, CardDescription, CardTitle} from "@/components/ui/card";
import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import QRCode from "qrcode";
import {Button} from "@/components/ui/button";
import {Download} from "lucide-react";

const MAX_LENGTH = 1500;

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
          <div className={' flex flex-col justify-evenly items-start gap-4 grow'}>
            <div className={'flex flex-col'}>
              <CardTitle>Enter TextL</CardTitle>
              <CardDescription>Enter the text which should be encoded into the QR-Code</CardDescription>
            </div>

            <div className={'flex flex-col gap-2 w-full'}>
              <div>
                <Input
                  className={'w-full mb-1'}
                  placeholder={'https://example.com/qr'}
                  maxLength={MAX_LENGTH}
                  onChange={event => handleURLChange(event.target.value)}
                />

                <p className={'text-muted-foreground w-full text-right text-xs'}>
                  {url.length} / {MAX_LENGTH}
                </p>
              </div>

              <Button className={'w-full'} onClick={handleDownload}>
                <Download/> Download
              </Button>
            </div>
          </div>

          <div className="flex justify-center grow basis-48">
            <canvas
              id="qr-code-canvas"
              className="rounded-lg dark:border-muted-foreground dark:border-1"
            />
          </div>


        </CardContent>
      </Card>
    </div>
  );
}
