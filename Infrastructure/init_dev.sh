cd ../Backend
mvn clean install
cd ../Infrastructure

docker-compose down

rm -rf ./data/postgre
rm -rf ./data/tomcat

docker-compose up -d

#Let the containers start
echo 'Waiting for containers to start...'
sleep 20s # TODO: should poll for status instead...

docker exec -it dev-postgre psql -U postgres -c "CREATE USER engineroomuser WITH LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE INHERIT NOREPLICATION CONNECTION LIMIT -1 PASSWORD 'engineroompassword';"
docker exec -it dev-postgre psql -U postgres -c "CREATE DATABASE engineroomdb WITH OWNER = engineroomuser ENCODING = 'UTF8' CONNECTION LIMIT = -1;"

cp ../Backend/WebApp/target/webapp.war ./data/tomcat