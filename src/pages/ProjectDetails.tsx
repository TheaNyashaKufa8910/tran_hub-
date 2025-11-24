import { useParams, useNavigate, Link } from 'react-router-dom';
import { projects, beneficiaries, reports, activities } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ActivityFeed } from '@/components/ActivityFeed';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { format } from 'date-fns';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const projectBeneficiaries = beneficiaries.filter(b => b.projectId === id);
  const projectReports = reports.filter(r => r.projectId === id);
  const projectActivities = activities.filter(a => a.projectId === id);
  const progress = (project.raisedAmount / project.targetAmount) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">{project.name}</CardTitle>
                    <CardDescription className="text-base">
                      By {project.ngo}
                    </CardDescription>
                  </div>
                  <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">{project.description}</p>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Started {format(new Date(project.startDate), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{project.beneficiaries.toLocaleString()} beneficiaries</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{projectReports.length} reports submitted</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fundraising Progress</span>
                    <span className="font-semibold">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} />
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold">${project.raisedAmount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">raised</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">${project.targetAmount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">goal</p>
                    </div>
                  </div>
                </div>

                <Link to="/donation-flow" state={{ projectId: project.id }}>
                  <Button className="w-full" size="lg">
                    <DollarSign className="mr-2 h-5 w-5" />
                    Donate to This Project
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="beneficiaries">Beneficiaries</TabsTrigger>
              </TabsList>
              
              <TabsContent value="activity" className="mt-6">
                <ActivityFeed activities={projectActivities} />
              </TabsContent>

              <TabsContent value="reports" className="mt-6">
                <div className="space-y-4">
                  {projectReports.map(report => (
                    <Link key={report.id} to={`/report/${report.id}`}>
                      <Card className="hover:border-primary transition-colors cursor-pointer">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{report.title}</CardTitle>
                              <CardDescription>{report.description}</CardDescription>
                            </div>
                            <Badge variant={
                              report.status === 'verified' ? 'default' : 
                              report.status === 'pending' ? 'secondary' : 
                              'destructive'
                            }>
                              {report.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Submitted {format(new Date(report.submittedDate), 'MMM dd, yyyy')}</span>
                            <span>{report.beneficiariesHelped} beneficiaries helped</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="beneficiaries" className="mt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {projectBeneficiaries.map(beneficiary => (
                    <Card key={beneficiary.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg">{beneficiary.name}</CardTitle>
                          {beneficiary.verified && (
                            <Badge variant="default">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{beneficiary.location}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {beneficiary.helpReceived}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(beneficiary.date), 'MMM dd, yyyy')}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Impact Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Raised</span>
                  <span className="font-bold">${project.raisedAmount.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Lives Impacted</span>
                  <span className="font-bold">{project.beneficiaries.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Verified Reports</span>
                  <span className="font-bold">
                    {projectReports.filter(r => r.status === 'verified').length}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <Badge>{project.category}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Average Donation</span>
                    <span className="font-semibold">$2,500</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Donors</span>
                    <span className="font-semibold">15</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Recent Activity</span>
                    <span className="font-semibold">{projectActivities.length} updates</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
