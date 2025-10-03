import React from "react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {useCodeMode} from "@/components/provider/code-mode-provider";

export default function CodeModeSelectorBar() {
  const {codeMode, setCodeMode} = useCodeMode()

  return (
    <div className={'w-full flex gap-0 border rounded-lg'}>
      <Button
        variant={'ghost'}
        className={cn('rounded-none grow', codeMode === "qr" && 'bg-accent/50')}
        onClick={() => setCodeMode("qr")}
      >
        QR-Code
      </Button>
      <Button
        variant={'ghost'}
        className={cn('rounded-none grow', codeMode === "dmc" && 'bg-accent/50')}
        onClick={() => setCodeMode("dmc")}
      >
        DMC
      </Button>
    </div>
  )
}