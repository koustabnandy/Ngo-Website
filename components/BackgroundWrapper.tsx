"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import the 3D background to avoid SSR issues
const BackgroundAnimation = dynamic(
  () => import("@/components/BackgroundAnimation"),
  { ssr: false }
);

const BackgroundWrapper = () => {
  // Temporarily disable the background animation to fix the maximum update depth exceeded error
  return null;
};

export default BackgroundWrapper;