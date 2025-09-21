#!/bin/bash

# Apply namespaces
kubectl apply -f infra/k8s/namespaces/namespaces.yaml

# Apply Argo CD Application manifest
kubectl apply -f infra/k8s/argocd/auth-app.yaml -n argocd

echo "Argo CD Application applied. Check the Argo CD UI for sync status."
