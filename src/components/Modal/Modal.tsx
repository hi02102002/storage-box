import { Button } from '@/components';
import { Props as ButtonProps } from '@/components/Button';
import useOnClickOutside from '@/hooks/useClickOutside';
import React from 'react';
import { createPortal } from 'react-dom';
const modal = document.querySelector('#modal-root') as HTMLElement;

interface Props {
   children: React.ReactNode;
   width?: string | number;
   onClose?: () => void;
}

export const Modal = ({ children, width = 392, onClose }: Props) => {
   const _width = typeof width === 'string' ? width : `${width}px`;

   const contentRef = React.useRef<HTMLDivElement | null>(null);

   useOnClickOutside(contentRef, (e) => {
      e.stopPropagation();
      onClose && onClose();
   });

   return createPortal(
      <div className="min-h-screen flex items-center justify-center bg-black/60 fixed inset-0 w-full  px-4 z-[1000]">
         <div
            style={{
               width: _width,
            }}
            className="bg-white rounded shadow"
            ref={contentRef}
         >
            {children}
         </div>
      </div>,
      modal
   );
};

interface PropsHeader {
   title?: string;
   onClose: () => void;
   className?: string;
   classNameTitle?: string;
   classNameClose?: string;
}

const Header = ({
   title = 'Modal',
   onClose,
   className = '',
   classNameClose = '',
   classNameTitle = '',
}: PropsHeader) => {
   return (
      <div className={`flex items-center justify-between p-4 ${className}`}>
         <h3 className={`text-lg font-semibold ${classNameTitle}`}>{title}</h3>
         <button onClick={onClose} className={`${classNameClose}`}>
            <svg
               xmlns="http://www.w3.org/2000/svg"
               className="icon icon-tabler icon-tabler-x"
               width="24"
               height="24"
               viewBox="0 0 24 24"
               strokeWidth="2"
               stroke="currentColor"
               fill="none"
               strokeLinecap="round"
               strokeLinejoin="round"
            >
               <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
               <line x1="18" y1="6" x2="6" y2="18"></line>
               <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
         </button>
      </div>
   );
};

interface PropsFooter {
   className?: string;
   textCancel?: string;
   textOk?: string;
   propsButtonCancel?: ButtonProps;
   propsButtonOk?: ButtonProps;
}

const Footer = ({
   className = '',
   textCancel = 'Cancel',
   textOk = 'Ok',
   propsButtonCancel,
   propsButtonOk,
}: PropsFooter) => {
   return (
      <div className={`flex items-center justify-end p-4 gap-4 ${className}`}>
         <Button {...propsButtonCancel}>{textCancel}</Button>
         <Button {...propsButtonOk}>{textOk}</Button>
      </div>
   );
};

Modal.Header = Header;
Modal.Footer = Footer;
