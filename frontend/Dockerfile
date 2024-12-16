FROM node:20 as builder

WORKDIR /src/app

COPY package.json package-lock.json ./

RUN npm install
RUN npm install @reduxjs/toolkit

COPY . .

RUN npm run build

FROM node:20 as production

WORKDIR /src/app

COPY --from=builder /src/app/node_modules ./node_modules

COPY package.json vite.config.ts .

COPY --from=builder /src/app/dist ./dist

EXPOSE 9100

CMD [ "npm", "run", "preview" ]
