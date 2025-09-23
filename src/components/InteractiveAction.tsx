import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Gift, Smartphone, Mail, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ActionTemplateProps {
  title?: string;
  description?: string;
  prize?: string;
  currency?: string;
  backgroundColor?: string;
}

const InteractiveAction = ({ 
  title = "Win €100 M-Pesa Today!",
  description = "Scan this QR code and enter your phone number for a chance to win instant cash prizes",
  prize = "€100",
  currency = "EUR",
  backgroundColor = "gradient-hero"
}: ActionTemplateProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Entry Submitted Successfully!",
      description: "You'll be notified if you win within 24 hours.",
      variant: "default",
    });

    // Track engagement analytics
    console.log("Action completed:", {
      phoneNumber,
      email,
      timestamp: new Date(),
      actionType: "prize_entry"
    });
  };

  const handleNext = () => {
    if (step === 1 && phoneNumber.length >= 10) {
      setStep(2);
    }
  };

  if (isSubmitted) {
    return (
      <Card className={`max-w-md mx-auto shadow-strong animate-scale-in bg-${backgroundColor} text-white border-0`}>
        <CardContent className="text-center p-8">
          <div className="animate-bounce mb-4">
            <CheckCircle className="h-16 w-16 mx-auto text-success" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Entry Submitted!</h2>
          <p className="text-white/90 mb-4">
            Thank you for participating! Results will be announced within 24 hours.
          </p>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            Entry #{Math.floor(Math.random() * 10000) + 1000}
          </Badge>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`max-w-md mx-auto shadow-strong animate-fade-in bg-${backgroundColor} text-white border-0`}>
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-white/20 rounded-full animate-pulse-glow">
            <Gift className="h-8 w-8" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="text-white/90 text-base">
          {description}
        </CardDescription>
        <div className="flex justify-center mt-4">
          <Badge variant="secondary" className="text-lg px-4 py-2 bg-white/20 text-white border-white/30">
            Prize: {prize}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <div className="space-y-4 animate-slide-up">
              <div>
                <label className="text-sm font-medium text-white/90 block mb-2">
                  Phone Number (M-Pesa)
                </label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                  <Input
                    type="tel"
                    placeholder="+254 700 000 000"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/60"
                    required
                  />
                </div>
                <p className="text-xs text-white/70 mt-1">
                  Enter your M-Pesa number to receive prizes
                </p>
              </div>

              <Button
                type="button"
                onClick={handleNext}
                disabled={phoneNumber.length < 10}
                className="w-full bg-white text-primary hover:bg-white/90"
              >
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-slide-up">
              <div>
                <label className="text-sm font-medium text-white/90 block mb-2">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/60"
                  />
                </div>
                <p className="text-xs text-white/70 mt-1">
                  Get notified about future promotions
                </p>
              </div>

              <div className="flex items-start gap-2 p-3 bg-white/10 rounded-lg">
                <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                <div className="text-xs text-white/90">
                  <p className="font-medium mb-1">Terms & Conditions:</p>
                  <p>By submitting, you agree to receive promotional messages. Winners selected randomly. One entry per person.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 bg-transparent border-white/30 text-white hover:bg-white/10"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-white text-primary hover:bg-white/90"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Enter Contest"
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>

        <div className="mt-6 pt-4 border-t border-white/20">
          <div className="flex items-center justify-center gap-4 text-xs text-white/70">
            <span>Powered by QR Analytics</span>
            <Badge variant="outline" className="border-white/30 text-white">
              Secure
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveAction;