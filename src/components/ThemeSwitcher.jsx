import React from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeSwitcher({ theme, setTheme }) {
  const isDark = theme?.startsWith('dark') || false;
  const currentVariant = theme?.split('-')[1] || 'ocean';
  
  let activeIndex = 0;
  if (['sunrise', 'gold'].includes(currentVariant)) activeIndex = 1;
  if (['mint', 'neon'].includes(currentVariant)) activeIndex = 2;

  const toggleDarkMode = () => {
    const newPrefix = isDark ? 'light' : 'dark';
    if (activeIndex === 0) setTheme(`${newPrefix}-${isDark ? 'ocean' : 'midnight'}`);
    if (activeIndex === 1) setTheme(`${newPrefix}-${isDark ? 'sunrise' : 'gold'}`);
    if (activeIndex === 2) setTheme(`${newPrefix}-${isDark ? 'mint' : 'neon'}`);
  };

  const setVariant = (index) => {
    const prefix = isDark ? 'dark' : 'light';
    if (index === 0) setTheme(`${prefix}-${isDark ? 'midnight' : 'ocean'}`);
    if (index === 1) setTheme(`${prefix}-${isDark ? 'gold' : 'sunrise'}`);
    if (index === 2) setTheme(`${prefix}-${isDark ? 'neon' : 'mint'}`);
  };

  return (
    <div className="flex items-center gap-2 p-1 rounded-full border border-border-primary bg-bg-secondary/50 backdrop-blur-md">
      <button onClick={toggleDarkMode} className="p-1.5 rounded-full text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
        {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
      </button>
      <div className="w-px h-3.5 bg-border-primary"></div>
      <div className="flex items-center gap-1.5 px-1.5">
        <button onClick={() => setVariant(0)} className={`w-3.5 h-3.5 rounded-full bg-blue-500 transition-transform hover:scale-110 cursor-pointer ${activeIndex === 0 ? 'ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-bg-primary scale-110' : ''}`} />
        <button onClick={() => setVariant(1)} className={`w-3.5 h-3.5 rounded-full bg-amber-500 transition-transform hover:scale-110 cursor-pointer ${activeIndex === 1 ? 'ring-2 ring-offset-2 ring-amber-500 dark:ring-offset-bg-primary scale-110' : ''}`} />
        <button onClick={() => setVariant(2)} className={`w-3.5 h-3.5 rounded-full bg-emerald-500 transition-transform hover:scale-110 cursor-pointer ${activeIndex === 2 ? 'ring-2 ring-offset-2 ring-emerald-500 dark:ring-offset-bg-primary scale-110' : ''}`} />
      </div>
    </div>
  );
}
