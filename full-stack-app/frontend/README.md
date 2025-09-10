# Frontend Service

## 1. Create a simple frontend

We will be creating a simple frontend what will fetch the data from the backend and displays

## 2. Create a dockerfile

We will use NGINX to serve this index.html and we will copy the html file inside the image

## 3. Set the env variables and build the image

```bash
eval $(minikube docker-env)
```

```powershell
minikube docker-env | Invoke-Expression
```

and build the image

```bash
docker build -t frontend:1.0 .
```

> Note : Doing so will export the env variables to set the daemons correctly

```
PS D:\learning-projects\learning-k8s\full-stack-app\frontend> minikube docker-env
$Env:DOCKER_TLS_VERIFY = "1"
$Env:DOCKER_HOST = "tcp://127.0.0.1:57051"
$Env:DOCKER_CERT_PATH = "C:\Users\sreer\.minikube\certs"
$Env:MINIKUBE_ACTIVE_DOCKERD = "minikube"
# To point your shell to minikube's docker-daemon, run:
# & minikube -p minikube docker-env --shell powershell | Invoke-Expression
PS D:\learning-projects\learning-k8s\full-stack-app\frontend>
```

## 4. Apply the scripts

```bash
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml
```

## Troubleshooting

### Image may not be in the registry

```powershell
# This will check for the image
docker images | findstr frontend
```

```
kubectl rollout restart deployment frontend
```
