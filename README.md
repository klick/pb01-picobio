# PB01


## Build Setup

``` bash
# install dependencies
$ npm install

# add or update .env file with the according environment variables
$ vi .env

# serve with hot reload at localhost:3000
$ npm run dev

# serve with hot reload at <local-ip>:3000
$ npm run local

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

## Hosting

Project is hosted on Netlify. 

### Deployment

Merge your changes into the `master`-branch and push it to Github to trigger the deployment on Netlify.

### Environment variables

To add a ENV variable, add it to the `.env`-file and make it accessible through `nuxt.config.js`.
