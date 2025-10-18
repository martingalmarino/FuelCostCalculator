import { LucideIcon } from 'lucide-react';

interface ToggleSwitchProps {
  label: string;
  icon: LucideIcon;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export default function ToggleSwitch({ 
  label, 
  icon: Icon, 
  checked, 
  onChange, 
  className = '' 
}: ToggleSwitchProps) {
  return (
    <div className={`toggle-switch ${className}`}>
      <div className="toggle-label">
        <Icon className="toggle-icon" />
        <span className="toggle-text">{label}</span>
      </div>
      <label className="toggle-wrapper">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="toggle-input"
          aria-label={label}
        />
        <div className="toggle-slider"></div>
      </label>
    </div>
  );
}
