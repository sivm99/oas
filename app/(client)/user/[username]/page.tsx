"use client";

import UserField from "./User/UserField";
import RuleFields from "./Rules/RuleField";
import DestinationField from "./Destinations/DestinationField";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

function DashBoard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <motion.main
        className="dash_wrapper"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="dash_child" variants={childVariants}>
          <UserField />
        </motion.div>
        <motion.div variants={childVariants}>
          <Separator className="w-1/2" />
        </motion.div>
        <motion.div className="dash_child" variants={childVariants}>
          <RuleFields />
        </motion.div>
        <motion.div variants={childVariants}>
          <Separator className="w-1/2" />
        </motion.div>
        <motion.div className="dash_child" variants={childVariants}>
          <DestinationField />
        </motion.div>
      </motion.main>
    </>
  );
}

export default DashBoard;
