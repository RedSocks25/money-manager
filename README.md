This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Development

Follow the next isntructions to get your local app running ready for development

### Database

First, build the database using the information on the `docker-compose.yml` file

```bash
docker compose up -d
```

Now is time to create the instance of the DB for your project using Prisma

1. Create a copy of the `.env.template` and name it just `.env`
2. Replace the environment variables
3.

### Server

First, ensure that you have all the dependencies installed running the command ou prefer

```bash
npm install
# or
yarn
```

After the installation, run the project locally as development

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