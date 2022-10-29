import { FC, HTMLProps } from 'react';
import './alert.scss';

interface AlertProps extends HTMLProps<HTMLDivElement> {
  type: 'success' | 'warning' | 'error';
}

export const Alert: FC<AlertProps> = ({ children, type, ...props }) => {
  return (
    <div {...props} role="alert" className={`alert ${type}`}>
      <div className={`alert-icon ${type}`}>
        <i className="fa-solid fa-check" />
      </div>
      <div className={`alert-icon ${type}`}>{children}</div>
    </div>
  );
};
