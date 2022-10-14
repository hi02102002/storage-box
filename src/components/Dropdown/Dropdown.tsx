import { DropdownItem } from './DropdowItem';

interface Props {
   children: React.ReactNode;
   className?: string;
}
export const Dropdown = ({ children, className = '' }: Props) => {
   return (
      <div className={`bg-white rounded shadow w-[230px] ${className}`}>
         <div className="py-2">{children}</div>
      </div>
   );
};

Dropdown.Item = DropdownItem;
