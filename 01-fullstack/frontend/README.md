# Frontend 

```bash
eval $(minikube docker-env)
eval $(minikube docker-env -u)  # switch back to local Docker
docker build -t k8s-frontend .
docker run -p 3000:80 k8s-frontend

```

```bash
docker build -t k8s-frontend .
```


eval $(minikube docker-env)
docker build -t k8s-frontend ./path-to-frontend
kubectl rollout restart deployment k8s-frontend

docker run -p 3000:80 --name k8s-frontend-container k8s-frontend