# Student Survival Kit — React Edition

A responsive student productivity dashboard built with React, Vite, React Router, JavaScript, and CSS. The interface uses a professional dark theme with purple and teal accents.

## Features

- Login and demo login (local browser demo; not production authentication)
- Student dashboard with quick access and upcoming deadlines
- Study Hub with sample revision prompts and learning resources
- Pomodoro focus timer
- Book Library with search and favorites
- Budget calculator
- Attendance calculator
- CGPA calculator
- To-do list with browser persistence
- Events and clubs (sample events)
- Transport information and campus map illustration
- Lost & Found demo
- Emergency resource cards (verify details before relying on them)
- Reviews and feedback
- Student Assistant with predefined responses
- Study planner and assignment timeline
- Packing checklist
- Campus Food Guide with sample data
- Team Finder with sample listings

## Run locally

1. Install Node.js (LTS recommended).
2. Extract this folder and open it in VS Code.
3. Open Terminal in this project folder, the one containing `package.json`.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL Vite prints in the terminal (usually `http://localhost:5173`).

To create a production build, run `npm run build`.

## Project structure

```text
student-survival-kit-react/
├── index.html
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles.css
    ├── dark-theme.css
    ├── utils.js
    ├── components/
    │   └── Layout.jsx
    └── pages/
        ├── Auth.jsx
        └── Pages.jsx
```

## Notes

- Most saved data is stored in browser Local Storage on the current device.
- Login/sign-up are demonstration-only. Passwords are stored in browser Local Storage and must not be used for real accounts.
- Event entries, food information, team listings, transport information, campus map details, and chatbot responses contain sample/demo content. Replace them with verified information before public use.
- The weather and job/internship features from the future Evaluation 3 roadmap have not been integrated in this version.
