@app
crwn-clothing

@aws
region ap-northeast-1
runtime typescript

@static
folder ../dist
spa true
prune true

@http
/api/*
  method any
  src /src/api

@plugins
architect/plugin-typescript