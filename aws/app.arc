@app
crwn-clothing

@aws
region ap-northeast-1
runtime typescript

@static
spa true
folder ../dist

@http
/api/*
  method any
  src /src/api


@plugins
architect/plugin-typescript