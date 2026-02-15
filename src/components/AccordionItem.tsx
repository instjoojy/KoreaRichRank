import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  bgColor?: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, bgColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, children]);

  return (
    <div
      className="rounded-3xl border border-gray-100 overflow-hidden shadow-sm transition-all duration-200 hover:shadow-lg"
      style={{ backgroundColor: bgColor || '#ffffff' }}
    >
      <h3 className="m-0">
      <button
        className="flex justify-between items-center w-full px-6 py-5 text-left font-bold text-base text-navy hover:text-indigo transition-colors duration-200 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="pr-4 leading-snug">{title}</span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 transition-transform duration-300 ease-out ${
            isOpen ? 'rotate-180 text-indigo' : 'text-gray-400'
          }`}
        />
      </button>
      </h3>
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: isOpen ? `${height}px` : '0px' }}
      >
        <div ref={contentRef} className="px-6 pb-6 text-gray-500 font-medium leading-[1.7] text-[15px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
