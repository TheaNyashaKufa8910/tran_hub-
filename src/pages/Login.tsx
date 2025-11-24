// src/pages/Login.tsx (Focus on handleSubmit function)

import { Loader2 } from 'lucide-react'; // Make sure to import Loader2
import { useToast } from '@/hooks/use-toast'; // Assuming this uses the shadcn-ui toast/sonner

// ... other imports and component definition

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast(); // Initialize toast

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate a successful or failed login
    try {
        await login(email, password);
        // Success feedback
        toast({
            title: "Welcome Back!",
            description: "You have successfully logged in.",
            variant: "default",
        });
        navigate('/dashboard');

    } catch (error) {
        // Error feedback
        toast({
            title: "Login Failed",
            description: "Please check your email and password.",
            variant: "destructive",
        });
    }
  };

  return (
    // ... JSX structure
    <CardFooter className="flex flex-col space-y-4">
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
            Authenticating... 
          </>
        ) : (
          'Login' 
        )}
      </Button>
      {/* ... rest of the component */}
    </CardFooter>
  );
}
