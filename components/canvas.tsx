import React from "react";
import {cn} from "@/lib/utils";
import {useCodeMode} from "@/components/provider/code-mode-provider";

export default function Canvas() {
  const {codeMode} = useCodeMode()

  return (
    <div
      className={cn(
        "flex justify-center items-center grow basis-48 shrink-0",
        codeMode === "dmc" && "aspect-square"
      )}
    >
      <canvas
        id="qr-code-canvas"
        className={cn(
          "rounded-lg dark:border-muted-foreground dark:border-1 bg-white",
          codeMode === "dmc" && "aspect-square grow"
        )}
      />
    </div>
  )
}