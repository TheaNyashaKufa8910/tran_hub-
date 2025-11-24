import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole, projects, activities, beneficiaries, reports } from '@/data/mockData';
import { useAuth } from '@/hooks/useAuth';
import { RoleSelector } from '@/components/RoleSelector';
import { StatsCard } from '@/components/StatsCard';
import { ProjectCard } from '@/components/ProjectCard';
import { ActivityFeed } from '@/components/ActivityFeed';
import { BeneficiaryMap } from '@/components/BeneficiaryMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Download
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentRole, setCurrentRole] = useState<UserRole>('donor');

  useEffect(() => {
    if (user) {
      setCurrentRole(user.role);
    }
  }, [user]);

  const totalRaised = projects.reduce((sum, p) => sum + p.raisedAmount, 0);
  const totalBeneficiaries = projects.reduce((sum, p) => sum + p.beneficiaries, 0);
  const activeProjects = projects.filter(p => p.status === 'active').length;

  const renderDonorView = () => (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Donated"
          value={`$${totalRaised.toLocaleString()}`}
          icon={DollarSign}
          variant="primary"
          trend={{ value: "+12.5% this month", positive: true }}
        />
        <StatsCard
          title="Active Projects"
          value={activeProjects}
          icon={TrendingUp}
          variant="secondary"
        />
        <StatsCard
          title="Lives Impacted"
          value={totalBeneficiaries.toLocaleString()}
          icon={Users}
          variant="accent"
        />
        <StatsCard
          title="Reports Verified"
          value={reports.filter(r => r.status === 'verified').length}
          icon={CheckCircle2}
          variant="default"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Active Projects</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            {projects.filter(p => p.status === 'active').map(project => (
              <ProjectCard 
                key={project.id} 
                project={project}
                onViewDetails={() => navigate(`/project/${project.id}`)}
              />
            ))}
          </div>
        </div>

        <ActivityFeed activities={activities.slice(0, 8)} />
      </div>
    </div>
  );

  const renderNGOView = () => (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Funds Received"
          value={`$${totalRaised.toLocaleString()}`}
          icon={DollarSign}
          variant="primary"
        />
        <StatsCard
          title="Active Campaigns"
          value={activeProjects}
          icon={TrendingUp}
          variant="secondary"
        />
        <StatsCard
          title="Beneficiaries Helped"
          value={totalBeneficiaries.toLocaleString()}
          icon={Users}
          variant="accent"
        />
        <StatsCard
          title="Pending Reports"
          value={reports.filter(r => r.status === 'pending').length}
          icon={Clock}
          variant="default"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Projects</CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.map(project => (
              <div
                key={project.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div>
                  <p className="font-semibold">{project.name}</p>
                  <p className="text-sm text-muted-foreground">{project.location}</p>
                </div>
                <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                  {project.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Reports to Submit</CardTitle>
            <Button size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Submit Report
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {reports.map(report => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-1">
                  <p className="font-semibold text-sm">{report.title}</p>
                  <p className="text-xs text-muted-foreground">{report.submittedDate}</p>
                </div>
                <Badge
                  variant={
                    report.status === 'verified' ? 'default' :
                    report.status === 'flagged' ? 'destructive' :
                    'secondary'
                  }
                >
                  {report.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <BeneficiaryMap beneficiaries={beneficiaries} projects={projects} />
    </div>
  );

  const renderAuditorView = () => (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Pending Reviews"
          value={reports.filter(r => r.status === 'pending').length}
          icon={Clock}
          variant="accent"
        />
        <StatsCard
          title="Verified Reports"
          value={reports.filter(r => r.status === 'verified').length}
          icon={CheckCircle2}
          variant="secondary"
        />
        <StatsCard
          title="Flagged Items"
          value={reports.filter(r => r.status === 'flagged').length}
          icon={AlertCircle}
          variant="primary"
        />
        <StatsCard
          title="Total Projects"
          value={projects.length}
          icon={FileText}
          variant="default"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Reports Awaiting Review</CardTitle>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {reports.map(report => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{report.title}</p>
                    <Badge
                      variant={
                        report.status === 'verified' ? 'default' :
                        report.status === 'flagged' ? 'destructive' :
                        'secondary'
                      }
                    >
                      {report.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>By {report.submittedBy}</span>
                    <span>•</span>
                    <span>{report.submittedDate}</span>
                    <span>•</span>
                    <span>{report.beneficiariesHelped} beneficiaries</span>
                  </div>
                  {report.status === 'pending' && (
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="default">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Verify
                      </Button>
                      <Button size="sm" variant="destructive">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        Flag
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <ActivityFeed activities={activities.filter(a => a.type === 'verification' || a.type === 'report')} />
      </div>

      <BeneficiaryMap beneficiaries={beneficiaries} projects={projects} />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                NGO Transparency Platform
              </h1>
              <p className="text-sm text-muted-foreground">Real-time impact tracking & reporting</p>
            </div>
            <RoleSelector currentRole={currentRole} onRoleChange={setCurrentRole} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">
            {currentRole === 'donor' && 'Donor Dashboard'}
            {currentRole === 'ngo' && 'NGO Dashboard'}
            {currentRole === 'auditor' && 'Auditor Dashboard'}
          </h2>
          <p className="text-muted-foreground">
            {currentRole === 'donor' && 'Track your donations and see the impact you\'re making'}
            {currentRole === 'ngo' && 'Manage your projects and report your impact'}
            {currentRole === 'auditor' && 'Review and verify reports for transparency'}
          </p>
        </div>

        {currentRole === 'donor' && renderDonorView()}
        {currentRole === 'ngo' && renderNGOView()}
        {currentRole === 'auditor' && renderAuditorView()}
      </main>
    </div>
  );
};

export default Dashboard;
