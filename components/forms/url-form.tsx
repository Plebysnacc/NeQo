import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Download} from "lucide-react";
import React from "react";

interface UrlFormProps {
  handleURLChange: (value: string) => void;
  url: string;
  handleDownload: () => void;
}

export default function UrlForm ({handleURLChange, url, handleDownload}: UrlFormProps) {
  const MAX_LENGTH = 120;

  return (
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
  )
}