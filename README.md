YOLO.id is a simple and functional event management platform that allows event organizers to create and
promote events, while attendees can browse and buy tickets for those events (involves CRUD function.)

Features:
* Homepage:
- Filters events by category or location
- Search bar with debounce
- Pagination to limit displayed events.
  
* Event Detail:
- Shows time, date, location, ticket price.
- Data stored in MySQL.UseEffect and REST API for data fetching.
  
* Event Transaction and Promotion:
- Organizers create events with details: name, price, date, time, location, description, ticket types.
- Uses React-Quill for text-input (WYSIWYG editor). Uses HTML-React Parser for displaying descriptions.
- Payment simulation with Midtrans Gateway (QRIS/Virtual Account).

* Authentication and Authorization:
- JWT and BCrypt for user sign-in and registration.
  
Tech Stack: REST API, Next.js, TypeScript, Tailwind CSS, Prisma ORM, Midtrans Payment Gateway.
<br/>
<img src="https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" height="50">
<img src="https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3"  height="50">
<img src="https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript"  height="50">
<img src="https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black" height="50">
<img src="https://img.shields.io/badge/-Next.js-000000?style=flat-square&logo=nextdotjs" height="50">
<img src="https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=nodedotjs" height="50">
<img src="https://img.shields.io/badge/-MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white" height="50">
<img src="https://img.shields.io/badge/-Express.js-000000?style=flat-square&logo=express&logoColor=white" height="50">

## Contributors

| Name                  | Role               |
|-----------------------|--------------------|
| Adrian Irawan         | Front-end Engineer |
| Trian Verson Tumanan  | Back-end Engineer  |


# Purwadhika Project Repository

This project uses React.js with NextJS for the frontend, Express.js for the backend, and TurboRepo for monorepo management, facilitating rapid development of a scalable web application with streamlined collaboration and efficient server-client interactions.

## Available Scripts

### `npm run dev`

Runs the app in the development mode.

Open [http://localhost:5173](http://localhost:5173) to view it in the browser. For API, you can access it in [http://localhost:8000/api](http://localhost:8000/api). The app will reload if you make edits.

### `npm run build`

Builds the app for production to the `dist` folder for each project.

### `npm run serve`

Runs the app in the production mode.

### `npm run <task> --workspace=<app-name>`

Run command on specific app (install package, run test, etc).

### `npm run <task> --workspace=<app-name> -- --<option>`

Run command on specific app with options.

Example : `npm run seqeulize --workspace=api -- --db:migrate`

# Rules

## Commit & Pull Request

- Always use [conventional commit message](https://www.conventionalcommits.org/en/v1.0.0/) when committing changes or creating pull request
- **"Squash and Merge"** your pull request to main branch

## Naming Convention

### REST API

- Always use [REST API naming convention](https://restfulapi.net/resource-naming/)

### File Naming Conventions:

1. **Use CamelCase for filenames:**
   - Begin filenames with a lowercase letter.
   - For multiple words, capitalize the first letter of each subsequent word.
   - Example: `index.js`, `userModel.js`, `dataAccess.js`

2. **Use Descriptive Names:**
   - Choose names that accurately describe the file's purpose or content.
   - Avoid overly generic names like `utils.js` unless the file genuinely contains utility functions.

3. **Follow Naming Conventions for Specific File Types:**
   - For configuration files, use names like `.env`, `config.js`, or `settings.json`.
   - Use consistent naming for test files, such as appending `.test.js` or `.spec.js` to the filename being tested.
   - Use `package.json` for the project's metadata and dependencies.

4. **Separate Concerns with File Naming:**
   - Follow a modular structure for different concerns (e.g., `userController.js`, `userService.js`, `userModel.js` for a user-related module).

### Folder Naming Conventions:

1. **Use Singular or Plural Naming:**
   - Choose a consistent convention for naming folders (e.g., `models` or `model`, `routes` or `route`).

2. **Avoid Special Characters and Spaces:**
   - Use hyphens (`-`) or underscores (`_`) for separating words in folder names, but avoid spaces or special characters.

3. **Use Descriptive Names for Folders:**
   - Name folders according to their content or purpose (e.g., `controllers`, `services`, `utils`, `tests`, `public`, `views`, etc.).

4. **Nested Folder Structure:**
   - Create a logical and organized folder structure based on the project's architecture.
   - For larger projects, consider organizing files by features/modules (Feature-Based Structure) or layer-based (Layered Structure).
