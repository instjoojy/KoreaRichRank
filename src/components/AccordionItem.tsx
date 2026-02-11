import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, children]);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-shadow duration-200 hover:shadow-md">
      <button
        className="flex justify-between items-center w-full px-5 py-4 text-left font-semibold text-[15px] text-gray-800 hover:text-indigo-600 transition-colors duration-200 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="pr-4 leading-snug">{title}</span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 transition-transform duration-300 ease-out ${
            isOpen ? 'rotate-180 text-indigo-500' : 'text-gray-400'
          }`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: isOpen ? `${height}px` : '0px' }}
      >
        <div ref={contentRef} className="px-5 pb-5 text-gray-600 leading-relaxed text-sm">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
