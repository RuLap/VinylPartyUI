"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface RotatingImageProps {
    src: string;
    width: number;
    height: number;
}

export default function RotatingImage({src, width, height}: RotatingImageProps) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
    >
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
      />
    </motion.div>
  );
}
