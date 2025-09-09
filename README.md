# learning-k8s

## Create resources using YAML files

```bash
kubectl apply -f <config.filename.yaml>

# Deployment
kubectl apply -f nginx-deployment.yaml

#Service
kubectl apply -f nginx-service.yaml
```

# Get

## Get Pod Details

```bash
kubectl get pod
```

## Get Deployment

```bash
kubectl get deployment
```

# delete

## Delete deployment

```bash
# Quick ad-hoc cleanup, you just know the name.
kubectl delete -f nginx-depl.yaml

# When you’re managing manifests with YAML files. Keeps infra-as-code workflow consistent
kubectl delete deployment nginx-depl

# When you want to wipe everything in a namespace
kubectl delete deployment nginx-deployment--all
```
