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
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-shadow duration-200 hover:shadow-md">
      <button
        className="flex justify-between items-center w-full px-6 py-5 text-left font-semibold text-[15px] text-navy hover:text-navy-light transition-colors duration-200 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="pr-4 leading-snug">{title}</span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 transition-transform duration-300 ease-out ${
            isOpen ? 'rotate-180 text-gold-dark' : 'text-gray-400'
          }`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: isOpen ? `${height}px` : '0px' }}
      >
        <div ref={contentRef} className="px-6 pb-6 text-gray-500 font-medium leading-relaxed text-sm">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
