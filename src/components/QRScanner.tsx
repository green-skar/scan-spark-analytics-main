import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Smartphone, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScanData {
  id: string;
  timestamp: Date;
  location?: { lat: number; lng: number; city: string };
  userAgent: string;
  scanCount: number;
}

const QRScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanData, setScanData] = useState<ScanData | null>(null);
  const { toast } = useToast();

  const simulateScan = () => {
    setIsScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      const newScan: ScanData = {
        id: `scan_${Date.now()}`,
        timestamp: new Date(),
        location: {
          lat: 52.3676,
          lng: 4.9041,
          city: "Amsterdam, Netherlands"
        },
        userAgent: navigator.userAgent,
        scanCount: Math.floor(Math.random() * 1000) + 1
      };
      
      setScanData(newScan);
      setIsScanning(false);
      
      toast({
        title: "QR Code Scanned Successfully!",
        description: "Data captured and logged to analytics.",
        variant: "default",
      });
    }, 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <Card className="shadow-medium animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <QrCode className="h-6 w-6 text-primary" />
            QR Code Scanner
          </CardTitle>
          <CardDescription>
            Scan QR codes to collect analytics data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center p-8 border-2 border-dashed border-muted-foreground/20 rounded-lg bg-muted/5">
            {isScanning ? (
              <div className="text-center space-y-2">
                <div className="animate-pulse-glow">
                  <QrCode className="h-16 w-16 text-primary mx-auto" />
                </div>
                <p className="text-sm text-muted-foreground">Scanning...</p>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <Smartphone className="h-16 w-16 text-muted-foreground/50 mx-auto" />
                <p className="text-sm text-muted-foreground">Ready to scan</p>
              </div>
            )}
          </div>
          
          <Button 
            onClick={simulateScan} 
            disabled={isScanning}
            className="w-full"
            variant="default"
          >
            {isScanning ? "Scanning..." : "Start Scan"}
          </Button>
        </CardContent>
      </Card>

      {scanData && (
        <Card className="shadow-medium animate-slide-up">
          <CardHeader>
            <CardTitle className="text-lg">Scan Results</CardTitle>
            <CardDescription>Latest scan data captured</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Timestamp</p>
                  <p className="text-xs text-muted-foreground">
                    {scanData.timestamp.toLocaleString()}
                  </p>
                </div>
              </div>
              
              {scanData.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-xs text-muted-foreground">
                      {scanData.location.city}
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="pt-2 border-t">
              <p className="text-sm font-medium">Scan ID: {scanData.id}</p>
              <p className="text-xs text-muted-foreground">
                Total scans today: {scanData.scanCount}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QRScanner;