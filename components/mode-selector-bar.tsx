import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {AtSign, Link, Wifi} from "lucide-react";
import React from "react";
import {NeqoMode} from "@/lib/types";

interface ModeSelectorBarProps {
  mode: NeqoMode,
  setMode: React.Dispatch<React.SetStateAction<NeqoMode>>
}

export default function ModeSelectorBar({mode, setMode}: ModeSelectorBarProps) {
  return (
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
      <Button
        variant={'ghost'}
        className={cn('rounded-none grow', mode === "bluesky" && 'bg-accent/50')}
        onClick={() => setMode("bluesky")}
      >
        <AtSign/>
        Bluesky
      </Button>
    </div>
  )
}