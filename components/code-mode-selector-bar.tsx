import {CodeMode} from "@/lib/types";
import React from "react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

interface CodeModeSelectorBarProps {
  codeMode: CodeMode
  setCodeMode: React.Dispatch<React.SetStateAction<CodeMode>>
}

export default function CodeModeSelectorBar({codeMode, setCodeMode}: CodeModeSelectorBarProps) {
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