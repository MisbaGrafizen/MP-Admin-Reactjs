
export const saveToLocalStorage = (key, data) => {
    try {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(key, jsonData);
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  };
  
  export const getFromLocalStorage = (key) => {
    try {
      const jsonData = localStorage.getItem(key);
      return jsonData ? JSON.parse(jsonData) : null;
    } catch (error) {
      console.error("Error getting data from localStorage", error);
      return null;
    }
  };
  
  export const removeFromLocalStorage = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing data from localStorage", error);
    }
  };
  