export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  ANALYTICS = 'ANALYTICS',
  ALERTS = 'ALERTS',
  SETTINGS = 'SETTINGS',
  CALCULATOR = 'CALCULATOR',
  DEVOPS = 'DEVOPS'
}

export interface CostDataPoint {
  month: string;
  actual?: number;
  forecast?: number;
}

export interface Resource {
  id: string;
  name: string;
  type: string;
  provider: 'AWS' | 'GCP' | 'Azure';
  status: 'Active' | 'Orphaned' | 'Idle';
  cost: number;
  utilization: number;
}

export interface Recommendation {
  id: string;
  resourceId: string;
  description: string;
  potentialSavings: number;
  type: 'Spot' | 'Rightsizing' | 'StorageClass';
  confidence: number;
}

export interface Alert {
  id: string;
  severity: 'Critical' | 'Warning' | 'Info';
  message: string;
  timestamp: string;
  tags: string[];
}

export interface GeoMetric {
  region: string;
  utilization: number;
}

export interface CpuMetric {
  range: string;
  count: number;
}

export interface CapacityMetric {
  name: string;
  free: number;
  reserved: number;
}