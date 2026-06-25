# 🛠️ Project Context: NestJS + Clean Architecture (VS Code Optimized)

This project is built with **NestJS**, following **Clean Architecture principles** to ensure a scalable, testable, and maintainable codebase.

---

## ⚙️ Resource Generation

- Use **Nest CLI** (`nest g`) for generating all project artifacts, including controllers, services, and modules.
- Each domain feature (resource) should be modular and self-contained.

---

## 🧠 Use Cases (`use-cases` folder)

- Every business operation (method from the service) must be implemented as a **dedicated use case**.
- Use cases must live in a `use-cases` folder inside each resource directory.
- The `use-cases` folder must include a **barrel file (`index.ts`)** to export all use cases for cleaner imports in services.
- The main service (`*.service.ts`) should act only as an orchestrator, delegating logic to use cases.

---

## 📁 Folder Structure per Resource

```
src/
  └── <resource>/
       ├── dtos/
       ├── entities/
       ├── use-cases/
       │    ├── create-<resource>.use-case.ts
       │    ├── update-<resource>.use-case.ts
       │    └── index.ts       <-- Barrel file
       ├── <resource>.controller.ts  <-- Single controller file
       ├── <resource>.service.ts
       └── <resource>.module.ts
```

> ✅ **Note**: Only one controller file per resource (e.g., `users.controller.ts`). Do **not** use a `controllers/` folder.

---

## ✅ Best Practices

- Keep **all business logic** inside the `use-cases`, not in controllers or services.
- Use cases should be **independent**, **unit-testable**, and focused on **a single responsibility**.
- Keep `dtos` and `entities` in their respective folders for clear separation of concerns.
- Use **auto-imports**, **code folding**, and **multi-root workspace folders** in **VS Code** for better navigation and scalability.
