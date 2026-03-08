# Simple Auth Learning App

This is a very small full-stack Node/Express app to help you learn how web applications work: routing, backend logic, templating, and basic authentication.

It has:

- A **login page** at `/login`
- A **signup page** at `/register`
- A **password-protected home page** at `/home` that says `Welcome home, "user_name"` once you are logged in

User accounts are stored **in memory only** so you can see the logic clearly. When the server restarts, the list of users resets. In a production app you would replace this with a real database.

## Prerequisites

1. Install Node.js (which includes `npm`):
   - Go to the official Node website and download the LTS version for Windows.
   - During installation, make sure the option to add Node to your PATH is enabled.
2. After installation, open a new terminal and run:

```bash
node -v
npm -v
```

You should see version numbers (no errors).

## Install dependencies

In a terminal, change into this project folder and run:

```bash
npm install
```

This will install:

- `express` – web framework / routing
- `express-session` – session-based login
- `ejs` – server-side templates for HTML pages
- `bcrypt` – secure password hashing

## Run the app locally

From the project folder:

```bash
npm start
```

Then open your browser at:

```text
http://localhost:3000
```

Flow:

1. Visit `/login` or `/register`.
2. Create an account on `/register`.
3. After signup or login, you are redirected to `/home` which shows: **Welcome home, `your_username`!**
4. Use the **Log out** button to end the session.

## How it works (high level)

- `server.js`:
  - Creates an Express app.
  - Configures sessions so each browser has its own login state.
  - Stores users in a simple in-memory array.
  - Defines routes for `/login`, `/register`, `/home`, and `/logout`.
- `views/*.ejs`:
  - Templates for the HTML pages rendered by Express.
- `public/styles.css`:
  - Basic styling to make the pages look clean and modern.

## Making it live (deployment idea)

Later, when you're ready, you can:

1. Put this folder in a git repository.
2. Push it to a GitHub repository.
3. Use a hosting platform that supports Node.js (for example, Render or Railway).
4. Configure the service so:
   - **Build command**: `npm install`
   - **Start command**: `npm start`
   - **Port**: use the default; the app reads `PORT` from `process.env.PORT` or falls back to `3000`.

The hosting provider will give you a public URL where your app (including the backend) is live.

