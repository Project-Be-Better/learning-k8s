# User Service

```bash
kubectl apply -f user-deployment.yaml
kubectl apply -f user-service.yaml
```

```
PS D:\learning-projects\learning-k8s\full-stack-app\user-service> kubectl apply -f user-deployment.yaml
deployment.apps/user-service created
PS D:\learning-projects\learning-k8s\full-stack-app\user-service> kubectl apply -f user-service.yaml
service/user-service created
```

```bash
kubectl run tmp --rm -it --image=nicolaka/netshoot -- /bin/bash

curl http://user-service:8080

for i in 1 2 3 4 5; do curl http://user-service:8080; done
```
