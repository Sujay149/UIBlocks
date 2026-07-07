// API Configuration
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const API_CONFIG = {
  // Backend API URL
  baseUrl: apiBaseUrl !== undefined ? apiBaseUrl : "https://uiblocks.onrender.com",
  
  // Set to false to use real database
  useMockData: false,
  
  // API endpoints
  endpoints: {
    components: "/api/components",
    categories: "/api/categories",
    componentById: (id: string) => `/api/components/${id}`,
    search: "/api/components/search",
  },
};
