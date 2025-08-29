"use client"

import React, {useEffect} from "react";
import {Input} from "@/components/ui/input";
import Canvas from "@/components/canvas";

interface BlueskyFormProps {
  setQrCodeText: React.Dispatch<React.SetStateAction<string>>;
}

export default function BlueskyForm({setQrCodeText}: BlueskyFormProps) {
  // As by the bsky.app rules
  const MAX_HANDLE_LENGTH = 18;

  const [userHandle, setUserHandle] = React.useState<string>("bsky.app");
  const blueskyPrefix = 'https://bsky.app/profile/'

  useEffect(() => {
    setQrCodeText(blueskyPrefix + userHandle)
  }, [userHandle])

  return (
    <div className={'flex flex-wrap items-center gap-12 w-full'}>
      <div className={'grow flex flex-col gap-2'}>
        <div className={'relative'}>
          <Input
            className={'w-full pl-10'}
            value={userHandle}
            placeholder={'bsky.app'}
            onChange={event => setUserHandle(event.target.value)}
          />
          <span className={'absolute top-[1px] left-[1px] h-[calc(100%-2px)] bg-accent rounded-l-md aspect-square flex justify-center items-center'}>
            @
          </span>
        </div>
        <p className={'text-muted-foreground w-full text-right text-xs'}>
          {userHandle.length} / {MAX_HANDLE_LENGTH}
        </p>

      </div>

      <Canvas/>
    </div>
  )
}