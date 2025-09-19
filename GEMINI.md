# Gemini Project: popules
This file contains project-specific information and memories for Gemini.

# Project Requirements
1) Use Vue JS framework (Typescript). - **Completed**
2) follow ECMAScript 2015 (ES6) standards or newer - **Completed**
3) Use Tailwind CSS to ease UI development - **Completed**
4) Apply infinite scroll - **Not Completed**
5) Create a simple test case using a testing tool like Vitest for components you’ve made. - **Completed**



## Theme
- Violet - **Completed**

**Key Tools & Technologies**:
* Agentic AI Interface: Gemini CLI
* Development Environment: Zen MCP
* Front-end: Nuxt.js
* CSS Framework: Tailwind + Flowbite

## Unique Categories from API
- fitness
- vacancies
- makeup
- finance
- cars
- travel
- workplace
- design



## Credentials Plan
**Step 1: Create the authentication middleware**
*   Create a new file `middleware/auth.global.ts`. - **Completed**
*   In this middleware, I will check for a dummy email and password in the cookies.
*   If the user is authenticated, I will set a `isAuthenticated` flag in the route meta.
*   Use `components/Login.vue`, (email: admin@jobstore.com) (password: 123qwe)

**Step 2: Update `Navbar.vue` to use the authentication status**
*   I will read the `isAuthenticated` flag from the route meta. - **Completed**
*   I will use this flag to conditionally show/hide the "Following" link in the navbar. - **Completed**

