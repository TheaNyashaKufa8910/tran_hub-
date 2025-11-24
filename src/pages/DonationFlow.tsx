import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { projects } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, DollarSign, CreditCard, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function DonationFlow() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedProject, setSelectedProject] = useState(location.state?.projectId || '');
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const project = projects.find(p => p.id === selectedProject);
  const suggestedAmounts = [25, 50, 100, 250, 500, 1000];

  const handleNext = () => {
    if (step === 1 && !selectedProject) {
      toast({
        title: 'Select a project',
        description: 'Please choose a project to donate to',
        variant: 'destructive',
      });
      return;
    }
    if (step === 2 && !amount && !customAmount) {
      toast({
        title: 'Enter amount',
        description: 'Please select or enter a donation amount',
        variant: 'destructive',
      });
      return;
    }
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleDonate = () => {
    const donationAmount = customAmount || amount;
    toast({
      title: 'Donation successful! 🎉',
      description: `Thank you for donating $${donationAmount} to ${project?.name}`,
    });
    setTimeout(() => navigate('/dashboard'), 2000);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Choose a Project</h2>
        <p className="text-muted-foreground">
          Select which project you'd like to support
        </p>
      </div>
      <div className="space-y-4">
        {projects.filter(p => p.status === 'active').map((proj) => (
          <Card
            key={proj.id}
            className={`cursor-pointer transition-all ${
              selectedProject === proj.id
                ? 'border-primary ring-2 ring-primary'
                : 'hover:border-primary/50'
            }`}
            onClick={() => setSelectedProject(proj.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{proj.name}</CardTitle>
                  <CardDescription className="mt-1">{proj.ngo}</CardDescription>
                </div>
                <div className="text-right">
                  <p className="font-bold">${proj.raisedAmount.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    of ${proj.targetAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress
                value={(proj.raisedAmount / proj.targetAmount) * 100}
                className="h-2"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Choose Amount</h2>
        <p className="text-muted-foreground">
          How much would you like to donate?
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{project?.name}</CardTitle>
          <CardDescription>{project?.ngo}</CardDescription>
        </CardHeader>
      </Card>

      <div>
        <Label className="mb-3 block">Suggested Amounts</Label>
        <div className="grid grid-cols-3 gap-3">
          {suggestedAmounts.map((amt) => (
            <Button
              key={amt}
              variant={amount === amt.toString() ? 'default' : 'outline'}
              onClick={() => {
                setAmount(amt.toString());
                setCustomAmount('');
              }}
            >
              ${amt}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="custom-amount">Or Enter Custom Amount</Label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="custom-amount"
            type="number"
            placeholder="0.00"
            className="pl-8"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setAmount('');
            }}
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Payment Details</h2>
        <p className="text-muted-foreground">
          Enter your payment information
        </p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Donation to</span>
            <span className="font-medium">{project?.name}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Amount</span>
            <span className="text-2xl font-bold">
              ${(customAmount || amount).toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Payment Method</Label>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="font-normal flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Credit/Debit Card
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card-number">Card Number</Label>
            <Input
              id="card-number"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.number}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, number: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="card-name">Cardholder Name</Label>
            <Input
              id="card-name"
              placeholder="John Doe"
              value={cardDetails.name}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, name: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, expiry: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={cardDetails.cvv}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cvv: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Review & Confirm</h2>
        <p className="text-muted-foreground">
          Please review your donation details
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Donation Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Project</span>
            <span className="font-medium text-right">{project?.name}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-muted-foreground">NGO</span>
            <span className="font-medium">{project?.ngo}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-muted-foreground">Donation Amount</span>
            <span className="text-xl font-bold">
              ${(customAmount || amount).toLocaleString()}
            </span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Method</span>
            <span className="font-medium">•••• {cardDetails.number.slice(-4)}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            By completing this donation, you agree to our terms of service and
            acknowledge that your contribution will be used for the specified project.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const progressValue = (step / 4) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Step {step} of 4
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(progressValue)}%
              </span>
            </div>
            <Progress value={progressValue} />
          </div>

          <Card>
            <CardContent className="pt-6">
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
              {step === 4 && renderStep4()}

              <div className="flex gap-4 mt-6">
                {step > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="flex-1"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                )}
                {step < 4 ? (
                  <Button onClick={handleNext} className="flex-1">
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleDonate} className="flex-1">
                    Complete Donation
                    <DollarSign className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
