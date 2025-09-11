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
