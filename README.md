legal-document-test

├── 📂 backend # Backend code

└── 📂 frontend # Frontend code (UI, components, styling, etc.)

```
git clone git@github.com:alseidi/legal-document-test.git
cd ./legal-document-test
```

## Backend Setup

`cd ./backend`

`npm install` or `yarn install`

`npm start` or `yarn start`

## Frontend Setup

`cd ../frontend`

`cp .env.example .env`

Then, update the Base URL inside .env:

`REACT_APP_BASE_URL=http://localhost:3000`

`npm install` or `yarn install`

`npm start` or `yarn dev`
