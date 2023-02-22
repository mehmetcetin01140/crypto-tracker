import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type TransitionProps = {
  children: React.ReactNode;
};

const Transition = ({ children }: TransitionProps) => {
  const [show, setShow] = useState<boolean>(false);
  const location = useLocation()
  useEffect(() => {
    setShow(true);
  }, [location]);

  return (
    <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
  >
  
      {show && children}
    </motion.div>
  );
};

export default Transition;