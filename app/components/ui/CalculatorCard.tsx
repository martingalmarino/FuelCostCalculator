import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
}

export default function CalculatorCard({ 
  title, 
  description, 
  icon: Icon, 
  children, 
  className = '' 
}: CalculatorCardProps) {
  return (
    <div className={`calculator-card ${className}`}>
      <div className="calculator-header">
        <div className="calculator-icon">
          <Icon className="h-6 w-6" />
        </div>
        <div className="calculator-title-section">
          <h2 className="calculator-title">{title}</h2>
          <p className="calculator-description">{description}</p>
        </div>
      </div>
      
      <div className="calculator-content">
        {children}
      </div>
    </div>
  );
}
