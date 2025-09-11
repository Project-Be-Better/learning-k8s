# Server

This is the Node.js backend for the Kubernetes Fullstack Example.

## Features
- Simple Express server
- Dockerized for Kubernetes deployment

## Local Development

```bash
npm install
node server.js
```

## Build Docker Image

Make sure your shell is pointed to Minikube's Docker:

```bash
eval $(minikube docker-env)
docker build -t k8s-server .
```

## Run Locally with Docker

```bash
docker run -p 3001:3001 k8s-server
```

## Deploy to Kubernetes

After building the image, apply the manifests:

```bash
kubectl apply -f ../infra/server-depl.yaml
kubectl apply -f ../infra/server-svc.yaml
```

## Restart Deployment

```bash
kubectl rollout restart deployment k8s-server
```