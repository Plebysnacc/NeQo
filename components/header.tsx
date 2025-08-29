"use client"

import {Button} from "@/components/ui/button";
import {Bug, Moon, Sun} from "lucide-react";
import {useEffect, useState} from "react";
import {useTheme} from "next-themes";
import Link from "next/link"
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";

function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={'flex items-center w-[90px]'}
    >
      {theme === "light" ? (
        <><Sun/>Light</>
      ) : (
        <><Moon/>Dark</>
      )}
    </Button>
  )
}

export default function Header() {
  return (
    <div className={'w-full p-4 flex justify-end items-center gap-4'}>
      <ThemeSwitch />
      <Tooltip delayDuration={1000}>
        <TooltipTrigger asChild>
          <Link href={'https://github.com/Plebysnacc/NeQo/issues'} referrerPolicy={"no-referrer"}>
            <Bug className={'stroke-muted-foreground'}/>
          </Link>
        </TooltipTrigger>
        <TooltipContent className={'mt-4'}>
          Report a bug!
        </TooltipContent>
      </Tooltip>

    </div>
  )
}