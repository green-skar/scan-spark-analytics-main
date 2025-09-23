import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ScanRegistration from "./ScanRegistration";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  QrCode,
  Users,
  MapPin,
  TrendingUp,
  Clock,
  Download,
  Eye,
} from "lucide-react";

// Mock data for analytics
const scanData = [
  { name: "Mon", basic: 124, premium: 89 },
  { name: "Tue", basic: 156, premium: 112 },
  { name: "Wed", basic: 189, premium: 134 },
  { name: "Thu", basic: 203, premium: 145 },
  { name: "Fri", basic: 178, premium: 127 },
  { name: "Sat", basic: 234, premium: 167 },
  { name: "Sun", basic: 267, premium: 189 },
];

const locationData = [
  { name: "Amsterdam", value: 345, color: "hsl(var(--analytics-primary))" },
  { name: "Rotterdam", value: 234, color: "hsl(var(--analytics-secondary))" },
  { name: "Utrecht", value: 156, color: "hsl(var(--analytics-tertiary))" },
  { name: "The Hague", value: 89, color: "hsl(var(--analytics-quaternary))" },
];

const demographicData = [
  { age: "18-24", scans: 23, retention: 67 },
  { age: "25-34", scans: 45, retention: 78 },
  { age: "35-44", scans: 34, retention: 82 },
  { age: "45-54", scans: 28, retention: 74 },
  { age: "55+", scans: 18, retention: 69 },
];

interface AnalyticsDashboardProps {
  isPremium?: boolean;
  onRequestPremium?: () => void;
}

const AnalyticsDashboard = ({
  isPremium = false,
  onRequestPremium,
}: AnalyticsDashboardProps) => {
  const currentHour = new Date().getHours();
  const liveScans = Math.floor(Math.random() * 50) + 10;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            {isPremium ? "Premium Analytics" : "Basic Analytics"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isPremium ? "default" : "secondary"}>
            {isPremium ? "Premium" : "Basic"}
          </Badge>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Scan Registration - visible and prominent */}
      <ScanRegistration />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+12.5%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+8.2%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-warning">+3</span> new locations
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft animate-pulse-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Live Scans</CardTitle>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 bg-success rounded-full animate-pulse" />
              <Eye className="h-4 w-4 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{liveScans}</div>
            <p className="text-xs text-muted-foreground">Active in last hour</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scan Trends */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Scan Trends</CardTitle>
            <CardDescription>Weekly scan activity breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scanData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="basic"
                  fill="hsl(var(--primary))"
                  name="Basic Scans"
                />
                {isPremium && (
                  <Bar
                    dataKey="premium"
                    fill="hsl(var(--accent))"
                    name="Premium Scans"
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Location Distribution */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Location Distribution</CardTitle>
            <CardDescription>Scans by geographic location</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={locationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {locationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Premium Features */}
      {isPremium && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Demographics */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-analytics-secondary" />
                Demographics & Retention
              </CardTitle>
              <CardDescription>
                User age groups and retention rates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {demographicData.map((item) => (
                <div key={item.age} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Age {item.age}</span>
                    <span className="text-muted-foreground">
                      {item.scans}% of scans
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={item.retention} className="flex-1" />
                    <span className="text-sm font-medium">
                      {item.retention}%
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Behavioral Patterns */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-analytics-tertiary" />
                Behavioral Patterns
              </CardTitle>
              <CardDescription>Usage trends and patterns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">Peak Hours</span>
                  <Badge variant="outline">2:00 PM - 4:00 PM</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">Repeat Scan Rate</span>
                  <Badge variant="outline">34.7%</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">Avg. Session Time</span>
                  <Badge variant="outline">2m 45s</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="text-sm font-medium">Mobile vs Desktop</span>
                  <Badge variant="outline">87% Mobile</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Upgrade Prompt for Basic Users */}
      {!isPremium && (
        <Card className="shadow-strong border-primary/20 bg-gradient-primary text-primary-foreground">
          <CardHeader>
            <CardTitle>Unlock Premium Analytics</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Get detailed demographic insights, behavioral patterns, and
              advanced reporting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="secondary"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              onClick={onRequestPremium}
            >
              Upgrade to Premium
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
