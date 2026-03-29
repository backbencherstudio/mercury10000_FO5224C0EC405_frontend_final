import {
  HomeIcon, SecondaryHome,
  User, UserSecondary,LeadIcon,LeadHistorySecondaryIcon,LeadHistoryIcon,LeadSecondaryIcon, ConnectionIcon, RewardIcon, RewardSecondaryIcon, SupportIcon, SupportSecondaryIcon, SettingsIcon, SettingsSecondaryIcon 
  , ConnectionSecondaryIcon,
  PenIcon,
  PenSecondaryIcon
} from '@/components/icons/sidebar/SidebarIcons';
import { UsersIcon } from 'lucide-react';
import { ComponentType } from 'react';

export interface MenuItem {
  id: string;
  name: string;
  href: string;
  icon: ComponentType<{ className?: string; isActive?: boolean }>;
  secondaryIcon: ComponentType<{ className?: string; isActive?: boolean }>;
  description: string;
  category: string;
}

export type UserRole = 'admin' | 'secretary' ;

export const menuConfig: Record<UserRole, MenuItem[]> = {
  admin: [
    {
      id: 'dashboard',
      name: 'Dashboard',
      href: '/dashboard',
      icon: HomeIcon,
      secondaryIcon: SecondaryHome,
      description: 'Dashboard',
      category: 'Dashboard'
    },
    {
      id: 'user',
      name: 'User',
      href: '/dashboard/user',
      icon: User,
      secondaryIcon: UserSecondary,
      description: 'User',
      category: 'User'
    },
    {
      id: 'lead',
      name: 'Lead',
      href: '/dashboard/lead',
      icon: LeadIcon,
      secondaryIcon: LeadSecondaryIcon,
      description: 'Lead',
      category: 'Lead'
    },
    {
      id: 'lead-history',
      name: 'Lead History',
      href: '/dashboard/lead-history',
      icon: LeadHistoryIcon,
      secondaryIcon: LeadHistorySecondaryIcon,
      description: 'Lead History',
      category: 'Lead'
    },
    {
      id: 'connection',
      name: 'Connection',
      href: '/dashboard/connection',
      icon: ConnectionIcon,
      secondaryIcon: ConnectionSecondaryIcon,
      description: 'Connection',
      category: 'Connection'
    },
    {
      id: 'reward',
      name: 'Reward',
      href: '/dashboard/reward',
      icon: RewardIcon,
      secondaryIcon: RewardSecondaryIcon,
      description: 'Reward',
      category: 'Reward'
    },
    {
      id: 'support',
      name: 'Support',
      href: '/dashboard/support',
      icon: SupportIcon,
      secondaryIcon: SupportSecondaryIcon,
      description: 'Support',
      category: 'Support'
    },
    {
      id: 'settings',
      name: 'Settings',
      href: '/dashboard/settings',
      icon: SettingsIcon,
      secondaryIcon: SettingsSecondaryIcon,
      description: 'Settings',
      category: 'Settings'
    }
  ],
  secretary: [
    {
      id: 'secretary-dashboard',
      name: 'Dashboard',
      href: '/secretary-dashboard',
      icon: HomeIcon,
      secondaryIcon: SecondaryHome,
      description: 'Dashboard',
      category: 'Administration'
    },
    {
      id: 'write-note',
      name: 'Write Note',
      href: '/secretary-dashboard/write-note',
      icon: PenIcon,
      secondaryIcon: PenSecondaryIcon,
      description: 'Write notes',
      category: 'Academic'
    },
    {
      id: 'lead-history',
      name: 'Lead History',
      href: '/secretary-dashboard/lead-history',
      icon: LeadHistoryIcon,
      secondaryIcon: LeadHistorySecondaryIcon,
      description: 'Lead History',
      category: 'Academic'
    }
  ],
  
   
 
};

export const getMenuItemsByRole = (role: UserRole | string): MenuItem[] => {
  return menuConfig[role as UserRole] || [];
};

export const getAvailableRoles = (): UserRole[] => {
  return ['admin', 'secretary'];
};

export const getCategoriesByRole = (role: UserRole | string): string[] => {
  const items = getMenuItemsByRole(role);
  const categories = new Set(items.map(item => item.category));
  return Array.from(categories);
};

export const getMenuItemsGroupedByCategory = (role: UserRole | string): Record<string, MenuItem[]> => {
  const items = getMenuItemsByRole(role);
  const grouped: Record<string, MenuItem[]> = {};
  items.forEach(item => {
    if (!grouped[item.category]) {
      grouped[item.category] = [];
    }
    grouped[item.category].push(item);
  });
  return grouped;
};

export const isValidRole = (role: string): role is UserRole => {
  return ['admin', 'secretary'].includes(role);
};
