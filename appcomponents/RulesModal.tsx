"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
interface RulesModalProps {
  gameTitle: string;
  rules: string;
}

export default function RulesModal({ gameTitle, rules }: RulesModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        className="rounded-full  "
        onClick={() => setIsOpen(true)}
        aria-label="Open rules"
      >
        <Image src="/icons/question.svg" alt="gamemode dropdown" width="32" height="32" />
      </button>
      <Dialog open={isOpen} onOpenChange={setIsOpen} >
        <DialogContent className="sm:max-w-[425px] border-4 border-sky-200">
          <DialogHeader className=" border-t-sky-200 border-4">
            <DialogTitle className="flex justify-between items-center border-t-2 border-red-400" >
              <div className="flex items-center gap-2">

                {gameTitle}
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Rules</h3>
            <p>{rules}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}