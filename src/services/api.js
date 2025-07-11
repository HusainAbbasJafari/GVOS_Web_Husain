import axios from "axios";
import { store } from "@/store";
import { setLoading, setError } from "@/store/slices/apiSlice";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    store.dispatch(setLoading(false));
    return response;
  },
  (error) => {
    store.dispatch(setLoading(false));
    store.dispatch(setError(error.response?.data?.message || "Something went wrong"));
    return Promise.reject(error);
  }
);

export async function fetchClientInfo() {
  try {
    const response = await api.get('/client-info');
    return response.data;
  } catch (error) {
    console.error('Error fetching client info:', error);
    return null;
  }
}

export async function fetchSkiProperties(currency) {
  try {
    const response = await api.get('/properties-portfolio/ski', {
      params: {
        currency: currency
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching ski properties:', error);
    return [];
  }
}

export async function fetchMedProperties(currency) {
  try {
    const response = await api.get('/properties-portfolio/med', {
      params: {
        currency: currency
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching med properties:', error);
    return [];
  }
}

export async function fetchFrenchAlpineTowns() {
  try {
    const response = await api.get('/searches/frenchAlpine');
    return response.data;
  } catch (error) {
    console.error('Error fetching frenchAlpine properties:', error);
    return [];
  }
}

export async function fetchFrenchRivieraTowns() {
  try {
    const response = await api.get('/searches/frenchRiviera');
    return response.data;
  } catch (error) {
    console.error('Error fetching frenchRiviera properties:', error);
    return [];
  }
}

export async function fetchLangudocRoussillonTowns() {
  try {
    const response = await api.get('/searches/langudocRoussillon');
    return response.data;
  } catch (error) {
    console.error('Error fetching langudocRoussillon properties:', error);
    return [];
  }
}

export async function fetchMapProperties(type, id, currency, filters) {
  try {
    const response = await api.get(`/searches/properties/${type}/${id}`, {
      params: {
        currency: currency,
        ...filters
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching map properties:', error);
    return [];
  }
}

export async function fetchMasterSearchData() {
  try {
    const response = await api.get('/master-data');
    return response.data;
  } catch (error) {
    console.error('Error fetching master search data:', error);
    return [];
  }
}

export async function fetchSearchProperties(params = {}) {
  try {
    const response = await api.get('/search-properties', {
      params: params 
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching master search data:', error);
    return [];
  }
}

export async function fetchSearchPropertiesList(params = {}) {
  try {
    const response = await api.get('/search-properties-list', {
      params: params 
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching search properties list:', error);
    return [];
  }
}

export async function fetchSearchMapProperties(params = {}) {
  try {
    const response = await api.get('/search-properties', {
      params: params 
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching master search data:', error);
    return [];
  }
}

export async function fetchDevelopment(uuid, selectedCurrency, filters, lead) {
  try {
    const response = await api.get(`/developments/${uuid}`, {
      params: {
        currency: selectedCurrency,
        lead: lead,
        ...filters
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching development data:', error);
    return null;
  }
}

export async function fetchResaleProperty(uuid, selectedCurrency) {
  try {
    const response = await api.get(`/resale-properties/${uuid}`, {
      params: {
        currency: selectedCurrency
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching resale property data:', error);
    return null; 
  }
}

export async function submitLeadForm({ first_name, last_name, phone_number, email, comments, development_uuid, resale_property_uuid, type}) {
  try {
    const response = await api.post('/leads/create', {
      first_name,
      last_name,
      phone_number,
      email,
      comments,
      development_uuid,
      resale_property_uuid,
      type
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting lead form:', error);
    return error;
  }
}

export async function submitContactForm(formData) {
  try {
    const response = await api.post('/contact-us', formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting lead form:', error);
    return error;
  }
}

export async function submitCareersForm({ name, email, location, resume }) {
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('location', location);
    formData.append('resume', resume);
    
    const response = await api.post('/career', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting lead form:', error);
    return error;
  }
}

export async function fetchGuidelines(category) {
  try {
    const response = await api.get(`/guidelines/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching guidelines data:', error);
    return null; 
  }
}

export async function joinNewsletter(email) {
  try {
    const response = await api.post('/join-newsletter', { email });
    return response.data;
  } catch (error) {
    console.error('Error joining newsletter:', error);
    return error;
  }
}

export async function fetchAreaGuideMenu() {
  try {
    const response = await api.get(`/area-guides`);
    return response.data;
  } catch (error) {
    console.error('Error fetching area guide data:', error);
    return null;
  }
}
export async function fetchAreaGuide(uuid) {
  try {
    const response = await api.get(`/area-guides/${uuid}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching area guide data:', error);
    return null;
  }
}

export async function fetchAreaGuideList({type } = {}) {
  try {
    const response = await api.get(`/area-guides`, {
      params: {
        type
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching area guide data:', error);
    return null;
  }
}

export async function fetchRegionOptions() {
  try {
    const response = await api.get(`/locations/regions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching region options:', error);
    return [];
  }
}

export async function fetchDepartmentsByRegion(regionIds) {
  try {
    const response = await api.get(`/locations/departments?region=${regionIds}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching departments by region:', error);
    return [];
  }
}

export async function fetchCantonsByDepartment(params = {}) {
  try {
    const response = await api.get('/locations/cantons', {
      params
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cantons by department:', error);
    return [];
  }
}

export async function fetchAreasOptions() {
  try {
    const response = await api.get(`/locations/areas`);
    return response.data;
  } catch (error) {
    console.error('Error fetching areas options:', error);
    return [];
  }
}

export async function fetchSubAreasByArea(params = {}) {
  try {
    const response = await api.get('/locations/sub-areas', {
      params
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cantons by department:', error);
    return [];
  }
}

export async function fetchTownsBySubArea(params = {}) {
  try {
    const response = await api.get('/locations/towns', {
      params
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cantons by department:', error);
    return [];
  }
}

export async function fetchPortfolioCount() {
  try {
    const response = await api.get(`/portfolio/count`);
    return response.data;
  } catch (error) {
    console.error('Error fetching portfolio count:', error);
    return [];
  }
}

export async function fetchAdvisorCount() {
  try {
    const response = await api.get(`/advisors/count`);
    return response.data;
  } catch (error) {
    console.error('Error fetching advisor count:', error);
    return [];
  }
}
export async function fetchCurrencies() {
  try {
    const response = await api.get(`/currencies`);
    return response.data;
  } catch (error) {
    console.error('Error fetching currencies:', error);
    return [];
  }
}
export async function fetchOverviewStats() {
  try {
    const response = await api.get(`/overview-stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching overview stats:', error);
    return [];
  }
}

export async function submitCallBack({ first_name, last_name, phone_number, email, comments, action}) {
  try {
    const response = await api.post('/callback', {
      first_name,
      last_name,
      phone_number,
      email,
      comments,
      action,
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting callback form:', error);
    return error;
  }
}

export default api;