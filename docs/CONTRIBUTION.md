Contributing to the Frontend
Welcome to the frontend development guide. This document outlines the standardized contribution workflow for building views in our project.

🔧 Architecture Overview
This frontend project implements a server-side routing layer that renders and returns fully ready HTML views for any route.

All initial content is server-rendered (SSR) via server/pages/.

Link clicks are intercepted for client-side routing.

Views are hydrated using content from IndexedDB:

If the content is missing or write-shared (e.g. collaborative editing), it syncs via WebSocket using a network-first strategy.

🚀 Development Workflow
Follow the steps below when implementing or modifying a view.

1. Add Localized Content
Create or update translations for the view:

text
Kopioi
Muokkaa
i18n/<view-name>/
├── fi.json
├── en.json
└── sv.json
2. Server-Side Rendering (SSR)
Define the SSR logic that returns the HTML for the route:

text
Kopioi
Muokkaa
server/pages/<view-name>.js
The exported function should return a complete and accessible HTML view.

3. Client-Side Rendering
Define the client-side DOM rendering logic:

text
Kopioi
Muokkaa
client/views/<view-name>.js
This script should build and inject the DOM nodes into the #shell or appropriate container.

4. Hydration Logic
Implement hydration logic for the view:

text
Kopioi
Muokkaa
client/events/<view-name>.js
This includes:

Fetching cached content from IndexedDB.

Revalidating via WebSocket (if collaborative or missing locally).

Attaching interactive behavior.

5. Testing
Ensure:

Server-rendered view is correct and self-contained.

Client-side routing and hydration work under:

Fresh load

Offline mode

Collaborative sync

Accessibility, responsiveness, and error cases are handled.

💾 Committing Changes
Use clear commit messages following this format:

$)

git add .
git commit -m "<View Name>: <Task Description> done"
Example:

$)

git commit -m "Dashboard: SSR + hydration done"
🚀 Pushing and Opening a PR
Push changes to your personal branch named after your first name:

$)

git push -u origin main <yourFirstName>
Then, open a Pull Request in GitHub from <yourFirstName> → main.

🧪 Example Directory Structure
text
Kopioi
Muokkaa
i18n/
└── dashboard/
    ├── fi.json
    ├── sv.json
    └── en.json

server/pages/
└── dashboard.js

client/views/
└── dashboard.js

client/events/
└── dashboard.js
📎 Notes
Views must be self-contained and avoid global state pollution.

All WebSocket sync logic must fallback gracefully offline.

Keep i18n, SSR, view rendering, and hydration modular and decoupled.

This structure guarantees scalability, offline-first UX, and testability.

Let us know if you find any ambiguity or want to suggest improvements.