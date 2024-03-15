# GovTech Assessment

This is a Unit Nukleus GovTech, Kem Digital Assessment for Software Developer roles.

This would be the entry point for all of my documentation.

## Introduction

This repositories serves as the Front-End for this assessment. The Front-End is built with React Next.JS and TailwindCSS. The Front-End is hosted on Vercel.com.

There's a lot of improvement needed but as time constraint, at least we can discuss on the concept and the architecture of the application.

## Documentation

### [Demo Link](https://nukleus-assessment.web3ramen.com/)

[API Url](https://nukleus-backend.onrender.com)

[Figma Documentation](https://www.figma.com/file/AE6vCE7lwxDaMI32c0nVWk/%5BFarhan%5D-GovTech-Assessment-Brainstorm-Board?type=whiteboard&t=ewtZZiMzR75Sc1k7-1)

[Migrations-Domain Repositories](https://github.com/paanjoe/nukleus-domain)

[Backend-Service Repositories](https://github.com/paanjoe/nukleus-backend)

[Frontend Repositories](https://github.com/paanjoe/nukleus-frontend)

[API Documentation](https://github.com/paanjoe/nukleus-backend/tree/main/test-cases)

## Tech Stack | Framework

#### Nukleus-Domain

- **ORM Framework:** PrismaORM
- **Serverless:** Supabase
- **Database Engine:** Postgre
- **CI/CD:** GitHub Actions --> Just a Migrations Checker is in sync with the Database

#### Nukleus-Backend

- **ORM Model:** PrismaORM
- **Backend Framework:** ExpressJS
- **Api Documentation:** Swagger
- **CI/CD:** GitHub Actions
- **Unit Test:** Jest & Supertest

#### Nukleus-Frontend

- **Framework:** React Next.JS
- **UI Kit** TailwindCSS
- **Infrastructure** Vercel

#### Deployment Infrastructure

- **Host for Backend:** Render.com
- **Host for Frontend:** Vercel.com
- **CI/CD:** GitHub Actions

## Environment Variables - Nukleus-Backend

To run this Nukleus Frontend, you need this `.env` file in the root of the project. You can refer the .env.example file.

```
NEXT_PUBLIC_SUPABASE_URL=xxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
ADMIN_EMAIL=xxx
ADMIN_PASSWORD=xxx
USER_EMAIL=xxx
USER_PASSWORD=xxx
API_BASE_URL=xxx
```

## Deployment | Command

To run this project locally. Please use the command below whenever makes sense:

Cloning this repositories:

```bash
  git clone https://github.com/paanjoe/nukleus-frontend.git
```

Installing Packages

```bash
  npm i
```

Run the development server

```bash
  npm run dev
```

## License

[MIT License](https://choosealicense.com/licenses/mit/)
