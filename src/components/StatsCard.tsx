import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  variant?: 'primary' | 'secondary' | 'accent' | 'default';
}

export function StatsCard({ title, value, icon: Icon, trend, variant = 'default' }: StatsCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden transition-shadow hover:shadow-md",
      variant === 'primary' && "border-primary/20 bg-primary/5",
      variant === 'secondary' && "border-secondary/20 bg-secondary/5",
      variant === 'accent' && "border-accent/20 bg-accent/5"
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            {trend && (
              <p className={cn(
                "text-sm font-medium",
                trend.positive ? "text-success" : "text-destructive"
              )}>
                {trend.value}
              </p>
            )}
          </div>
          <div className={cn(
            "rounded-lg p-3",
            variant === 'primary' && "bg-primary/10 text-primary",
            variant === 'secondary' && "bg-secondary/10 text-secondary",
            variant === 'accent' && "bg-accent/10 text-accent",
            variant === 'default' && "bg-muted text-foreground"
          )}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
