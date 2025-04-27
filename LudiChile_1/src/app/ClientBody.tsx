"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function ClientBody({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [isFirstMount, setIsFirstMount] = useState(true);

  // Skip animation on first mount/page load
  useEffect(() => {
    setIsFirstMount(false);
  }, []);

  return (
    <body suppressHydrationWarning>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={isFirstMount ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </body>
  );
}
