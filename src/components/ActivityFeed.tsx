import { Activity } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, FileText, ShieldCheck, Target } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface ActivityFeedProps {
  activities: Activity[];
  className?: string;
}

const iconMap = {
  donation: DollarSign,
  report: FileText,
  verification: ShieldCheck,
  milestone: Target,
};

const colorMap = {
  donation: 'text-secondary',
  report: 'text-primary',
  verification: 'text-accent',
  milestone: 'text-success',
};

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No recent activity</p>
        ) : (
          activities.map((activity, index) => {
            const Icon = iconMap[activity.type];
            return (
              <div
                key={activity.id}
                className={cn(
                  "flex gap-4 pb-4",
                  index !== activities.length - 1 && "border-b"
                )}
              >
                <div className={cn("rounded-full p-2 h-fit", colorMap[activity.type], "bg-muted")}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-sm">{activity.title}</p>
                    {activity.status && (
                      <Badge
                        variant={
                          activity.status === 'verified' ? 'default' :
                          activity.status === 'flagged' ? 'destructive' :
                          'secondary'
                        }
                        className="text-xs"
                      >
                        {activity.status}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  {activity.amount && (
                    <p className="text-sm font-semibold text-secondary">
                      ${activity.amount.toLocaleString()}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })} · {activity.user}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
