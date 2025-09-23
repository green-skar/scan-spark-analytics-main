import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { Download, FileText, BarChart3, Users, Target, TrendingUp, Calendar, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock sponsor data
const sponsorMetrics = {
  basic: {
    totalScans: 5847,
    uniqueUsers: 1834,
    avgDaily: 234,
    topLocation: "Amsterdam Central"
  },
  premium: {
    conversionRate: 12.3,
    demographics: {
      "18-24": 23,
      "25-34": 34,
      "35-44": 28,
      "45+": 15
    },
    retentionRate: 67.8,
    peakHours: "14:00-16:00"
  }
};

const performanceData = [
  { date: '2024-01-01', basic: 145, premium: 89, conversions: 23 },
  { date: '2024-01-02', basic: 167, premium: 112, conversions: 28 },
  { date: '2024-01-03', basic: 189, premium: 134, conversions: 31 },
  { date: '2024-01-04', basic: 203, premium: 145, conversions: 34 },
  { date: '2024-01-05', basic: 178, premium: 127, conversions: 29 },
  { date: '2024-01-06', basic: 234, premium: 167, conversions: 42 },
  { date: '2024-01-07', basic: 267, premium: 189, conversions: 47 },
];

const locationBreakdown = [
  { location: "Amsterdam", scans: 2341, conversion: 14.2 },
  { location: "Rotterdam", scans: 1876, conversion: 11.8 },
  { location: "Utrecht", scans: 1234, conversion: 13.5 },
  { location: "The Hague", scans: 956, conversion: 10.9 },
  { location: "Eindhoven", scans: 678, conversion: 12.1 }
];

interface SponsorDashboardProps {
  sponsorName?: string;
  isPremium?: boolean;
}

const SponsorDashboard = ({ 
  sponsorName = "M-Pesa Campaign", 
  isPremium = false 
}: SponsorDashboardProps) => {
  const [dateRange, setDateRange] = useState("7d");
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async (format: 'csv' | 'pdf') => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsExporting(false);
    toast({
      title: `Export Complete!`,
      description: `Your ${format.toUpperCase()} report has been generated.`,
      variant: "default",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sponsor Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Campaign: {sponsorName}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          
          <Badge variant={isPremium ? "default" : "secondary"}>
            {isPremium ? "Premium" : "Basic"} Plan
          </Badge>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleExport('csv')}
              disabled={isExporting}
            >
              <FileText className="h-4 w-4 mr-2" />
              CSV
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleExport('pdf')}
              disabled={isExporting}
            >
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sponsorMetrics.basic.totalScans.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+23.5%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sponsorMetrics.basic.uniqueUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+18.2%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sponsorMetrics.basic.avgDaily}</div>
            <p className="text-xs text-muted-foreground">
              Scans per day
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Location</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{sponsorMetrics.basic.topLocation}</div>
            <p className="text-xs text-muted-foreground">
              Leading engagement
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Basic Analytics</TabsTrigger>
          <TabsTrigger value="premium" disabled={!isPremium}>
            Premium Analytics {!isPremium && "🔒"}
          </TabsTrigger>
        </TabsList>

        {/* Basic Analytics Tab */}
        <TabsContent value="basic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Chart */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Scan Performance</CardTitle>
                <CardDescription>Daily scan activity over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                    <YAxis />
                    <Tooltip labelFormatter={(value) => new Date(value).toLocaleDateString()} />
                    <Area 
                      type="monotone" 
                      dataKey="basic" 
                      stackId="1"
                      stroke="hsl(var(--primary))" 
                      fill="hsl(var(--primary))"
                      fillOpacity={0.6}
                      name="Basic Scans"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Location Breakdown */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Location Performance</CardTitle>
                <CardDescription>Scan distribution by location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {locationBreakdown.map((location, index) => (
                    <div key={location.location} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{location.location}</p>
                        <p className="text-sm text-muted-foreground">{location.scans.toLocaleString()} scans</p>
                      </div>
                      <Badge variant="outline">
                        {location.conversion}% conv.
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Premium Analytics Tab */}
        <TabsContent value="premium" className="space-y-6">
          {isPremium ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Advanced Performance */}
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-analytics-secondary" />
                    Advanced Performance
                  </CardTitle>
                  <CardDescription>Detailed engagement and conversion metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                      <YAxis />
                      <Tooltip labelFormatter={(value) => new Date(value).toLocaleDateString()} />
                      <Line 
                        type="monotone" 
                        dataKey="premium" 
                        stroke="hsl(var(--accent))" 
                        strokeWidth={2}
                        name="Premium Scans"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="conversions" 
                        stroke="hsl(var(--analytics-tertiary))" 
                        strokeWidth={2}
                        name="Conversions"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Premium Metrics */}
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-analytics-primary" />
                    Premium Insights
                  </CardTitle>
                  <CardDescription>Advanced analytics and insights</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-success rounded-lg text-white">
                      <div className="text-2xl font-bold">{sponsorMetrics.premium.conversionRate}%</div>
                      <div className="text-sm opacity-90">Conversion Rate</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-analytics rounded-lg text-white">
                      <div className="text-2xl font-bold">{sponsorMetrics.premium.retentionRate}%</div>
                      <div className="text-sm opacity-90">Retention Rate</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">Peak Hours</span>
                      <Badge variant="outline">{sponsorMetrics.premium.peakHours}</Badge>
                    </div>
                    
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="font-medium mb-2">Age Demographics</div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {Object.entries(sponsorMetrics.premium.demographics).map(([age, percent]) => (
                          <div key={age} className="flex justify-between">
                            <span>{age}:</span>
                            <span className="font-medium">{percent}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="shadow-strong border-primary/20 bg-gradient-primary text-primary-foreground">
              <CardHeader>
                <CardTitle>Unlock Premium Analytics</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Access advanced insights, demographic data, conversion tracking, and detailed reporting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-primary-foreground rounded-full" />
                      Demographic insights
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-primary-foreground rounded-full" />
                      Conversion tracking
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-primary-foreground rounded-full" />
                      Behavioral patterns
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-primary-foreground rounded-full" />
                      Advanced reporting
                    </div>
                  </div>
                  <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    Upgrade to Premium
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SponsorDashboard;