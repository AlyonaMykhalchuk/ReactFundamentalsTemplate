const services = require("../services");

global.fetch = jest.fn();
global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
};

describe("Service Functions", () => {
    beforeAll(() => {
        global.fetch = jest.fn();
        jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(jest.fn());
        jest.spyOn(window.localStorage.__proto__, 'setItem').mockImplementation(jest.fn());
        jest.spyOn(window.localStorage.__proto__, 'removeItem').mockImplementation(jest.fn());
    });

    beforeEach(() => {
        fetch.mockClear();
        localStorage.getItem.mockClear();
        localStorage.setItem.mockClear();
        localStorage.removeItem.mockClear();
    });


    it("createUser successfully creates a user", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true }),
        });

        await expect(services.createUser({})).resolves.toEqual({ success: true });
        expect(fetch).toHaveBeenCalledWith("http://localhost:4000/register", expect.any(Object));
    });

    it("login successfully logs in a user", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ successful: true, result: "token", user: {} }),
        });

        await expect(services.login({})).resolves.toEqual({ token: "token", user: {} });
        expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    });

    it("getCourses fetches courses successfully", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [{ id: 1, name: "Course 1" }],
        });

        await expect(services.getCourses()).resolves.toEqual([{ id: 1, name: "Course 1" }]);
    });

    it("getAuthors fetches authors successfully", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => [{ id: 1, name: "Author 1" }],
        });

        await expect(services.getAuthors()).resolves.toEqual([{ id: 1, name: "Author 1" }]);
    });

    it("getCurrentUser fetches current user successfully", async () => {
        localStorage.getItem.mockReturnValue("dummyToken");
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ name: "User" }),
        });

        await expect(services.getCurrentUser()).resolves.toEqual({ name: "User" });
        expect(localStorage.getItem).toHaveBeenCalledWith("token");
    });

    it("updateCourseService updates a course successfully", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true }),
        });

        await expect(services.updateCourseService("1", {})).resolves.toEqual({ success: true });
    });

    it("logout logs out the user successfully", async () => {
        fetch.mockResolvedValueOnce({ ok: true });

        await expect(services.logout()).resolves.toBeUndefined();
        expect(localStorage.removeItem).toHaveBeenCalledTimes(2);
    });

    it("deleteCourseService deletes a course successfully", async () => {
        fetch.mockResolvedValueOnce({ ok: true });

        await expect(services.deleteCourseService("1")).resolves.toEqual("1");
    });

    it("createCourse creates a course successfully", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: "1", name: "New Course" }),
        });

        await expect(services.createCourse({})).resolves.toEqual({ id: "1", name: "New Course" });
    });

    it("createAuthor creates an author successfully", async () => {
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ id: "1", name: "New Author" }),
        });

        await expect(services.createAuthor({})).resolves.toEqual({ id: "1", name: "New Author" });
    });
});
