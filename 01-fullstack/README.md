# 01-Fullstack Kubernetes Example

This project demonstrates a simple fullstack application deployed on Kubernetes using Minikube. It includes a React frontend and a Node.js backend, with all necessary Kubernetes manifests for local development and deployment.

## Folder Structure

- `frontend/` – React app (Dockerized)
- `server/` – Node.js backend (Dockerized)
- `infra/` – Kubernetes manifests for deploying frontend and backend

## Quickstart

### 1. Start Minikube

```bash
minikube start
```

```
😄  minikube v1.37.0 on Ubuntu 24.04 (amd64)
✨  Using the docker driver based on existing profile
👍  Starting "minikube" primary control-plane node in "minikube" cluster
🚜  Pulling base image v0.0.48 ...
🏃  Updating the running docker "minikube" container ...
🐳  Preparing Kubernetes v1.34.0 on Docker 28.4.0 ...
🔎  Verifying Kubernetes components...
    ▪ Using image docker.io/kubernetesui/dashboard:v2.7.0
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
    ▪ Using image docker.io/kubernetesui/metrics-scraper:v1.0.8
💡  Some dashboard features require the metrics-server addon. To enable all features please run:

        minikube addons enable metrics-server

🌟  Enabled addons: storage-provisioner, default-storageclass, dashboard
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
```

### 2. Point shell to Minikube Docker

```bash
eval $(minikube docker-env)

# Confirm with:
docker info  # Look for Name: minikube
```

### 3. Build Docker Images

```bash
cd frontend && docker build -t k8s-frontend .
cd ../server && docker build -t k8s-server .
```

### 4. Deploy to Kubernetes

```bash
cd ../infra
kubectl apply -f frontend-depl.yaml
kubectl apply -f frontend-svc.yaml
kubectl apply -f server-depl.yaml
kubectl apply -f server-svc.yaml
```

### 5. Access the App

```bash
minikube service k8s-frontend --url
```

---

For more details, see the README files in each subfolder.