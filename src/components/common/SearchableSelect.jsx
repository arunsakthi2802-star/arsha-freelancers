import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function SearchableSelect({ options, value, onChange, placeholder = "Select...", required = false }) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const selectedOption = options.find(opt => opt.value === value);
    if (selectedOption) {
      setSearch(selectedOption.label);
    } else {
      setSearch("");
    }
  }, [value, options]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="relative">
        <input
          type="text"
          className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700 pr-8"
          placeholder={placeholder}
          value={isOpen ? search : (options.find(opt => opt.value === value)?.label || "")}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
            if (e.target.value === "") {
              onChange("");
            }
          }}
          onFocus={() => setIsOpen(true)}
          required={required && !value}
        />
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-lg max-h-60 overflow-auto">
          {filteredOptions.length === 0 ? (
            <div className="p-2 text-sm text-slate-500">No results found</div>
          ) : (
            filteredOptions.map((opt) => (
              <div
                key={opt.value}
                className="p-2 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700"
                onClick={() => {
                  onChange(opt.value);
                  setSearch(opt.label);
                  setIsOpen(false);
                }}
              >
                {opt.label}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
