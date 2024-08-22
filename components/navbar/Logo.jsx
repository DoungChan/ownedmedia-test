'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
const Logo = ({logoText, lang}) => {
  const router = useRouter()
  return (
    <div
    className="w-fi p-2 cursor-pointer"
    onClick={() => router.push(`/${lang}`)}
 >
    <h1 className="text-sm sm:text-2xl">{logoText}</h1>
 </div>
  )
}

export default Logo