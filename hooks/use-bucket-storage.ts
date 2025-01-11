"use client"

import { useState, useEffect } from "react"
import { getBucketSize } from "@/lib/s3-utils"

export function useBucketStorage() {
  const [storage, setStorage] = useState({
    usedSpace: "0",
    totalSpace: "100",
    percentage: 0,
  })

  useEffect(() => {
    const fetchBucketSize = async () => {
      try {
        const size = await getBucketSize()
        const usedGB = (size / (1024 * 1024 * 1024)).toFixed(2)
        const percentage = (parseFloat(usedGB) / 100) * 100
        setStorage({
          usedSpace: usedGB,
          totalSpace: "100",
          percentage: percentage,
        })
      } catch (error) {
        console.error("Error fetching bucket size:", error)
      }
    }

    fetchBucketSize()
  }, [])

  return storage
}

