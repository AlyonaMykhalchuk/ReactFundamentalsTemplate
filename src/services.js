export const createUser = async (data) => {
  try {
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const login = async (data) => {
  try {
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const { successful, result, user } = await response.json();

    if (successful && result) {
      localStorage.setItem("token", result);
      localStorage.setItem("userData", JSON.stringify(user));
      return { token: result, user };
    } else {
      throw new Error("Login failed: No result or unsuccessful");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getCourses = async () => {
  try {
    const response = await fetch("http://localhost:4000/courses/all");
    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const getAuthors = async () => {
  try {
    const response = await fetch("http://localhost:4000/authors/all");
    if (!response.ok) {
      throw new Error("Failed to fetch authors");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching authors:", error);
    throw error;
  }
};

export const getCurrentUser = () => {
  try {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error retrieving current user:", error);
    return null;
  }
};

export const updateCourseService = async () => {
  // write your code here
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
  // Optionally redirect the user to the login page or update the state to reflect logout
};

export const deleteCourseService = async () => {
  // write your code here
};

export const createCourse = async () => {
  // write your code here
};

export const createAuthor = async () => {
  // write your code here
};
