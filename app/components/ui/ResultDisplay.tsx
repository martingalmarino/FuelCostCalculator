import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface ResultDisplayProps {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
}

export default function ResultDisplay({ 
  title, 
  icon: Icon, 
  children, 
  className = '' 
}: ResultDisplayProps) {
  return (
    <div className={`result-display ${className}`}>
      <div className="result-header">
        <div className="result-icon">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="result-title">{title}</h3>
      </div>
      
      <div className="result-content">
        {children}
      </div>
    </div>
  );
}
