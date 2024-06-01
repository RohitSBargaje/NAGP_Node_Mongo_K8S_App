# NAGP_Node_Mongo_K8S_App

# Git hub source code repository
https://github.com/RohitSBargaje/NAGP_Node_Mongo_K8S_App


# Docker hub URL
https://hub.docker.com/repository/docker/rohitsbargaje/nagp_kubernetes/general


# Access app on below URL. It will open swagger page to insert and get users data.
```
http://104.199.159.198:3000/
```


# Link for screen recording video.
```
http://104.199.159.198:3000/
```


# Docker Login, image creation, tagging and pushing it to docker hub.

Note: Go to the app directory for executing the below commands

docker login

docker build -t rohitsbargaje/nagp_kubernetes:v1 ./app

docker push rohitsbargaje/nagp_kubernetes


# Steps to run app in Kubernetes.

Note: Go to the root directory for executing the below commands

Creating a new Kubernetes namespace
kubectl apply -f ./k8s-GCP/namespace.yaml

Swith to this namespace:-
kubectl config set-context --current --namespace=nagp


# RUN below command in Git bash to get base 64 encoded of text
```
 echo -n 'root' | base64
 echo -n '123456' | base64
```


# kubectl commands to run on local k8s docker setup.
```
1.Create secret
kubectl apply -f ./k8s-GCP/db/mongo-secret.yaml

2.Create storage
kubectl apply -f ./k8s-GCP/db/mongo-storageclass.yaml

3.Create Stateful set
kubectl apply -f ./k8s-GCP/db/mongo-statefulset.yaml

4.Create Mongo DB headless Service
kubectl apply -f ./k8s-GCP/db/mongo-svc.yaml

5.Create configmap
kubectl apply -f ./k8s-GCP/node-service/node-configmap.yaml

6.Create Node App Deployment
kubectl apply -f ./k8s-GCP/node-service/node-deployment.yaml

7.Create Node App Service
kubectl apply -f ./k8s-GCP/node-service/node-service.yaml

8.Create Node App Service
kubectl apply -f ./k8s-GCP/node-service/node-service.yaml
```


# Added another k8s-LOCAL folder to run application on local k8s docker setup. Follow above steps and run application on
http://localhost:3000/



# kubectl commands to run on GCP. Open Cloud Shell Editor. Checkout source code repository. Open cloud shell termial. Run kubectl above commands. Here need to change file path.
kubectl apply -f /home/rohitsbargaje/NAGP_Node_Mongo_K8S_App/k8s-GCP/namespace.yaml
