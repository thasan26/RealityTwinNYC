# RealityTwinNYC

## AI-Powered Urban Mobility, Transit & Infrastructure Intelligence Platform

![RealityTwin NYC Home](frontend/public/images/home.png)

RealityTwin NYC is a smart city simulation platform that models how pressure spreads across New York City’s transportation and infrastructure systems.

The platform visualizes MTA subway stress, DOT roadway and bridge pressure, borough-level infrastructure risk, weather disruption, pedestrian congestion, and emergency response sensitivity through a modern interactive operations dashboard.

---

## Why I Built This

New York City depends on connected systems: subway lines, bridges, roads, pedestrian corridors, weather-sensitive infrastructure, and emergency response routes.

A problem in one system can quickly affect another.

For example:

- A subway shutdown can increase roadway congestion.
- Heavy rain can slow traffic and increase flood risk.
- A major event near Midtown can create crowd pressure around Penn Station and Times Square.
- Bridge and tunnel congestion can delay emergency response.

RealityTwin NYC was created to explore one question:

> What if city agencies could simulate urban disruption before it spreads?

---

## Core Features

### NYC Operations Stress Score
A live-style city stress score that summarizes pressure across transit, roads, weather, crowd movement, and emergency routing.

![Operations Stress Score](frontend/public/images/home.png)

---

### NYC Infrastructure Operations Layer
A visual infrastructure layer for major city systems including:

- MTA Subway Network
- Midtown Pedestrian Flow
- DOT Bridge & Road Grid
- NYC Flood & Weather Risk

![Infrastructure Layer](frontend/public/images/infrastructure.png)

---

### MTA Transit Intelligence
A subway pulse interface showing major line groups and simulated congestion activity.

Included subway lines:

A/C/E · B/D/F/M · N/Q/R/W · 1/2/3 · 4/5/6/7 · L

![Subway Pulse](frontend/public/images/subway-pulse.png)

---

### Live NYC Operational Pulse
A dashboard showing key infrastructure indicators:

- MTA Transit Stress
- DOT Infrastructure
- Weather Risk
- Crowd Pressure
- Emergency Routing

![Dashboard](frontend/public/images/dashboard.png)

---

### Borough Stress Map
A borough-level stress visualization for:

- Manhattan
- Brooklyn
- Queens
- Bronx
- Staten Island

![Borough Stress Map](frontend/public/images/borough-map.png)

---

### What-If Simulation Engine
Users can test disruption scenarios such as:

- Heavy Rain + Rush Hour
- Subway Line Shutdown
- Major Event at MSG
- Bridge Traffic Incident

![Simulation Engine](frontend/public/images/simulator.png)

---

### AI Operations Insights
The platform generates agency-style recommendations based on simulated urban conditions.

![AI Operations Insights](frontend/public/images/actions.png)

---

## Data & Simulation Logic

RealityTwin NYC currently uses simulated operational indicators to model how urban pressure spreads across connected city systems.

The prototype calculates and visualizes:

- Transit stress percentage
- Infrastructure pressure score
- Weather and flood risk
- Crowd pressure level
- Emergency routing sensitivity
- Borough-level urban stress index
- Scenario-based impact percentages

Future versions can connect live or public datasets from:

- MTA service status data
- NYC Open Data
- 311 service requests
- Traffic speed datasets
- Weather APIs
- Flood risk datasets
- Pedestrian activity datasets

---

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript
- Framer Motion
- Recharts
- Lucide React Icons

---

## What Makes This Project Different

This is not just a basic dashboard.

RealityTwin NYC combines:

- smart city design
- transportation analytics
- infrastructure simulation
- emergency response thinking
- public-sector technology
- professional frontend UI design

The goal is to show how computer science can support real-world city operations and infrastructure planning.

---

## Run Locally

```bash
cd frontend
npm install
npm run dev
