import { ButtonHTMLAttributes } from 'react';

import classNames from 'classnames/bind';

import { Spiner } from '@/components';
import styles from './Button.module.css';

const cx = classNames.bind(styles);

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
   loading?: boolean;
   typeBtn?: 'primary' | '' | 'secondary';
}

export const Button = ({
   className = '',
   typeBtn = '',
   children,
   loading,
   disabled,
   ...rest
}: Props) => {
   return (
      <button
         className={cx('btn', className, typeBtn)}
         disabled={loading || disabled}
         {...rest}
      >
         {loading && <Spiner className={cx('spiner')} />}
         {children}
      </button>
   );
};
