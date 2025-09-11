# Server 

```bash
eval $(minikube docker-env)
eval $(minikube docker-env -u)  # switch back to local Docker
docker build -t k8s-server .
docker run k8s-server

```

```bash
docker build -t k8s-server .
```



kubectl rollout restart deployment k8s-server

docker run -p 3001:3001 --name k8s-backend-container k8s-server