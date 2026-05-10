import React, { createContext, useContext, useEffect, useState } from 'react';
import { STORE_PRODUCTS as initialProducts, PROJECTS as initialProjects, COURSES as initialCourses, INTERNSHIPS as initialInternships, ECOSYSTEMS as initialEcosystems } from '../data/mockData';

type DataContextType = {
  products: any[];
  projects: any[];
  courses: any[];
  internships: any[];
  ecosystems: any[];
  loading: boolean;
};

const DataContext = createContext<DataContextType>({
  products: [],
  projects: [],
  courses: [],
  internships: [],
  ecosystems: initialEcosystems,
  loading: true,
});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [internships, setInternships] = useState<any[]>([]);
  const [ecosystems, setEcosystems] = useState<any[]>(initialEcosystems);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const statusRes = await fetch('/api/sheets/config-status');
        const status = await statusRes.json();
        
        if (status.configured) {
          const promises = [];
          
          promises.push(fetch('/api/data/products').then(res => res.json()).then(data => { if(data && !data.error && data.length) setProducts(data) }).catch(e => console.error(e)));
          promises.push(fetch('/api/data/projects').then(res => res.json()).then(data => { if(data && !data.error && data.length) setProjects(data) }).catch(e => console.error(e)));
          promises.push(fetch('/api/data/courses').then(res => res.json()).then(data => { if(data && !data.error && data.length) setCourses(data) }).catch(e => console.error(e)));
          promises.push(fetch('/api/data/internships').then(res => res.json()).then(data => { if(data && !data.error && data.length) setInternships(data) }).catch(e => console.error(e)));
          
          await Promise.all(promises);
        } else {
          // Fallback to mock data if not configured
          setProducts(initialProducts);
          setProjects(initialProjects);
          setCourses(initialCourses);
          setInternships(initialInternships);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        // Fallback to mock data on error
        setProducts(initialProducts);
        setProjects(initialProjects);
        setCourses(initialCourses);
        setInternships(initialInternships);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ products, projects, courses, internships, ecosystems, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
