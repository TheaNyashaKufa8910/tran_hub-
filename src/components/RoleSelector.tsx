import { Users, Heart, ShieldCheck } from 'lucide-react';
import { UserRole } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RoleSelectorProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  className?: string;
}

const roles = [
  { value: 'ngo' as UserRole, label: 'NGO', icon: Users, color: 'primary' },
  { value: 'donor' as UserRole, label: 'Donor', icon: Heart, color: 'secondary' },
  { value: 'auditor' as UserRole, label: 'Auditor', icon: ShieldCheck, color: 'accent' },
];

export function RoleSelector({ currentRole, onRoleChange, className }: RoleSelectorProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      {roles.map((role) => {
        const Icon = role.icon;
        const isActive = currentRole === role.value;
        
        return (
          <Button
            key={role.value}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => onRoleChange(role.value)}
            className={cn(
              "flex items-center gap-2 transition-all",
              isActive && role.color === 'primary' && "bg-primary hover:bg-primary/90",
              isActive && role.color === 'secondary' && "bg-secondary hover:bg-secondary/90",
              isActive && role.color === 'accent' && "bg-accent hover:bg-accent/90"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{role.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
