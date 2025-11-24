import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Beneficiary, Project } from '@/data/mockData';
import { MapPin, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BeneficiaryMapProps {
  beneficiaries: Beneficiary[];
  projects: Project[];
  className?: string;
}

export function BeneficiaryMap({ beneficiaries, projects, className }: BeneficiaryMapProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Geotagged Beneficiary Reports</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Simplified map representation */}
        <div className="relative bg-muted/30 rounded-lg p-8 min-h-[400px] border-2 border-dashed">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50">
            <div className="text-center space-y-2">
              <MapPin className="h-12 w-12 mx-auto" />
              <p className="text-sm">Interactive Map View</p>
            </div>
          </div>
          
          {/* Location markers */}
          {beneficiaries.slice(0, 4).map((beneficiary, index) => (
            <div
              key={beneficiary.id}
              className="absolute bg-card border-2 border-primary rounded-lg p-3 shadow-lg max-w-xs"
              style={{
                top: `${15 + index * 20}%`,
                left: `${20 + index * 15}%`,
              }}
            >
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">{beneficiary.name}</p>
                    {beneficiary.verified ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : (
                      <Clock className="h-4 w-4 text-warning" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{beneficiary.location}</p>
                  <p className="text-xs">{beneficiary.helpReceived}</p>
                  <Badge variant="outline" className="text-xs">
                    {projects.find(p => p.id === beneficiary.projectId)?.name}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Beneficiary list */}
        <div className="mt-6 space-y-3">
          <h4 className="font-semibold text-sm">All Beneficiaries</h4>
          <div className="space-y-2">
            {beneficiaries.map((beneficiary) => (
              <div
                key={beneficiary.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <div>
                    <p className="font-medium text-sm">{beneficiary.name}</p>
                    <p className="text-xs text-muted-foreground">{beneficiary.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {beneficiary.verified ? (
                    <Badge variant="default" className="text-xs">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
