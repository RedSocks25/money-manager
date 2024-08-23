This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Development

Follow the next isntructions to get your local app running ready for development

### Install all the packages

First, ensure that you have all the dependencies installed running the command you prefer

```bash
npm install
# or
yarn
```

### Database

Since we have `prisma` installed, build the docker container where the database is going to be located `docker-compose.yml` file

```bash
docker compose up -d
```

Now is time to create build of the DB for your project using Prisma

1. Create a copy of the `.env.template` and name it just `.env`
2. Replace the environment variables

Run the following commands

```bash
npx prisma init
npx prisma migrate dev
```

### Server

After all the previous installation steps, with docket running, start the development workspace

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:300) with your browser to see the result

## Production