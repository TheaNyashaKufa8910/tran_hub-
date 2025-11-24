// src/pages/Index.tsx (Revamped Hero and Stats)

import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, TrendingUp, MapPin, FileText, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    // Updated gradient for a darker, more premium feel
    <div className="min-h-screen bg-background"> 
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-24 pb-20"> {/* Increased padding */}
        <div className="max-w-5xl mx-auto text-center space-y-10">
          
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20 backdrop-blur-sm"> 
            <Shield className="h-4 w-4" /> 
            <span>100% Transparent Impact Tracking</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-none">
            {/* Sharper gradient for the text */}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> 
              Verify Trust. 
            </span> 
            <br />
            <span className="text-foreground">Track Real Impact.</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connecting NGOs, donors, and auditors with real-time geotagged reports, verified impact tracking, and complete accountability.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="text-lg px-10 h-14 shadow-lg shadow-primary/20" 
              onClick={() => navigate(user ? '/dashboard' : '/signup')}
            >
              {user ? 'View Dashboard' : 'Get Started'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-10 h-14 border-2 border-muted-foreground/30 hover:border-primary/50"
              onClick={() => navigate('/dashboard')} // Assuming a public dash/index view
            >
              learn more
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section - Updated Card Style */}
      <div className="container mx-auto px-4 -mt-10 mb-20"> 
        <Card className="bg-card/70 backdrop-blur-md shadow-2xl shadow-primary/10 border-2 border-primary/20">
          <CardContent className="pt-8 pb-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {/* Stat blocks remain the same, relying on your base component styles */}
              {/* ... existing stat content ... */}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* ... CTA Section remains the same ... */}
    </div>
  );
};

export default Index;