import React from 'react';
import {
  Laptop,
  FileText,
  Dumbbell,
  BookOpen,
  ShoppingCart,
  Briefcase,
  User,
  CheckSquare,
  LayoutDashboard,
  Clock,
  CheckCircle2,
  Calendar,
  Pencil,
  Trash2,
  Plus,
  Search,
  Sun,
  Moon,
  AlignLeft,
  Sparkles,
  MoreHorizontal,
  Check,
  LayoutGrid,
  AlertCircle,
  X,
  RefreshCw,
  FolderPlus,
  Menu
} from 'lucide-react';

const ICON_MAP = {
  Laptop,
  FileText,
  Dumbbell,
  BookOpen,
  ShoppingCart,
  Briefcase,
  User,
  CheckSquare,
  LayoutDashboard,
  Clock,
  CheckCircle2,
  Calendar,
  Pencil,
  Trash2,
  Plus,
  Search,
  Sun,
  Moon,
  AlignLeft,
  Sparkles,
  MoreHorizontal,
  Check,
  LayoutGrid,
  AlertCircle,
  X,
  RefreshCw,
  FolderPlus,
  Menu
};

export const LucideIcon = ({ name, size = 18, color, className = '', strokeWidth = 2, ...props }) => {
  const Component = ICON_MAP[name] || CheckSquare;
  return <Component size={size} color={color} className={className} strokeWidth={strokeWidth} {...props} />;
};
