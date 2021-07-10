# React app boilerplate

A boilerplate for starting a new react app with SSR, webpack and fast-refresh

## What is included

- HRM with fast-refresh and webpack dev server
- SSR with expressjs
- App routes with react-router

## How to use it

After installing the dependencies `npm install` you can start everything with a single command:

```
npm start
```

which will start webpack dev server on `localhost:3000` which will proxy SSR to the express server started on port `9000`.

To generate a production build:

```
npm run build
```

## Roadmap

- [ ] Lazy load and code splitting
- [ ] Source maps
- [ ] Production build with optimizations
- [ ] Service worker
- [ ] CSS
- [ ] Old browser support
