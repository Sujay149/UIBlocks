import { API_CONFIG } from "./config";
import { DBUIComponent, ComponentsListResponse, CategoriesResponse } from "./types";
import { componentLibrary, categories } from "@/components/gallery/SampleComponents";

// Convert existing components to DB format for mock data
const getMockComponents = (): DBUIComponent[] => {
  return componentLibrary.map((comp) => ({
    id: comp.id,
    name: comp.name,
    category: comp.category,
    code: comp.code,
    preview_type: comp.id, // Use ID as preview type key
  }));
};

const getMockCategories = (): string[] => {
  return categories;
};

// Fetch all components
export const fetchComponents = async (category?: string): Promise<ComponentsListResponse> => {
  if (API_CONFIG.useMockData) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    let components = getMockComponents();
    if (category && category !== "All") {
      components = components.filter((c) => c.category === category);
    }
    
    return {
      components,
      total: components.length,
    };
  }

  // Real API call when ready
  const url = category && category !== "All"
    ? `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.components}?category=${encodeURIComponent(category)}`
    : `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.components}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch components: ${response.statusText}`);
  }
  
  return response.json();
};

// Fetch single component by ID
export const fetchComponentById = async (id: string): Promise<DBUIComponent | null> => {
  if (API_CONFIG.useMockData) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const component = getMockComponents().find((c) => c.id === id);
    return component || null;
  }

  const response = await fetch(
    `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.componentById(id)}`
  );
  
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Failed to fetch component: ${response.statusText}`);
  }
  
  return response.json();
};

// Fetch all categories
export const fetchCategories = async (): Promise<CategoriesResponse> => {
  if (API_CONFIG.useMockData) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return { categories: getMockCategories() };
  }

  const response = await fetch(
    `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.categories}`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }
  
  return response.json();
};

// Search components by name or category
export const searchComponents = async (query: string): Promise<ComponentsListResponse> => {
  if (API_CONFIG.useMockData) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    const lowerQuery = query.toLowerCase();
    const components = getMockComponents().filter(
      (c) =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.category.toLowerCase().includes(lowerQuery)
    );
    
    return {
      components,
      total: components.length,
    };
  }

  const response = await fetch(
    `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.components}?search=${encodeURIComponent(query)}`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to search components: ${response.statusText}`);
  }
  
  return response.json();
};
