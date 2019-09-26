# Stage 1: Building stage
FROM node:12.9-alpine as build

# Setting the working directory in the VM
WORKDIR /app

COPY package*.json /app/

# Using yarn because its able to install packages in parallel
RUN yarn install

# Runtime environment variables that disable the generation of source maps and allows absolute paths in project
RUN export GENERATE_SOURCEMAPS=false
RUN export NODE_PATH=src

# Copying the source code (excluding the .dockerignore instructions) into the workdir
COPY . ./

# Using yarn build instead of npm run-script build for consistency
RUN yarn build

# Stage 2: NGINX-production delivering
FROM nginx:1.17.3-alpine

# Copying the nginx-files
COPY --from=build /app/nginx/ /etc/nginx/conf.d/

# Copying build artifacts of react-build to default nginx html directory
COPY --from=build /app/build/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]