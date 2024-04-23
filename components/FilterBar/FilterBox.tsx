import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { Check } from "lucide-react";
import { Button } from "@components/ui/button";
interface FilterProps {
  title: string;
  options: string[];
  allowMultiple: boolean;
  onChange: (title: string, selectedOptions: string[]) => void;
  disableDropdown?: boolean;
  clearInput?: boolean;
}

const FilterBox: React.FC<FilterProps> = ({
  title,
  options,
  allowMultiple = true,
  onChange,
  disableDropdown = false,
  clearInput = false,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  const handleOptionToggle = (option: string, index: number) => {
    setHighlightedIndex(index);
    if (allowMultiple) {
      const newOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((item) => item !== option)
        : [...selectedOptions, option];
      setSelectedOptions(newOptions);
      onChange(title, newOptions);
    } else {
      const newOptions = selectedOptions.includes(option) ? [] : [option];
      setSelectedOptions(newOptions);
      onChange(title, newOptions);
      if (newOptions.length > 0) {
        handleDropdownToggle();
      }
    }
  };
  const handleCloseDropdown = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;
      if (!/^[a-zA-Z]$/.test(key)) {
        return;
      }
      const index = options.findIndex((option) =>
        option.toLowerCase().startsWith(key.toLowerCase())
      );
      if (index !== -1) {
        setHighlightedIndex(index + 1);
        if (dropdownRef.current) {
          const listItem = dropdownRef.current.querySelector(
            `label[data-index="${index + 1}"]`
          );
          if (listItem) {
            listItem.scrollIntoView({ block: "center" });
          }
        }
      }
    },
    [options]
  );

  useEffect(() => {
    if (isOpen && highlightedIndex !== 0 && dropdownRef.current) {
      const listItem = dropdownRef.current.querySelector(
        `label[data-index="${highlightedIndex}"]`
      );
      if (listItem) {
        listItem.scrollIntoView({ block: "center" });
      }
    }
    document.addEventListener("mousedown", handleCloseDropdown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleCloseDropdown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, handleCloseDropdown, isOpen, highlightedIndex]);

  const sortedOptions = useMemo(() => {
    if (options && title !== "Duration" && title !== "Price Range") {
      return options.slice().sort((a, b) => a.localeCompare(b));
    }
    return options;
  }, [options, title]);

  return (
    <div ref={dropdownRef}>
      <div className="relative">
        <Button
          variant="ghost"
          onClick={handleDropdownToggle}
          className="bg-slate-100 border-none h-8 w-fit text-left px-2 rounded-md focus:outline-none flex items-center"
          disabled={disableDropdown}
        >
          {title}
          <svg
            className={`h-4 w-4 ml-1 transition-transform transform ${
              isOpen ? "-rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </Button>
        {isOpen && (
          <div className="absolute z-10 overflow-clip">
            <div className="w-44 md:max-h-[30rem] max-h-72 overflow-y-scroll bg-slate-100 border-none shadow-md rounded-md">
              {sortedOptions.map((option, i) => (
                <label
                  key={i}
                  data-index={i}
                  className={`${
                    highlightedIndex === i ? "bg-gray-200 rounded-md" : ""
                  } hover:bg-slate-200 hover:rounded-md cursor-pointer block p-2`}
                >
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleOptionToggle(option, i)}
                    className="sr-only"
                  />
                  <span className="flex items-center">
                    <span className="ml-2 h-4 min-w-4 mr-2">
                      {selectedOptions.includes(option) && (
                        <Check className="h-full w-full text-slate-400" />
                      )}
                    </span>
                    <span
                      className={
                        title === "Price Range" ? "text-green-700" : ""
                      }
                    >
                      {option}
                    </span>
                  </span>
                </label>
              ))}
              {!sortedOptions.length && title === "Location" && (
                <label className="text-gray-400 block p-2">
                  Select a country first.
                </label>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBox;
