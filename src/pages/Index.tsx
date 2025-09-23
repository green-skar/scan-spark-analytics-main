import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, BarChart3, Gift, Building2, Smartphone, Users, TrendingUp, ArrowRight } from "lucide-react";
import QRScanner from "@/components/QRScanner";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import InteractiveAction from "@/components/InteractiveAction";
import KardiverseAction from "@/components/KardiverseAction";
import SponsorDashboard from "@/components/SponsorDashboard";
import heroImage from "@/assets/hero-analytics.jpg";

const Index = () => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-black/20" />
        <img 
          src={heroImage} 
          alt="QR Analytics Platform" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        
        <div className="relative container mx-auto px-4 py-24 text-center text-white">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
              Next-Gen QR Analytics Platform
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Transform QR Scans into
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                Actionable Insights
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Advanced analytics for QR/NFC campaigns with real-time data, demographic insights, 
              and interactive engagement tools. From basic tracking to premium behavioral analytics.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-strong"
                onClick={() => setActiveDemo("scanner")}
              >
                <QrCode className="mr-2 h-5 w-5" />
                Try QR Scanner
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => setActiveDemo("dashboard")}
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                View Analytics
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Stats */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex gap-8 text-white/80 text-sm">
            <div className="text-center">
              <div className="font-bold text-lg">12K+</div>
              <div>Daily Scans</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg">89%</div>
              <div>Mobile Usage</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg">47</div>
              <div>Locations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Demo Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {!activeDemo ? (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 animate-slide-up">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Complete QR Analytics Solution
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  From simple scan tracking to advanced behavioral analytics and interactive campaigns
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* QR Scanner Demo */}
                <Card 
                  className="shadow-medium hover:shadow-strong transition-all duration-300 cursor-pointer group"
                  onClick={() => setActiveDemo("scanner")}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                      <QrCode className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>QR Scanner</CardTitle>
                    <CardDescription>
                      Scan & register QR codes with location tracking
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Try Scanner
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Analytics Dashboard */}
                <Card 
                  className="shadow-medium hover:shadow-strong transition-all duration-300 cursor-pointer group"
                  onClick={() => setActiveDemo("dashboard")}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit group-hover:bg-accent/20 transition-colors">
                      <BarChart3 className="h-8 w-8 text-accent" />
                    </div>
                    <CardTitle>Analytics Dashboard</CardTitle>
                    <CardDescription>
                      Basic & premium analytics with real-time data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      View Analytics
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Interactive Actions */}
                <Card 
                  className="shadow-medium hover:shadow-strong transition-all duration-300 cursor-pointer group"
                  onClick={() => setActiveDemo("action")}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-warning/10 rounded-full w-fit group-hover:bg-warning/20 transition-colors">
                      <Gift className="h-8 w-8 text-warning" />
                    </div>
                    <CardTitle>Interactive Actions</CardTitle>
                    <CardDescription>
                      Engaging campaign templates with prizes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full group-hover:bg-warning group-hover:text-warning-foreground transition-colors">
                      See Templates
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Sponsor Dashboard */}
                <Card 
                  className="shadow-medium hover:shadow-strong transition-all duration-300 cursor-pointer group"
                  onClick={() => setActiveDemo("sponsor")}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-analytics-quaternary/10 rounded-full w-fit group-hover:bg-analytics-quaternary/20 transition-colors">
                      <Building2 className="h-8 w-8 text-analytics-quaternary" />
                    </div>
                    <CardTitle>Sponsor Dashboard</CardTitle>
                    <CardDescription>
                      Campaign reporting & export functionality
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full group-hover:bg-analytics-quaternary group-hover:text-white transition-colors">
                      Sponsor View
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              {/* Back Button */}
              <div className="mb-8">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveDemo(null)}
                  className="mb-4"
                >
                  ← Back to Overview
                </Button>
              </div>

              {/* Demo Content */}
              <Tabs value={activeDemo} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="scanner" onClick={() => setActiveDemo("scanner")}>
                    <QrCode className="mr-2 h-4 w-4" />
                    Scanner
                  </TabsTrigger>
                  <TabsTrigger value="dashboard" onClick={() => setActiveDemo("dashboard")}>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger value="action" onClick={() => setActiveDemo("action")}>
                    <Gift className="mr-2 h-4 w-4" />
                    Actions
                  </TabsTrigger>
                  <TabsTrigger value="sponsor" onClick={() => setActiveDemo("sponsor")}>
                    <Building2 className="mr-2 h-4 w-4" />
                    Sponsor
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="scanner" className="mt-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold">QR Code Scanner</h3>
                      <p className="text-muted-foreground">
                        Simulate QR code scanning with automatic data capture including timestamps, 
                        location logging, and user agent tracking. Essential for basic analytics collection.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-success rounded-full" />
                          <span className="text-sm">Automatic timestamp logging</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-success rounded-full" />
                          <span className="text-sm">Location detection & tracking</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-success rounded-full" />
                          <span className="text-sm">Device & browser information</span>
                        </div>
                      </div>
                    </div>
                    <QRScanner />
                  </div>
                </TabsContent>

                <TabsContent value="dashboard" className="mt-8">
                  <AnalyticsDashboard isPremium={true} />
                </TabsContent>

                <TabsContent value="action" className="mt-8">
                  {/* KARDIVERSE Mockup */}
                  <div className="mb-16">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold mb-4">KARDIVERSE Campaign Template</h3>
                      <p className="text-muted-foreground max-w-2xl mx-auto">
                        Recreated from your mockup - futuristic gaming aesthetic with neon effects and interactive elements
                      </p>
                    </div>
                    <KardiverseAction />
                  </div>
                  
                  {/* Original Template */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold">Interactive Action Templates</h3>
                      <p className="text-muted-foreground">
                        Customizable engagement templates for campaigns. Perfect for promotions, 
                        contests, and user acquisition with built-in data collection.
                      </p>
                      <div className="space-y-4">
                        <Card className="p-4">
                          <h4 className="font-semibold mb-2">Features:</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Smartphone className="h-4 w-4 text-primary" />
                              <span>Mobile-optimized forms</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-accent" />
                              <span>User data collection</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-warning" />
                              <span>Engagement tracking</span>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                    <InteractiveAction />
                  </div>
                </TabsContent>

                <TabsContent value="sponsor" className="mt-8">
                  <SponsorDashboard isPremium={true} />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      {!activeDemo && (
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">
                Why Choose Our QR Analytics Platform?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <QrCode className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Easy Integration</h3>
                  <p className="text-muted-foreground">
                    Simple QR/NFC scan registration with automatic data capture
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold">Advanced Analytics</h3>
                  <p className="text-muted-foreground">
                    From basic metrics to premium demographic insights and behavioral patterns
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center">
                    <Gift className="h-8 w-8 text-warning" />
                  </div>
                  <h3 className="text-xl font-semibold">Interactive Campaigns</h3>
                  <p className="text-muted-foreground">
                    Engaging action templates that drive user participation and loyalty
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;