# LapShop — Frontend (Angular)

## Overview

This document describes the **baseline** version of **LapShop** — the Angular 17 e-commerce frontend used in this research before any optimization was applied. The baseline is the working application used to measure and compare performance improvements after applying optimizations (lazy loading, code splitting, image optimization and other techniques).

---
## Purpose of the baseline

* Provide a functional, full-featured e-commerce application (LapShop) with standard user and admin workflows.
* Serve as the control for empirical performance testing (Google Lighthouse, WebPageTest, Web Vitals).
* Expose common real-world performance bottlenecks that optimization techniques aim to address.

---

## Key Features (Baseline)

* User-facing storefront: product listing, product details, search and filters.
* Shopping cart and checkout flow.
* User authentication: login / register / profile.
* Role-based views: Customer (user) and Admin (product/order management).
* Admin CRUD operations for products and orders.
* Responsive UI built with Angular and Angular Material components.
* Basic client-side routing (some routes eagerly loaded).

---

## Performance testing & benchmarking (baseline)

Recommended tools to capture baseline metrics:

* Google Lighthouse (Chrome DevTools) — generate and save JSON reports for comparison.
* WebPageTest (webpagetest.org) — test real-world network and geolocation conditions.
* Chrome Web Vitals extension — quick, in-browser metrics.

When measuring, ensure you use the same device/network throttling and test the same pages for fair pre/post comparisons.

---

## Tech stack

* Angular 17, TypeScript, RxJS
* Styling: Angular Material / CSS

---

## Prerequisites

* Node: **20.19.2**
* npm: **10.8.2**
* Angular CLI:

  ```bash
  npm i -g @angular/cli@17
  ```

---

## Install

```bash
git clone https://github.com/ramsair/lapshop_advanced_ui.git
cd lapshop-ui
npm install
```

---

## Development

Start the development server:

```bash
ng serve
```

Open: `http://localhost:4200`

---

## Build (production)

Create an optimized production build:

```bash
ng build --configuration production
```

Output will be generated in: `dist/lapshop-ui`

---

## Scripts

Use scripts from `package.json`:

* `npm run start` → development (`ng serve`)
* `npm run build` → production build (`ng build --configuration production`)
* `npm run test` → run unit tests

---



## License

MIT © Ramsai Ummadisetty

