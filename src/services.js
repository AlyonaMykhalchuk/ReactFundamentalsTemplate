export const createUser = async (data) => {
  try {
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response?.ok) {
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

export const getCurrentUser = async () => {
  if (!localStorage.getItem("token")) {
    console.log("No token found");
    // Optionally, dispatch an action to handle this scenario
    return;
  }
  try {
    const response = await fetch("http://localhost:4000/users/me", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch current user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

export const updateCourseService = async (courseId, courseData) => {
  const response = await fetch(`http://localhost:4000/courses/${courseId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(courseData),
  });

  if (!response.ok) {
    throw new Error("Failed to update course");
  }

  return await response.json();
};

export const logout = async () => {
  try {
    // Assuming you have a backend endpoint to call for logout
    const response = await fetch("http://localhost:4000/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Include the authorization token if your backend requires it
        Authorization: `${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    // Clear local storage after successful logout
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
  } catch (error) {
    console.error("Error logging out:", error);
    throw error; // Re-throw the error if needed
  }
};

export const deleteCourseService = async (courseId) => {
  const response = await fetch(`http://localhost:4000/courses/${courseId}`, {
    method: "DELETE",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete course");
  }

  return courseId;
};

export const createCourse = async (courseData) => {
  const response = await fetch("http://localhost:4000/courses/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(courseData),
  });

  if (!response.ok) {
    throw new Error("Failed to create course");
  }

  return await response.json();
};

export const createAuthor = async (authorData) => {
  const response = await fetch("http://localhost:4000/authors/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(authorData),
  });

  if (!response.ok) {
    throw new Error("Failed to create author");
  }

  return await response.json();
};
