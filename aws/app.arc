@app
architect-test

@aws
region ap-northeast-1
runtime typescript

@static
spa true
folder ../dist

@http
post /api/create-payment-intent
any /api/graphql

@plugins
architect/plugin-typescript