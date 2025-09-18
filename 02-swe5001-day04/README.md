
Thanks for sharing the full flow, Sree. Your lecturer’s instructions are solid, but they’re Mac-centric and assume a few things that we’ll need to adapt for your WSL2 + Ubuntu setup. Let’s walk through the corrected and optimized version of this setup for your environment, step by step.

# 🧱 Full Argo CD Setup + Spring Boot Deployment (WSL2 Ubuntu + Minikube)

## 1. Install kubectl
You’ve already got this:
```bash
kubectl version --client
```

## 2. Install Minikube
Already done and running:
```bash
minikube start --driver=docker
```

## 3. Create Argo CD Namespace
```bash
kubectl create namespace argocd
```

## 4. Install Argo CD
⚠️ Your lecturer had a typo: argoco instead of argocd. Use:
```bash
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```
Deploys Argo CD’s full stack into the argocd namespace.

Applies a large YAML manifest that defines:
    1. Deployments
    2. Services
    3. ConfigMaps
    4. Secrets
    5. Custom Resource Definitions (CRDs)
    6. RBAC rules

Check pods:
```bash
kubectl get pods -n argocd
```

## 5. Change Argo CD Service Type to NodePort
You’re making the Argo CD web interface accessible from your browser. By default, Kubernetes services are internal-only. So we need to change the service type and get the external access URL.

This exposes the Argo CD UI via a stable port:
```bash
kubectl patch svc argocd-server -n argocd \
    -p '{"spec": {"type": "NodePort"}}'
```

What This Does:
    • Changes the service type from ClusterIP (internal-only) to NodePort (externally accessible via Minikube).
    • Assigns a port (usually between 30000–32767) that you can use to reach the UI.

Get Access URL:
```bash
minikube service argocd-server -n argocd --url
```
This command:
    • Finds the external IP and port for the argocd-server service.
    • Returns a URL like:
        http://127.0.0.1:32768

## 6. Check Argo CD Resources
```bash
kubectl get all -n argocd
```

## 7. Get Argo CD Admin Password
```bash
kubectl get secret argocd-initial-admin-secret -n argocd \
    -o jsonpath="{.data.password}" | base64 --decode
```
Username: admin
Password: <your-password-here>

## 8. Get Argo CD UI URL
```bash
minikube service argocd-server -n argocd --url
```
Open the URL in your browser. You’re in!

---

# Deploy the Spring Boot App

## 9. Build and Push Docker Image
Make sure your Docker is running inside Ubuntu and logged in to Docker Hub:
```bash
docker build -t <your-dockerhub-username>/<app-name>:v1 .
docker push <your-dockerhub-username>/<app-name>:v1
```
If you have a build.sh, rename it to build.cmd for Windows, but since you’re in Ubuntu, you can run it directly:
```bash
chmod +x build.sh
./build.sh
```

## 10. Apply Argo CD Application Manifest
This tells Argo CD to deploy your app:
```bash
kubectl apply -f application.yaml
```
Make sure application.yaml includes:
    • Git repo URL
    • Path to manifests
    • Target namespace (e.g. cicd-demo-app)
    • Sync policy

## 11. Check App Status
```bash
kubectl get svc -n cicd-demo-app
```

## 12. Expose App Port
```bash
kubectl port-forward svc/cicd-demo-app -n cicd-demo-app 8080
```
Now visit [http://localhost:8080](http://localhost:8080) to test your app.

---

# 🧠 Bonus Tips
    • You can use `argocd app list` and `argocd app get <app-name>` if you install the Argo CD CLI.
    • Argo CD will auto-sync your app if you enable automated sync policy.
    • You can deploy multiple apps across namespaces—just change `destination.namespace` in the manifest.

Want help validating your application.yaml or sketching a diagram of how Argo CD orchestrates this flow? I can tailor it to your Spring Boot setup.