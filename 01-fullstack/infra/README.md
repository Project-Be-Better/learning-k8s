# Infra

This folder contains Kubernetes manifests for deploying the frontend and backend services.

## Files
- `frontend-depl.yaml`: Deployment for the React frontend
- `frontend-svc.yaml`: Service for the frontend deployment
- `server-depl.yaml`: Deployment for the Node.js backend
- `server-svc.yaml`: Service for the backend deployment

## Usage

Apply all manifests to your Minikube cluster:

```bash
kubectl apply -f frontend-depl.yaml
kubectl apply -f frontend-svc.yaml
kubectl apply -f server-depl.yaml
kubectl apply -f server-svc.yaml
```

## Rollout and Restart

If you update your Docker images or deployment specs, you can restart the deployments to pick up changes:

```bash
kubectl rollout restart deployment k8s-frontend
kubectl rollout restart deployment k8s-server
```

You can also check the rollout status:

```bash
kubectl rollout status deployment k8s-frontend
kubectl rollout status deployment k8s-server
```

## Accessing the App

Expose the frontend service and get the URL:

```bash
minikube service k8s-frontend --url
```

This will provide a URL to access the frontend in your browser.