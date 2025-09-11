kubectl apply -f frontend-depl.yaml
kubectl apply -f frontend-svc.yaml



kubectl apply -f server-depl.yaml
kubectl apply -f server-svc.yaml


minikube service k8s-frontend


minikube service k8s-frontend --url