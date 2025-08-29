import React from "react";

export default function Canvas() {
  return (
    <div className="flex justify-center items-center grow basis-48 shrink-0">
      <canvas
        id="qr-code-canvas"
        className="rounded-lg dark:border-muted-foreground dark:border-1"
      />
    </div>
  )
}