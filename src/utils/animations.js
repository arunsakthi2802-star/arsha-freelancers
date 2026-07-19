export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

export const fadeUp = {
  hidden: { 
    y: 24, 
    opacity: 0 
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      ease: [0.33, 1, 0.68, 1], // ease-out-cubic
      duration: 0.5
    }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

// Hover states for cards
export const hoverCard = {
  hover: {
    scale: 1.02,
    y: -4,
    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

// Reusable viewport configuration to trigger only once
export const viewportConfig = { 
  once: true, 
  margin: "-100px" 
};
