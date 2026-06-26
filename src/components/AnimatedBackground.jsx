import React from "react";
import { motion } from "motion/react";
import {
  Laptop,
  BookOpen,
  Code,
  GraduationCap,
  Brain,
  Award,
  Terminal,
  FileCode,
  FolderGit2,
} from "lucide-react";

export default function AnimatedBackground({ theme, darkMode }) {
  // Define 6 beautiful floating shapes with colors matching the theme
  const getShapes = () => {
    switch (theme) {
      case "neo-cyber":
        return [
          {
            id: 1,
            type: "circle",
            size: "w-24 h-24",
            color: "bg-neo-yellow/20 dark:bg-neo-yellow/10",
            x: "8%",
            y: "12%",
            delay: 0,
          },
          {
            id: 2,
            type: "square",
            size: "w-16 h-16",
            color: "bg-neo-pink/25 dark:bg-neo-pink/15",
            x: "82%",
            y: "20%",
            delay: 1.5,
          },
          {
            id: 3,
            type: "triangle",
            size: "w-28 h-28",
            color: "bg-neo-cyan/20 dark:bg-neo-cyan/10",
            x: "6%",
            y: "68%",
            delay: 4,
          },
          {
            id: 4,
            type: "cross",
            size: "w-14 h-14",
            color: "bg-neo-purple/20 dark:bg-neo-purple/10",
            x: "88%",
            y: "72%",
            delay: 0.5,
          },
          {
            id: 5,
            type: "circle",
            size: "w-20 h-20",
            color: "bg-neo-orange/20 dark:bg-neo-orange/10",
            x: "45%",
            y: "40%",
            delay: 3,
          },
          {
            id: 6,
            type: "square",
            size: "w-12 h-12",
            color: "bg-neo-lime/25 dark:bg-neo-lime/10",
            x: "72%",
            y: "50%",
            delay: 2.5,
          },
        ];
      case "neo-mint":
        return [
          {
            id: 1,
            type: "circle",
            size: "w-24 h-24",
            color: "bg-neo-lime/20 dark:bg-neo-lime/10",
            x: "12%",
            y: "15%",
            delay: 1,
          },
          {
            id: 2,
            type: "square",
            size: "w-20 h-20",
            color: "bg-neo-green/25 dark:bg-neo-green/15",
            x: "85%",
            y: "18%",
            delay: 0,
          },
          {
            id: 3,
            type: "triangle",
            size: "w-24 h-24",
            color: "bg-neo-cyan/20 dark:bg-neo-cyan/10",
            x: "5%",
            y: "72%",
            delay: 3,
          },
          {
            id: 4,
            type: "cross",
            size: "w-12 h-12",
            color: "bg-neo-orange/20 dark:bg-neo-orange/10",
            x: "90%",
            y: "65%",
            delay: 2,
          },
          {
            id: 5,
            type: "circle",
            size: "w-16 h-16",
            color: "bg-neo-yellow/20 dark:bg-neo-yellow/10",
            x: "52%",
            y: "48%",
            delay: 4.5,
          },
          {
            id: 6,
            type: "square",
            size: "w-14 h-14",
            color: "bg-neo-blue/20 dark:bg-neo-blue/10",
            x: "78%",
            y: "52%",
            delay: 1.5,
          },
        ];
      case "neo-sunset":
        return [
          {
            id: 1,
            type: "circle",
            size: "w-28 h-28",
            color: "bg-neo-pink/20 dark:bg-neo-pink/10",
            x: "10%",
            y: "10%",
            delay: 2,
          },
          {
            id: 2,
            type: "square",
            size: "w-16 h-16",
            color: "bg-neo-orange/25 dark:bg-neo-orange/15",
            x: "80%",
            y: "25%",
            delay: 0.5,
          },
          {
            id: 3,
            type: "triangle",
            size: "w-24 h-24",
            color: "bg-neo-purple/20 dark:bg-neo-purple/10",
            x: "8%",
            y: "65%",
            delay: 3.5,
          },
          {
            id: 4,
            type: "cross",
            size: "w-14 h-14",
            color: "bg-neo-yellow/20 dark:bg-neo-yellow/10",
            x: "84%",
            y: "78%",
            delay: 1,
          },
          {
            id: 5,
            type: "circle",
            size: "w-20 h-20",
            color: "bg-neo-blue/20 dark:bg-neo-blue/10",
            x: "48%",
            y: "35%",
            delay: 4,
          },
          {
            id: 6,
            type: "square",
            size: "w-12 h-12",
            color: "bg-neo-cyan/20 dark:bg-neo-cyan/10",
            x: "74%",
            y: "55%",
            delay: 2.5,
          },
        ];
      case "neo-classic":
      default:
        return [
          {
            id: 1,
            type: "circle",
            size: "w-24 h-24",
            color: "bg-neo-purple/15 dark:bg-neo-purple/10",
            x: "7%",
            y: "14%",
            delay: 0,
          },
          {
            id: 2,
            type: "square",
            size: "w-16 h-16",
            color: "bg-neo-yellow/20 dark:bg-neo-yellow/10",
            x: "84%",
            y: "22%",
            delay: 2,
          },
          {
            id: 3,
            type: "triangle",
            size: "w-26 h-26",
            color: "bg-neo-pink/15 dark:bg-neo-pink/10",
            x: "5%",
            y: "60%",
            delay: 4,
          },
          {
            id: 4,
            type: "cross",
            size: "w-12 h-12",
            color: "bg-neo-cyan/20 dark:bg-neo-cyan/10",
            x: "88%",
            y: "70%",
            delay: 1,
          },
          {
            id: 5,
            type: "circle",
            size: "w-20 h-20",
            color: "bg-neo-orange/15 dark:bg-neo-orange/10",
            x: "42%",
            y: "45%",
            delay: 3,
          },
          {
            id: 6,
            type: "square",
            size: "w-14 h-14",
            color: "bg-neo-lime/20 dark:bg-neo-lime/10",
            x: "76%",
            y: "48%",
            delay: 5,
          },
        ];
    }
  };

  // Get theme-adapted text colors for the floating icons
  const getThemeColorClass = (colorName) => {
    switch (theme) {
      case "neo-cyber":
        if (colorName === "yellow")
          return "text-neo-yellow/25 dark:text-neo-yellow/15";
        if (colorName === "pink")
          return "text-neo-pink/25 dark:text-neo-pink/15";
        if (colorName === "cyan")
          return "text-neo-cyan/25 dark:text-neo-cyan/15";
        if (colorName === "purple")
          return "text-neo-purple/25 dark:text-neo-purple/15";
        if (colorName === "orange")
          return "text-neo-orange/25 dark:text-neo-orange/15";
        return "text-neo-lime/25 dark:text-neo-lime/15";
      case "neo-mint":
        if (colorName === "yellow")
          return "text-neo-yellow/25 dark:text-neo-yellow/15";
        if (colorName === "pink")
          return "text-neo-green/25 dark:text-neo-green/15";
        if (colorName === "cyan")
          return "text-neo-cyan/25 dark:text-neo-cyan/15";
        if (colorName === "purple")
          return "text-neo-blue/25 dark:text-neo-blue/15";
        if (colorName === "orange")
          return "text-neo-orange/25 dark:text-neo-orange/15";
        return "text-neo-lime/25 dark:text-neo-lime/15";
      case "neo-sunset":
        if (colorName === "yellow")
          return "text-neo-yellow/25 dark:text-neo-yellow/15";
        if (colorName === "pink")
          return "text-neo-pink/25 dark:text-neo-pink/15";
        if (colorName === "cyan")
          return "text-neo-cyan/25 dark:text-neo-cyan/15";
        if (colorName === "purple")
          return "text-neo-purple/25 dark:text-neo-purple/15";
        if (colorName === "orange")
          return "text-neo-orange/25 dark:text-neo-orange/15";
        return "text-neo-yellow/25 dark:text-neo-yellow/15";
      case "neo-classic":
      default:
        if (colorName === "yellow")
          return "text-neo-yellow/20 dark:text-neo-yellow/10";
        if (colorName === "pink")
          return "text-neo-pink/20 dark:text-neo-pink/10";
        if (colorName === "cyan")
          return "text-neo-cyan/25 dark:text-neo-cyan/15";
        if (colorName === "purple")
          return "text-neo-purple/20 dark:text-neo-purple/10";
        if (colorName === "orange")
          return "text-neo-orange/20 dark:text-neo-orange/10";
        return "text-neo-lime/20 dark:text-neo-lime/10";
    }
  };

  const shapes = getShapes();

  // Floating project-related icons
  const floatingIcons = [
    {
      id: 101,
      Icon: Laptop,
      size: 54,
      colorClass: getThemeColorClass("cyan"),
      x: "18%",
      y: "28%",
      delay: 0.5,
      speed: 20,
    },
    {
      id: 102,
      Icon: BookOpen,
      size: 58,
      colorClass: getThemeColorClass("yellow"),
      x: "88%",
      y: "16%",
      delay: 2,
      speed: 22,
    },
    {
      id: 103,
      Icon: Code,
      size: 48,
      colorClass: getThemeColorClass("pink"),
      x: "12%",
      y: "78%",
      delay: 4.5,
      speed: 24,
    },
    {
      id: 104,
      Icon: GraduationCap,
      size: 62,
      colorClass: getThemeColorClass("purple"),
      x: "78%",
      y: "74%",
      delay: 1,
      speed: 26,
    },
    {
      id: 105,
      Icon: Brain,
      size: 52,
      colorClass: getThemeColorClass("orange"),
      x: "48%",
      y: "15%",
      delay: 3,
      speed: 18,
    },
    {
      id: 106,
      Icon: Award,
      size: 50,
      colorClass: getThemeColorClass("pink"),
      x: "90%",
      y: "44%",
      delay: 5.5,
      speed: 25,
    },
    {
      id: 107,
      Icon: Terminal,
      size: 44,
      colorClass: getThemeColorClass("cyan"),
      x: "42%",
      y: "84%",
      delay: 1.5,
      speed: 21,
    },
    {
      id: 108,
      Icon: FileCode,
      size: 48,
      colorClass: getThemeColorClass("yellow"),
      x: "32%",
      y: "48%",
      delay: 2.5,
      speed: 23,
    },
    {
      id: 109,
      Icon: FolderGit2,
      size: 54,
      colorClass: getThemeColorClass("orange"),
      x: "66%",
      y: "32%",
      delay: 3.5,
      speed: 27,
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. Original floating geometric background shapes */}
      {shapes.map((shape) => {
        let borderRadiusClass = "rounded-2xl";
        if (shape.type === "circle") borderRadiusClass = "rounded-full";
        else if (shape.type === "triangle")
          borderRadiusClass = "rounded-[20%_80%_20%_80%]";
        else if (shape.type === "cross")
          borderRadiusClass = "rounded-[40%_40%_40%_40%]";

        return (
          <motion.div
            key={shape.id}
            className={`absolute ${shape.size} ${shape.color} border-2 border-slate-900/5 dark:border-white/5 shadow-sm ${borderRadiusClass}`}
            style={{
              left: shape.x,
              top: shape.y,
            }}
            animate={{
              y: [0, -40, 40, 0],
              x: [0, 25, -25, 0],
              rotate: [0, 180, -180, 0],
              scale: [1, 1.12, 0.9, 1],
            }}
            transition={{
              duration: 15 + shape.id * 3,
              repeat: Infinity,
              delay: shape.delay,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* 2. Floating Project-themed logos and elements */}
      {floatingIcons.map((item) => {
        const IconComponent = item.Icon;
        return (
          <motion.div
            key={item.id}
            className={`absolute ${item.colorClass} stroke-[1.5] drop-shadow-sm`}
            style={{
              left: item.x,
              top: item.y,
            }}
            animate={{
              y: [0, -30, 30, 0],
              x: [0, 20, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: item.speed,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut",
            }}
          >
            <IconComponent size={item.size} />
          </motion.div>
        );
      })}

      {/* Decorative vertical running lines for brutalist drafting paper vibe */}
      <div className="absolute left-[20%] top-0 bottom-0 w-px bg-slate-950/[0.03] dark:bg-white/[0.02]" />
      <div className="absolute left-[40%] top-0 bottom-0 w-px bg-slate-950/[0.03] dark:bg-white/[0.02]" />
      <div className="absolute left-[60%] top-0 bottom-0 w-px bg-slate-950/[0.03] dark:bg-white/[0.02]" />
      <div className="absolute left-[80%] top-0 bottom-0 w-px bg-slate-950/[0.03] dark:bg-white/[0.02]" />

      {/* Background Dot grid */}
      <div className="absolute inset-0 bg-dot-grid opacity-50 dark:opacity-40" />
    </div>
  );
}
