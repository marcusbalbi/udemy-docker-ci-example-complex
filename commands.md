## Commands

* kubectl get pvc
* kubectl get pv
* kubectl get storageclasses
* kubectl create secret generic  --from-literal
* kubectl get secrets
* curl -X POST http://localhost:5000/values -d '{ "index": 2 }'
* kubectl create secret generic pgpassword --from-literal PG_PASSWORD=secret

* kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.2.1/deploy/static/provider/cloud/deploy.yaml

* kubectl create clusterrolebinding cluster-admin-binding \
  --clusterrole cluster-admin \
  --user $(gcloud config get-value account)

* kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.2.1/deploy/static/provider/cloud/deploy.yaml
