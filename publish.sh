ng build
rsync -ru -v ./dist/docker-logger/. ../../compositions/docker-logger/app
