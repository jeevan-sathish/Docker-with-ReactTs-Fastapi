# DockerPrac — React + FastAPI with Docker

A full-stack application using **React + Vite** for the frontend and **FastAPI** for the backend, containerized with Docker and orchestrated using Docker Compose.

This project demonstrates how to build Docker images, publish them to Docker Hub, and deploy the application using the published images without copying the original source code.

## Tech Stack

- **Frontend:** React, Vite
- **Backend:** Python, FastAPI, Uvicorn
- **Containerization:** Docker
- **Container orchestration:** Docker Compose
- **Image registry:** Docker Hub

## Project Structure

```text
dockerPrac/
├── .gitignore
├── README.md
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── main.py
└── frontend/
    ├── Dockerfile
    ├── package.json
    ├── package-lock.json
    └── src/
```

> The exact files inside `backend/` and `frontend/` may vary depending on your application.

## Docker Architecture

The application runs as two separate containers:

| Service  | Container port | Host port |
| -------- | -------------: | --------: |
| Frontend |           5173 |      5173 |
| Backend  |           8000 |      8000 |

- The frontend is served by the Vite development server.
- The backend runs using Uvicorn.
- Docker Compose creates a network for the services.
- Port mappings allow access to the services from the host machine.

## Run Locally with Docker Compose

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd dockerPrac
```

### 2. Build and start both services

```bash
docker compose up --build
```

Run in the background:

```bash
docker compose up --build -d
```

### 3. Access the application

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- FastAPI Swagger documentation: http://localhost:8000/docs

### 4. Check running containers

```bash
docker compose ps
```

### 5. View logs

```bash
docker compose logs -f
```

View only backend logs:

```bash
docker compose logs -f backend
```

View only frontend logs:

```bash
docker compose logs -f frontend
```

### 6. Stop and remove containers

```bash
docker compose down
```

This removes the Compose containers and network but keeps the Docker images.

## Docker Hub

Published images:

- Backend: `jeevansathish/dockerprac-backend:latest`
- Frontend: `jeevansathish/dockerprac-frontend:latest`

### 1. Log in to Docker Hub

```bash
docker login
```

### 2. Build both images

The root `docker-compose.yml` defines the image names and build contexts.

```bash
docker compose build
```

### 3. Push both images

```bash
docker compose push
```

Docker Compose builds and pushes each service's image using the configured image name and tag.

The `latest` tag is used for both images.

## Deploy Using Docker Hub Images

A separate deployment folder can run the published images without containing the original frontend and backend source code.

### Deployment folder structure

```text
docker-deploy/
└── docker-compose.yml
```

### Deployment Compose configuration

Create `docker-compose.yml` inside the deployment folder:

```yaml
services:
  backend:
    image: jeevansathish/dockerprac-backend:latest
    ports:
      - "8000:8000"

  frontend:
    image: jeevansathish/dockerprac-frontend:latest
    ports:
      - "5173:5173"
    depends_on:
      - backend
```

### Pull and start the images

Run these commands inside the deployment folder:

```bash
docker login
docker compose pull
docker compose up -d
```

Alternatively, run:

```bash
docker compose up -d
```

Docker Compose pulls images when required and starts the services.

### Verify deployment

```bash
docker compose ps
```

Open:

- Frontend: http://localhost:5173
- Backend docs: http://localhost:8000/docs

### Stop the deployment

```bash
docker compose down
```

## Docker Commands Learned

| Command                  | Purpose                                |
| ------------------------ | -------------------------------------- |
| `docker --version`       | Check Docker version                   |
| `docker compose version` | Check Compose version                  |
| `docker images`          | List local images                      |
| `docker ps`              | List running containers                |
| `docker compose ps`      | List containers in the Compose project |
| `docker compose build`   | Build service images                   |
| `docker compose push`    | Push service images to a registry      |
| `docker compose pull`    | Pull service images from a registry    |
| `docker compose up -d`   | Start services in the background       |
| `docker compose logs -f` | Follow service logs                    |
| `docker compose down`    | Stop and remove containers and network |
| `docker login`           | Authenticate with a container registry |

## Important Notes

- Docker images and Docker containers are different. An image is the packaged application; a container is a running instance of an image.
- `docker compose down` does not delete the images.
- Docker Hub stores published images, not your Git repository or Compose configuration.
- The deployment Compose file uses `image:` rather than `build:` so it can run without the original source folders and Dockerfiles.
- The frontend must call a backend URL that the browser can reach. `localhost` refers to the computer running the browser, not automatically the Docker host.
- If accessing the app from another computer, configure a reachable backend address, firewall rules, and appropriate CORS settings.
- Never commit `.env` files containing secrets to GitHub.

## What I Learned

- Writing Dockerfiles for a React frontend and FastAPI backend.
- Building images with Docker Compose.
- Running multiple containers together.
- Publishing multiple images to Docker Hub using one Compose command.
- Pulling published images into a separate deployment folder.
- Starting and stopping services with Docker Compose.
- Understanding the difference between source-based builds and image-based deployments.

## Future Improvements

- Use versioned image tags such as `v1` instead of relying only on `latest`.
- Configure environment variables for different environments.
- Deploy to a cloud server.
- Add a production frontend server and HTTPS.
- Configure CI/CD to build and publish images automatically.
