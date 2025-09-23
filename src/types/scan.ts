export interface Scan {
  id: string;
  timestamp: string;
  location?: string;
  source: "Internal" | "External";
  user?: string;
}
