# Frontend

This is the React frontend for the Kubernetes Fullstack Example.

## Features
- Built with React and Vite
- Dockerized for easy deployment
- Serves static files via Nginx in production

## Local Development

```bash
npm install
npm run dev
```

## Build Docker Image

Make sure your shell is pointed to Minikube's Docker:

```bash
eval $(minikube docker-env)
docker build -t k8s-frontend .
```

## Run Locally with Docker

```bash
docker run -p 3000:80 k8s-frontend
```

## Deploy to Kubernetes

After building the image, apply the manifests:

```bash
kubectl apply -f ../infra/frontend-depl.yaml
kubectl apply -f ../infra/frontend-svc.yaml
```

## Restart Deployment

```bash
kubectl rollout restart deployment k8s-frontend
```