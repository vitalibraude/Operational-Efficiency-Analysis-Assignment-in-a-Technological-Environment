import { CostDataPoint, Resource, Recommendation, Alert, GeoMetric, CpuMetric, CapacityMetric } from '../types';

export const generateCostData = (): CostDataPoint[] => [
  { month: 'Jan', actual: 42000 },
  { month: 'Feb', actual: 43500 },
  { month: 'Mar', actual: 41200 },
  { month: 'Apr', actual: 41200, forecast: 41200 }, // Connection point
  { month: 'May', forecast: 38000 },
  { month: 'Jun', forecast: 35500 },
];

export const generateResources = (count: number): Resource[] => {
  const types = ['EC2', 'RDS', 'S3', 'Lambda', 'GKE Node'];
  const providers: ('AWS' | 'GCP' | 'Azure')[] = ['AWS', 'GCP', 'Azure'];
  const statuses: ('Active' | 'Orphaned' | 'Idle')[] = ['Active', 'Active', 'Active', 'Idle', 'Orphaned'];

  return Array.from({ length: count }).map((_, i) => ({
    id: `res-${i + 1000}`,
    name: `${types[i % types.length]}-prod-${i}`,
    type: types[i % types.length],
    provider: providers[i % providers.length],
    status: statuses[i % statuses.length],
    cost: Math.floor(Math.random() * 500) + 50,
    utilization: Math.floor(Math.random() * 100),
  }));
};

export const recommendations: Recommendation[] = [
  { id: 'rec-1', resourceId: 'i-0x123abc', description: 'Convert m5.2xlarge to Spot Instance', potentialSavings: 320, type: 'Spot', confidence: 92 },
  { id: 'rec-2', resourceId: 'vol-0987', description: 'Move unaccessed EBS volume to Cold Storage', potentialSavings: 45, type: 'StorageClass', confidence: 88 },
  { id: 'rec-3', resourceId: 'db-prod-1', description: 'Downsize RDS: CPU < 10% for 30 days', potentialSavings: 650, type: 'Rightsizing', confidence: 95 },
  { id: 'rec-4', resourceId: 'gke-cluster-1', description: 'Enable Cluster Autoscaler for GKE', potentialSavings: 120, type: 'Rightsizing', confidence: 78 },
];

export const alerts: Alert[] = [
  { id: 'al-1', severity: 'Critical', message: 'DB CPU > 80% for 2 hours', timestamp: '10 min ago', tags: ['Database', 'Performance'] },
  { id: 'al-2', severity: 'Warning', message: 'Data-transfer exceeded 100GB/day', timestamp: '1 hour ago', tags: ['Network', 'Cost'] },
  { id: 'al-3', severity: 'Info', message: 'New savings plan available', timestamp: '3 hours ago', tags: ['Billing'] },
];

export const geoMetrics: GeoMetric[] = [
  { region: 'us-east-1', utilization: 85 },
  { region: 'us-west-2', utilization: 65 },
  { region: 'eu-central-1', utilization: 45 },
  { region: 'ap-southeast-1', utilization: 72 },
  { region: 'sa-east-1', utilization: 30 },
];

export const cpuMetrics: CpuMetric[] = [
  { range: '0-20%', count: 45 },
  { range: '21-40%', count: 80 },
  { range: '41-60%', count: 55 },
  { range: '61-80%', count: 30 },
  { range: '81-100%', count: 12 },
];

export const capacityMetrics: CapacityMetric[] = [
  { name: 'Compute', free: 40, reserved: 60 },
  { name: 'Storage', free: 25, reserved: 75 },
  { name: 'Database', free: 15, reserved: 85 },
];