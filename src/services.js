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
      return user.name;
    } else {
      throw new Error("Login failed: No result or unsuccessful");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getCourses = async () => {
  // write your code here
};

export const getAuthors = async () => {
  // write your code here
};

export const getCurrentUser = async () => {
  // write your code here
};

export const updateCourseService = async () => {
  // write your code here
};

export const logout = async () => {
  // write your code here
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
