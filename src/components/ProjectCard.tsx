import { Project } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, MapPin } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onViewDetails: (projectId: string) => void;
}

export function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  const percentage = (project.raisedAmount / project.targetAmount) * 100;

  return (
    // Added border-primary/20 and sharper shadow on hover
    <Card className="overflow-hidden transition-all duration-300 border border-border/50 hover:border-primary hover:shadow-xl hover:shadow-primary/10"> 
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold tracking-tight">{project.name}</CardTitle>
            <p className="text-sm text-muted-foreground/80">{project.ngo}</p>
          </div>
          <Badge 
            className="text-xs font-semibold px-3 py-1.5"
            variant={
              project.status === 'active' 
                ? 'default' 
                : project.status === 'completed' 
                ? 'secondary' 
                : 'outline'
            }
          >
            {project.status.toUpperCase()}
          </Badge>
        </div>
        <p className="text-sm text-foreground/80 line-clamp-2">{project.description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" /> {/* Added primary color to icon */}
          <span className="font-medium">{project.location}</span>
        </div>

        <div className="space-y-2">
          {/* Funding Progress Bar */}
          <Progress value={percentage} className="h-2 rounded-full bg-primary/20" /> 
          
          <div className="flex justify-between text-sm pt-1">
            <span className="text-muted-foreground">
              {percentage.toFixed(0)}% Funded
            </span>
            <span className="font-semibold text-primary">
              ${(project.raisedAmount).toLocaleString()} / ${project.targetAmount.toLocaleString()}
            </span>
          </div>
        </div>
        
        <Separator className="bg-border/50" />
        
        <Button 
          onClick={() => onViewDetails(project.id)} 
          className="w-full text-base"
        >
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}