import { useQuery } from "@tanstack/react-query";
import { fetchComponents, fetchCategories, searchComponents, fetchComponentById } from "@/lib/api/componentService";
import * as SampleComponents from "@/components/gallery/SampleComponents";
import { UIComponentWithPreview, DBUIComponent } from "@/lib/api/types";
import { DynamicPreview } from "@/components/gallery/DynamicPreview";
import React from "react";

// Map database component to component with preview
const getPreviewForComponent = (dbComponent: DBUIComponent): UIComponentWithPreview => {
  // Get the preview component from SampleComponents using the preview name
  const PreviewComponent = (SampleComponents as any)[dbComponent.preview];
  
  return {
    id: dbComponent.id,
    name: dbComponent.name,
    category: dbComponent.category,
    code: dbComponent.code,
    preview: PreviewComponent 
      ? React.createElement(PreviewComponent) 
      : React.createElement(DynamicPreview, { code: dbComponent.code, previewName: dbComponent.preview }),
  };
};

// Hook to fetch all components
export const useComponentsList = (category?: string) => {
  return useQuery({
    queryKey: ["components", category || "all"],
    queryFn: async () => {
      const response = await fetchComponents(category);
      return response.components.map(getPreviewForComponent);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to fetch single component
export const useComponent = (id: string) => {
  return useQuery({
    queryKey: ["component", id],
    queryFn: async () => {
      const component = await fetchComponentById(id);
      if (!component) return null;
      return getPreviewForComponent(component);
    },
    enabled: !!id,
  });
};

// Hook to fetch categories
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetchCategories();
      return response.categories;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for searching components
export const useSearchComponents = (query: string) => {
  return useQuery({
    queryKey: ["components", "search", query],
    queryFn: async () => {
      if (!query.trim()) {
        const response = await fetchComponents();
        return response.components.map(getPreviewForComponent);
      }
      const response = await searchComponents(query);
      return response.components.map(getPreviewForComponent);
    },
    enabled: query.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
