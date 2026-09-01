import { MOCK_AGENTS, MOCK_INCIDENTS, MOCK_STATS, MOCK_USER } from './mockData';
import type { AIAgent, DashboardStats, Incident, User } from './mockData';

/**
 * ============================================================================
 * SentinelAI API Service Layer
 * ============================================================================
 * Currently uses simulated API responses with realistic latency.
 *
 * When your backend is ready:
 * 1. Set VITE_API_BASE_URL in your .env file (e.g. VITE_API_BASE_URL=https://api.sentinel.ai/v1)
 * 2. Replace the simulated setTimeout responses below with actual fetch() or axios calls.
 * ============================================================================
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.sentinel.ai/v1';

// Helper to simulate network latency
const delay = (ms: number = 600) => new Promise((resolve) => setTimeout(resolve, ms));

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password?: string;
  organization?: string;
}

export const authApi = {
  /**
   * Mock login endpoint
   * Accepts any valid email/password combination or demo credentials
   */
  login: async (email: string, password?: string): Promise<LoginResponse> => {
    await delay(700);

    if (!email || !email.includes('@')) {
      throw new Error('Please provide a valid corporate email address.');
    }

    if (password && password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    const mockToken = `sentinel_jwt_${btoa(email)}_${Date.now()}`;
    const user: User = {
      ...MOCK_USER,
      email: email.trim().toLowerCase(),
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    };

    localStorage.setItem('sentinel_token', mockToken);
    localStorage.setItem('sentinel_user', JSON.stringify(user));

    return {
      token: mockToken,
      user,
    };
  },

  /**
   * Mock registration endpoint
   */
  register: async (payload: RegisterPayload): Promise<LoginResponse> => {
    await delay(800);

    if (!payload.email || !payload.email.includes('@')) {
      throw new Error('Please provide a valid corporate email address.');
    }

    if (!payload.name || payload.name.trim().length < 2) {
      throw new Error('Please enter your full name.');
    }

    const mockToken = `sentinel_jwt_${btoa(payload.email)}_${Date.now()}`;
    const user: User = {
      id: `usr_${Date.now()}`,
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      role: 'Security Analyst',
      organization: payload.organization || 'Global Defense Node',
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(payload.name)}`,
    };

    localStorage.setItem('sentinel_token', mockToken);
    localStorage.setItem('sentinel_user', JSON.stringify(user));

    return {
      token: mockToken,
      user,
    };
  },

  /**
   * Retrieves current session user from localStorage
   */
  getCurrentUser: async (): Promise<User | null> => {
    await delay(200);
    const token = localStorage.getItem('sentinel_token');
    const storedUser = localStorage.getItem('sentinel_user');

    if (!token || !storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as User;
    } catch {
      return null;
    }
  },

  /**
   * Logs out user and cleans up local storage
   */
  logout: async (): Promise<void> => {
    await delay(200);
    localStorage.removeItem('sentinel_token');
    localStorage.removeItem('sentinel_user');
  },
};

export const securityApi = {
  /**
   * Retrieve security dashboard statistics
   */
  getDashboardStats: async (): Promise<DashboardStats> => {
    await delay(450);
    return { ...MOCK_STATS };
  },

  /**
   * Retrieve security incident feed
   */
  getIncidents: async (severityFilter?: string): Promise<Incident[]> => {
    await delay(500);
    if (!severityFilter || severityFilter === 'all') {
      return [...MOCK_INCIDENTS];
    }
    return MOCK_INCIDENTS.filter((inc) => inc.severity === severityFilter);
  },

  /**
   * Retrieve AI sentinel agents
   */
  getAgents: async (): Promise<AIAgent[]> => {
    await delay(400);
    return [...MOCK_AGENTS];
  },

  /**
   * Action: Resolve or isolate incident
   */
  resolveIncident: async (incidentId: string): Promise<{ success: boolean; message: string }> => {
    await delay(600);
    return {
      success: true,
      message: `Incident ${incidentId} was successfully contained and isolated.`,
    };
  },
};
