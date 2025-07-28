"use client"

import {Button} from "@/components/ui/button";
import {Moon, Sun} from "lucide-react";
import {useEffect, useState} from "react";
import {useTheme} from "next-themes";

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
    <div className={'w-full p-4 flex justify-end'}>
      <ThemeSwitch />
    </div>
  )
}