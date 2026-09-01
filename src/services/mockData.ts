export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  organization: string;
}

export interface Incident {
  id: string;
  title: string;
  type: 'DDoS' | 'Phishing' | 'Malware' | 'Privilege Escalation' | 'Data Exfiltration' | 'Brute Force';
  severity: 'critical' | 'high' | 'medium' | 'low';
  target: string;
  sourceIp: string;
  timestamp: string;
  status: 'investigating' | 'mitigated' | 'blocked' | 'active';
  aiConfidence: number;
}

export interface AIAgent {
  id: string;
  name: string;
  version: string;
  status: 'online' | 'analyzing' | 'training' | 'standby';
  accuracy: number;
  threatsDetected: number;
  lastActive: string;
  modelType: string;
}

export interface DashboardStats {
  threatsBlocked: number;
  threatsBlockedTrend: number; // percentage
  securityScore: number;
  securityScoreTrend: number;
  activeAgents: number;
  scannedEndpoints: number;
  endpointCoverage: number;
  activeIncidentsCount: number;
}

export const MOCK_USER: User = {
  id: 'usr_sentinel_007',
  name: 'Alex Rivera',
  email: 'alex.rivera@sentinel.ai',
  role: 'SecOps Director',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  organization: 'Sentinel Enterprise Defense',
};

export const MOCK_STATS: DashboardStats = {
  threatsBlocked: 14892,
  threatsBlockedTrend: 12.4,
  securityScore: 96,
  securityScoreTrend: 2.1,
  activeAgents: 8,
  scannedEndpoints: 1420,
  endpointCoverage: 99.2,
  activeIncidentsCount: 3,
};

export const MOCK_INCIDENTS: Incident[] = [
  {
    id: 'INC-9042',
    title: 'Distributed Port Scan & SSH Credential Stuffing',
    type: 'Brute Force',
    severity: 'critical',
    target: 'prod-auth-cluster-04',
    sourceIp: '185.220.101.5',
    timestamp: '2 mins ago',
    status: 'blocked',
    aiConfidence: 99.4,
  },
  {
    id: 'INC-9041',
    title: 'Anomalous Outbound Data Burst (S3 Bucket)',
    type: 'Data Exfiltration',
    severity: 'high',
    target: 's3://vault-customer-pii',
    sourceIp: '10.244.12.89',
    timestamp: '14 mins ago',
    status: 'investigating',
    aiConfidence: 94.2,
  },
  {
    id: 'INC-9040',
    title: 'Spear-Phishing Payload Detected in Inbound Mail',
    type: 'Phishing',
    severity: 'medium',
    target: 'finance-department-inbox',
    sourceIp: '45.154.255.71',
    timestamp: '42 mins ago',
    status: 'mitigated',
    aiConfidence: 98.7,
  },
  {
    id: 'INC-9039',
    title: 'Unexpected Kernel Module Injection Attempt',
    type: 'Malware',
    severity: 'critical',
    target: 'worker-node-k8s-ap-south',
    sourceIp: '194.26.29.112',
    timestamp: '1 hr ago',
    status: 'blocked',
    aiConfidence: 99.8,
  },
  {
    id: 'INC-9038',
    title: 'SYN Flood Volumetric Traffic Surge',
    type: 'DDoS',
    severity: 'high',
    target: 'edge-gateway-eu-west',
    sourceIp: 'Botnet Cluster (14k nodes)',
    timestamp: '2 hrs ago',
    status: 'mitigated',
    aiConfidence: 97.5,
  },
  {
    id: 'INC-9037',
    title: 'Suspicious IAM Role Privilege Elevation',
    type: 'Privilege Escalation',
    severity: 'low',
    target: 'iam-role-dev-ci-runner',
    sourceIp: '172.16.4.15',
    timestamp: '3 hrs ago',
    status: 'mitigated',
    aiConfidence: 89.1,
  },
];

export const MOCK_AGENTS: AIAgent[] = [
  {
    id: 'agt-1',
    name: 'Aegis-Vision Neural',
    version: 'v3.4.1',
    status: 'online',
    accuracy: 99.6,
    threatsDetected: 4219,
    lastActive: 'Just now',
    modelType: 'Transformer Bi-Directional Net',
  },
  {
    id: 'agt-2',
    name: 'GhostProtocol ZeroDay Engine',
    version: 'v2.8.0',
    status: 'analyzing',
    accuracy: 98.9,
    threatsDetected: 1890,
    lastActive: '4s ago',
    modelType: 'Unsupervised Heuristic Ensemble',
  },
  {
    id: 'agt-3',
    name: 'Cerberus Packet Sentry',
    version: 'v4.1.0',
    status: 'online',
    accuracy: 99.9,
    threatsDetected: 8140,
    lastActive: 'Just now',
    modelType: 'Deep Packet Inspection Graph Net',
  },
  {
    id: 'agt-4',
    name: 'PhishCatcher NLP Sentinel',
    version: 'v1.9.5',
    status: 'online',
    accuracy: 97.8,
    threatsDetected: 643,
    lastActive: '1m ago',
    modelType: 'LLM Prompt & Token Classifier',
  },
];
