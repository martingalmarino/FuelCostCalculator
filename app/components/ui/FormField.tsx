import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface FormFieldProps {
  label: string;
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
}

export default function FormField({ 
  label, 
  icon: Icon, 
  children, 
  className = '' 
}: FormFieldProps) {
  return (
    <div className={`form-field ${className}`}>
      <label className="form-label">
        <span className="form-label-content">
          <Icon className="form-label-icon" />
          {label}
        </span>
      </label>
      <div className="form-input-wrapper">
        {children}
      </div>
    </div>
  );
}
