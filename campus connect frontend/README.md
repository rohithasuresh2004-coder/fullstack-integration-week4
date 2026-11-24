# CampusConnect – Front-End (Week 2)

Responsive front-end for the **CampusConnect Placement & Internship Portal**, built with **HTML5, CSS3 and vanilla JavaScript (ES6)**. It follows the plan and wireframes from Week 1 and uses mock data until the Node/Express/MongoDB back-end is connected in Week 3.

## Pages (all interconnected)
| Page | File | Purpose |
|---|---|---|
| Landing page | `index.html` | Hero, stats, how it works, latest openings |
| Login / Register | `login.html` | Tabbed form with live validation |
| Job listing | `jobs.html` | Search, type and location filters |
| Job detail | `job.html?id=1` | Full job info, Apply button |
| Dashboard | `dashboard.html` | KPIs, profile progress, applications table, recommendations |

## How to run locally
1. Download or clone this repository.
2. Open the folder and double-click **`index.html`** (any modern browser). No installation is needed.
3. Optional local server: `npx serve .` or the VS Code **Live Server** extension.

**Try it:** click *Login / Register* → *Register* → enter any name, a valid email and a 6+ character password → browse jobs → open a job → *Apply now* → check the *Dashboard*.

## Development process
1. **Setup:** created the folder structure (`css/`, `js/`) and Git repository.
2. **Design:** translated the Week 1 wireframes into a mobile-first layout with CSS variables for colours.
3. **Components:** built the reusable header, footer, cards, badges, forms, tables and toast notification.
4. **Interactivity:** added JavaScript for validation, search and filters, applying to jobs, status tracking and a mobile menu.
5. **Testing:** simulated user flows in a headless browser (login redirect, validation, search, apply, duplicate prevention, unknown job id, mobile width) with no console errors.

## Design patterns and techniques
- **Mobile-first responsive design** with CSS Grid, Flexbox and media queries (breakpoint 760 px).
- **Modular code:** `common.js` (shared helpers), one script per page, `data.js` (mock data).
- **Module-style objects** (`Store`, `Auth`, `Apps`) separate storage logic from the UI.
- **Progressive state** saved in `localStorage` (login and applications persist on refresh).
- **Security basics:** all dynamic text is escaped (`esc()`) to prevent XSS.
- **No external libraries**, so the app loads fast and has no dependencies.

## Accessibility
Skip-to-content link · semantic landmarks (`header`, `nav`, `main`, `footer`) · labelled form fields with `role="alert"` errors · visible focus outlines · ARIA (`aria-current`, `aria-expanded`, `role="tablist"`, `aria-live`) · colour contrast checked · `prefers-reduced-motion` respected.

## Folder structure
```
campusconnect-frontend/
├── index.html  login.html  jobs.html  job.html  dashboard.html
├── css/style.css
├── js/ data.js  common.js  login.js  jobs.js  detail.js  dashboard.js
├── screenshots/
└── README.md
```

## Next steps (Week 3)
Replace `data.js` and `localStorage` with REST API calls to the Express/MongoDB back-end, add JWT authentication, resume upload and the recruiter and admin screens.

**Author:** Rohitha S
