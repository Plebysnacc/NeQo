import {Input} from "@/components/ui/input";
import React, {useEffect, useState} from "react";
import {defaultURL} from "@/lib/defaults";
import Canvas from "@/components/canvas";

interface UrlFormProps {
  setQrCodeText: React.Dispatch<React.SetStateAction<string>>;
}

export default function UrlForm({setQrCodeText}: UrlFormProps) {
  const MAX_LENGTH = 120;
  const [url, setUrl] = useState(defaultURL);

  useEffect(() => {
    setQrCodeText(url)
  }, [url])

  return (
    <div className={'flex flex-wrap items-center gap-12 w-full'}>
      <div className={'flex flex-col gap-2 grow'}>
        <Input
          className={'w-full mb-1'}
          placeholder={'https://example.com/qr'}
          maxLength={MAX_LENGTH}
          onChange={event => setUrl(event.target.value.slice(0, MAX_LENGTH))}
        />

        <p className={'text-muted-foreground w-full text-right text-xs'}>
          {url.length} / {MAX_LENGTH}
        </p>
      </div>

      <Canvas />
    </div>
  )
}