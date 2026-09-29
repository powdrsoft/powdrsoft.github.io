#!/bin/bash

openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -subj '/O=your-domain-name Inc./CN=your-domain-name' -keyout your-domain-name.key -out your-domain-name.crt

openssl req -out test.your-domain-name.csr -newkey rsa:2048 -nodes -keyout test.your-domain-name.key -subj "/CN=test.your-domain-name/O=Test SAM from your-domain-name"

openssl x509 -req -days 365 -CA your-domain-name.crt -CAkey your-domain-name.key -set_serial 0 -in test.your-domain-name.csr -out test.your-domain-name.crt

kubectl delete secret istio-ingressgateway-certs -n istio-system
kubectl create secret tls istio-ingressgateway-certs -n istio-system --key test.your-domain-name.key --cert test.your-domain-name.crt
