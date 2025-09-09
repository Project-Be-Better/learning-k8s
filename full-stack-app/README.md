# MYSQL Service

## Step 1 : Apply the Secret

```bash
kubectl apply -f mysql-secret.yaml
kubectl get secret
kubectl describe secret mysql-secret
```

```
PS D:\learning-projects\learning-k8s\full-stack-app> kubectl apply -f .\mysql-secret.yaml
secret/mysql-secret created
PS D:\learning-projects\learning-k8s\full-stack-app> kubectl get secret
NAME           TYPE     DATA   AGE
mysql-secret   Opaque   1      19s
PS D:\learning-projects\learning-k8s\full-stack-app> kubectl describe secret mysql-secret
Name:         mysql-secret
Namespace:    default
Labels:       <none>
Annotations:  <none>

Type:  Opaque

Data
====
mysql-root-password:  11 bytes
```

- Pods can’t store passwords in plain YAML (too insecure).By putting it in a Secret, you can inject it safely into a Pod as:
  an environment variable, or a mounted file.
- Values must be base64-encoded (not encrypted, just obfuscated). In production, Secrets can be encrypted at rest

## Step 2 : Apply the PVC

```bash
kubectl apply -f mysql-pvc.yaml
kubectl get pvc
kubectl describe pvc mysql-f4689846-9nsn7
```

```
PS D:\learning-projects\learning-k8s\full-stack-app> kubectl apply -f mysql-pvc.yaml
persistentvolumeclaim/mysql-pvc created
PS D:\learning-projects\learning-k8s\full-stack-app> kubectl get pvc
NAME        STATUS   VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS   VOLUMEATTRIBUTESCLASS   AGE
mysql-pvc   Bound    pvc-f213b825-9f22-4054-9ed1-1b26e02b4cf8   1Gi        RWO            standard       <unset>                 15s
```

- This PVC will be mounted by your MySQL Deployment at `/var/lib/mysql`.
- That’s where MySQL stores its data.
- So even if Pod restarts, the data survives
- STATUS: Bound means Kubernetes provisioned storage and attached it to your claim. In Minikube, this is hostPath storage from the Minikube VM

## Step 3 : Apply the Deployment

```bash
kubectl apply -f mysql-deployment.yaml
kubectl get pods
```

```
PS D:\learning-projects\learning-k8s\full-stack-app> kubectl apply -f mysql-deployment.yaml
deployment.apps/mysql unchanged
PS D:\learning-projects\learning-k8s\full-stack-app> kubectl get pods
NAME                   READY   STATUS              RESTARTS   AGE
mysql-f4689846-9nsn7   0/1     ContainerCreating   0          16s
PS D:\learning-projects\learning-k8s\full-stack-app> kubectl get pods
NAME                   READY   STATUS              RESTARTS   AGE
mysql-f4689846-9nsn7   0/1     ContainerCreating   0          23s
PS D:\learning-projects\learning-k8s\full-stack-app> kubectl get pods
NAME                   READY   STATUS    RESTARTS   AGE
mysql-f4689846-9nsn7   1/1     Running   0          33s
PS D:\learning-projects\learning-k8s\full-stack-app> kubectl describe pod mysql-f4689846-9nsn7
Name:             mysql-f4689846-9nsn7
Namespace:        default
Priority:         0
Service Account:  default
Node:             minikube/192.168.49.2
Start Time:       Tue, 09 Sep 2025 16:54:48 +0800
Labels:           app=mysql
                  pod-template-hash=f4689846
Annotations:      <none>
Status:           Running
IP:               10.244.0.14
IPs:
  IP:           10.244.0.14
Controlled By:  ReplicaSet/mysql-f4689846
Containers:
  mysql:
    Container ID:   docker://3686f28a1a9638e16083ed7829411be83074dc6f2a295830d2be7b5855754be1
    Image:          mysql:8.0
    Image ID:       docker-pullable://mysql@sha256:d2fdd0af28933c6f28475ff3b7defdbc0e0475d9f7346b5115b8d3abf8848a1d
    Port:           3306/TCP
    Host Port:      0/TCP
    State:          Running
      Started:      Tue, 09 Sep 2025 16:55:15 +0800
    Ready:          True
    Restart Count:  0
    Environment:
      MYSQL_ROOT_PASSWORD:  <set to the key 'mysql-root-password' in secret 'mysql-secret'>  Optional: false
    Mounts:
      /var/lib/mysql from mysql-storage (rw)
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-jsfwz (ro)
Conditions:
  Type                        Status
  PodReadyToStartContainers   True
  Initialized                 True
  Ready                       True
  ContainersReady             True
  PodScheduled                True
Volumes:
  mysql-storage:
    Type:       PersistentVolumeClaim (a reference to a PersistentVolumeClaim in the same namespace)
    ClaimName:  mysql-pvc
    ReadOnly:   false
  kube-api-access-jsfwz:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <nil>
    DownwardAPI:             true
QoS Class:                   BestEffort
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  50s   default-scheduler  Successfully assigned default/mysql-f4689846-9nsn7 to minikube
  Normal  Pulling    50s   kubelet            Pulling image "mysql:8.0"
  Normal  Pulled     24s   kubelet            Successfully pulled image "mysql:8.0" in 27.726
```

- The Deployment automatically created a ReplicaSet, which maintains the Pod
- We mounted the PVC at /var/lib/mysql because that’s the default MySQL data directory

## Step 4 : Apply the Service

```bash
kubectl apply -f mysql-service.yaml
```

```
PS D:\learning-projects\learning-k8s\full-stack-app> kubectl apply -f mysql-service.yaml
service/mysql created
PS D:\learning-projects\learning-k8s\full-stack-app> kubectl get svc
NAME            TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE
kubernetes      ClusterIP   10.96.0.1        <none>        443/TCP    31h
mysql           ClusterIP   10.96.85.111     <none>        3306/TCP   2s
nginx-service   ClusterIP   10.110.169.243   <none>        80/TCP     8h
```

- This gives MySQL a stable DNS name (mysql.default.svc.cluster.local) so other Pods can always find it.
- Without a Service, clients would have to use Pod IPs, which change if Pods restart.
