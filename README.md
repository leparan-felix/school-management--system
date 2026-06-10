# ~School Management System

This is a clean, simple web app built to take the headache out of school paperwork. It gives teachers and school staff a single place to track students, organize classes, and view academic progress without drowning in messy spreadsheets.

---

##  What it does

- **Student Tracking:** Easily enroll new students, check attendance, and update grades.
- **Class Management:** Set up course lists, assign teachers to classes, and manage timetables.
- **Easy-to-read Dashboards:** Simple, visual summaries of school data for quick insights.
- **Works on any screen:** The interface automatically adjusts to look great on phones, tablets, and desktops.

---

## Built With

- **Frontend:** React 18 (bundled with Vite for fast loading)
- **Styling:** Modern CSS (Flexbox & Grid layouts)
- **Package Manager:** pnpm / npm

---

##  How to Run it Locally

Want to test the app on your computer? Just follow these steps:

### Before you start
Make sure you have [Node.js](https://nodejs.org) installed on your machine.

### 1. Download the code
```bash
git clone https://github.com/leparan-felix/school-management--system.git
cd school-management--system
```

### 2. Install the packages
```bash
pnpm install
```
*(If you do not use pnpm, just run `npm install` instead)*

### 3. Start the project
```bash
pnpm dev
```
*(Or run `npm run dev`)*

Now, open [http://localhost:5173](http://localhost:5173) in your browser to see the app running live!

### 4. Build for production
To bundle the app into clean, optimized files for deployment:
```bash
pnpm build
```

---

## Folders & Files

```text
├── public/              # Photos, icons, and logos
├── src/
│   ├── components/      # Small, reusable design blocks
│   ├── pages/           # Main screens and dashboards
│   ├── styles/          # Look and feel settings (CSS)
│   ├── App.jsx          # The main application frame
│   └── main.jsx         # The starting point of the app
├── eslint.config.js     # Rules to keep code clean and neat
└── package.json         # Project details and dependencies
```

---



