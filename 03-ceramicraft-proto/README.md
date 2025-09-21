# ArgoCD 

#### 1. Install ArgoCD 
```bash
# 1.1 Install 
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# 1.2 Check the namespace has been created 
kubectl get pods -n argocd

# 1.3 Get the password here 
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

**Login to ArgoCD with**
Username : Name 
Password : # From Step 1.3 


