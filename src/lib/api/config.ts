// API Configuration
export const API_CONFIG = {
  // Backend API URL
  baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api",
  
  // Set to false to use real database
  useMockData: false,
  
  // API endpoints
  endpoints: {
    components: "/components",
    categories: "/categories",
    componentById: (id: string) => `/components/${id}`,
    search: "/components/search",
  },
};
