# GetInBackend :computer:

GetInBackend is the server part for the mobile application [GetIn](https://github.com/TimurAsayonok/GetInMobileApp) - GetIn.
At the moment, the basic methods are implemented.

**For the user**:
* login
```
POST /v1/login
```
* registration
```
POST /v1/singup
```
* password reminder
```
POST /v1/remind_password
```
* get user's chosen offers by user Id
```
GET /v1/:user_id/chosen_offers
```
* adding / deleting chosen offers in the list by user Id
```
PUT/DELETE /v1/user/:user_id/chosen_offer/
```
* receiving user data by user Id
```
GET /v1/user/:user_id
```
**For offers:**
* search offers on the given parameters
```
POST /v1/find_offers
```
* receive all offers
```
GET /v1/offers
```
**For location**
* get areas
```
GET /v1/areas
```
* get educational institutions
```
GET /v1/educations
```
* get metro stations
```
GET /v1/metro_stations
```
## Getting Started :rocket:
* Clone code from repository
* Go to folder what has code from repository in your computer.
* Install all libs from package.json
```
npm install
```
* For working whith mongoDb you can use [Robo3t](https://robomongo.org/). Import all tables for DB from [models](https://github.com/TimurAsayonok/GetInBackend/tree/master/models) folder. And run command
```
mongod
```
* Last stap, let's run server
```
npm start
```
## License :page_facing_up:

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/TimurAsayonok/GetInBackend/blob/master/LICENSE) file for details
