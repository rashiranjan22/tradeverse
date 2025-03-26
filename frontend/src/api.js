const API_URL = "http://127.0.0.1:5000";  // Remove `/auth/api`

export const signupUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/auth/api/signup`, {  // Use the base URL
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Signup failed");
        }

        return data; // Return the API response
    } catch (error) {
        console.error("Signup error:", error);
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/auth/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',  // REQUIRED for cookies
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Login failed");
        }
        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};




export const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`${API_URL}/leaderboard/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',  // REQUIRED for cookies
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }
      
      return await response.json();
    } catch (error) {
      console.error("Leaderboard fetch error:", error);
      throw error;
    }
  };



  // Add to your existing API functions
  export const fetchTransactions = async () => {
    try {
      const response = await fetch(`${API_URL}/buysell/api/transactions`, {
        method: "GET",
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const text = await response.text();
      console.log("Raw response:", text); // Debug the raw response
      
      try {
        return JSON.parse(text);
      } catch (jsonError) {
        console.error("Failed to parse JSON:", jsonError);
        throw new Error("Invalid JSON response from server");
      }
    } catch (error) {
      console.error("Network error:", error);
      throw error;
    }
  };