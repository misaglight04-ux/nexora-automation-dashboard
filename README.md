# NEXORA Automation Dashboard

A responsive, interactive frontend demo for the NEXORA portfolio. Built with React, Vite, and lucide-react.

## Features
- Overview dashboard with sample execution metrics.
- Workflow list with search and status filtering.
- Activate/pause controls and simulated manual test runs.
- Create-workflow modal that adds a local demo workflow.
- Clients, Activity, Integrations, and Settings preview sections.
- Responsive navigation for desktop and mobile.

## Important demo disclosure
All metrics, clients, workflow runs, and activity events are sample data held in browser memory. Buttons demonstrate frontend interactions only. This project does not connect to external services, send emails, store customer records on a server, or execute real business automations.

## Requirements
- Node.js 20.19+ or 22.12+ recommended
- npm

## Run locally (Windows PowerShell)
```powershell
npm install
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173).

## Production build
```powershell
npm run build
npm run preview
```
The production output is generated in `dist/` and can be deployed to Netlify. Suggested Netlify settings:
- Build command: `npm run build`
- Publish directory: `dist`

## Portfolio card suggestion
Title: NEXORA Automation Dashboard
Category: BUSINESS AUTOMATION
Description: An interactive workflow management dashboard concept with automation controls, client overview, and activity tracking.
Tags: React, Vite, Workflow UI, Dashboard
Demo URL: your deployed Netlify URL after publishing this project.
