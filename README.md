# dashboard-kanji Frontend

A Vue 3 + Vite SPA that provides the administrative dashboard for the go-kanji platform. It consumes the Go backend, offering OAuth-based login, user management, and activity insights.

## 🧱 Project Structure

```
├── src/
│   ├── components/
│   │   ├── atoms/          # Reusable UI primitives (buttons, cards)
│   │   ├── molecules/      # Composed widgets (tables, stat tiles)
│   │   ├── organisms/      # Larger sections (sidebars, tables)
│   │   └── templates/      # Page layouts (Dashboard shell)
│   ├── pages/              # Route views (Users, Bunpo, Auth)
│   ├── router/             # Vue Router config
│   ├── services/           # HTTP clients (axios)
│   ├── stores/             # Pinia stores (auth state)
│   └── main.js             # App bootstrap
├── public/
├── index.html
└── vite.config.js
```

## 🧪 Tech Stack

- Vue 3 with `<script setup>`
- Vite for bundling
- Pinia for state management
- Vue Router for navigation
- Tailwind CSS for styling
- Axios for API communication

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Point `VITE_BE_API` in `.env` to your backend (`http://localhost:8080` by default).

## 🌟 Features

- Google OAuth flow (handled via backend redirect)
- Sidebar navigation with Material Symbols icons
- User directory with masked emails and Google provider styling
- Per-user activity timeline alongside the directory
- Bunpo page placeholder for future feature development

## 📡 Key Routes

| Route        | Description                          |
|--------------|--------------------------------------|
| `/`          | Dashboard overview                   |
| `/users`     | User directory + activity insight    |
| `/collections` | Placeholder collections view      |
| `/bunpo`     | Bunpo feature placeholder page       |
| `/settings`  | Settings placeholder                 |
| `/login`     | OAuth login entry point              |
| `/auth/callback` | OAuth callback handler          |

## 🛠 Tooling Scripts

- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run preview` – preview prod build locally

## 🤝 Collaboration Tips

- Keep atomic design conventions when adding components.
- Propagate new API endpoints via `services/*` helpers.
- Update route guards if introducing new auth states.

## 🧾 License

MIT (see LICENSE)
