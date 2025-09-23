import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Smartphone, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface KardiverseActionProps {
  title?: string;
  prize?: string;
  entryCount?: number;
  sponsor?: string;
}

const KardiverseAction = ({
  title = "CONGRATULATIONS!",
  prize = "€100",
  entryCount = 154,
  sponsor = "Safaricom",
}: KardiverseActionProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    toast({
      title: "Entry Submitted Successfully!",
      description: "You'll be notified if you win within 24 hours.",
      variant: "default",
    });

    // Track engagement analytics
    console.log("KARDIVERSE action completed:", {
      phoneNumber,
      timestamp: new Date(),
      actionType: "kardiverse_entry",
      sponsor,
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <Card className="max-w-sm w-full bg-background/10 backdrop-blur-sm border border-primary/30 text-foreground animate-scale-in">
          <CardContent className="text-center p-8">
            <div className="mb-6">
              {/* Hexagonal K Logo */}
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <div className="absolute inset-0 bg-gradient-neon rounded-lg rotate-45 shadow-neon animate-pulse"></div>
                <div className="absolute inset-2 bg-background rounded-lg -rotate-45 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">K</span>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-primary mb-2 tracking-wider">
                KARDIVERSE
              </h1>
            </div>

            <div className="animate-bounce mb-4">
              <CheckCircle className="h-16 w-16 mx-auto text-primary drop-shadow-[0_0_10px_hsl(var(--primary))]" />
            </div>
            <h2 className="text-xl font-bold mb-2 text-primary">
              ENTRY CONFIRMED!
            </h2>
            <p className="text-foreground/80 mb-4 text-sm">
              Thank you for participating! Winners will be announced soon.
            </p>
            <Badge
              variant="outline"
              className="border-primary/50 text-primary bg-primary/10 shadow-glow"
            >
              Entry #{Math.floor(Math.random() * 10000) + 1000}
            </Badge>

            {/* Sponsor */}
            <div className="mt-6 pt-4 border-t border-primary/20">
              <p className="text-xs text-foreground/60">Powered by</p>
              <div className="text-lg font-bold text-red-500">{sponsor}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="max-w-sm w-full bg-background/10 backdrop-blur-sm border border-primary/30 text-foreground animate-fade-in">
        <CardContent className="text-center p-8">
          {/* Header with Logo */}
          <div className="mb-6">
            {/* Hexagonal K Logo */}
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-gradient-neon rounded-lg rotate-45 shadow-neon animate-pulse"></div>
              <div className="absolute inset-2 bg-background rounded-lg -rotate-45 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">K</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-primary mb-6 tracking-wider drop-shadow-[0_0_10px_hsl(var(--primary))]">
              KARDIVERSE
            </h1>
          </div>

          {/* Mascot Image */}
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto mb-4 relative">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center shadow-glow">
                <img
                  src="/mascot.jpg"
                  alt="Kardiverse Mascot"
                  className="w-28 h-28 object-contain rounded-full"
                />
              </div>
              {/* Headphones effect */}
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-primary/30 rounded-full animate-pulse"></div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary/30 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-4 mb-8">
            <h2 className="text-lg font-bold text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]">
              {title}
            </h2>
            <div className="space-y-1">
              <h3 className="text-3xl font-bold text-primary drop-shadow-[0_0_15px_hsl(var(--primary))]">
                WIN {prize}
              </h3>
              <p className="text-xl font-bold text-primary/90 drop-shadow-[0_0_10px_hsl(var(--primary))]">
                M-PESA TODAY
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="relative">
                <Smartphone className="absolute left-4 top-4 h-5 w-5 text-primary/70" />
                <Input
                  type="tel"
                  placeholder="Enter your M-Pesa number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="pl-12 h-14 bg-background/20 border-2 border-primary/50 text-foreground placeholder:text-foreground/60 rounded-xl focus:border-primary focus:shadow-neon text-center"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || phoneNumber.length < 10}
              className="w-full h-14 bg-transparent border-2 border-primary text-primary hover:bg-primary/10 rounded-full text-lg font-bold tracking-wider shadow-neon hover:shadow-glow transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  PROCESSING...
                </>
              ) : (
                "TAP TO CLAIM ENTRY"
              )}
            </Button>
          </form>

          {/* Entry Counter */}
          <div className="mt-6 pt-4">
            <p className="text-foreground/80 text-sm font-medium tracking-wider">
              {entryCount} ENTRIES
            </p>
          </div>

          {/* Sponsor */}
          <div className="mt-6 pt-4 border-t border-primary/20">
            <div className="flex items-center justify-center">
              <div className="text-red-500 font-bold text-lg">{sponsor}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KardiverseAction;
