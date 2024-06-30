## Backend (NestJS + Mongoose + Swagger)

Repository: https://github.com/ant0x64/sandbox-h247-backend

### How to run

1. Run MongoDB:

    ```bash
    docker run --rm -p 5000:27017 --name app \
      -e MONGO_INITDB_ROOT_USERNAME=root\
      -e MONGO_INITDB_ROOT_PASSWORD=secret\
      -e MONGO_INITDB_DATABASE=app \
      mongo:latest
    ```

2. Create `.env` based on `.env.example`
3. Install dependencies `npm i`
4. Run application `npm run start`

### Notes

Swagger url: `http://localhost:4000/doc`



## Frontend (Angular + Ionic + NgRx)

Repository: https://github.com/ant0x64/sandbox-h247-frontend

### How to run

1. Install dependencies `npm i`
2. Make sure `environment.ts` contains the proper backend path
3. Run application: `npm run start`

### Notes

> User login: `login` \
> User password: `password`
