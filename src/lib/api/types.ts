import { ReactNode } from "react";

// Database model for UI Component
export interface DBUIComponent {
  id: string;
  name: string;
  category: string;
  code: string;
  preview: string; // Preview component name
  created_at?: string;
  created_by?: string;
  tags?: string[];
}

// Frontend model (includes rendered preview)
export interface UIComponentWithPreview {
  id: string;
  name: string;
  category: string;
  code: string;
  preview: ReactNode;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ComponentsListResponse {
  components: DBUIComponent[];
  total: number;
}

export interface CategoriesResponse {
  categories: string[];
}
