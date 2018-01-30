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
* get user's favorite offers by user Id
```
GET /v1/:user_id/favorite_offers
```
* adding / removing favorite offers in the list by user Id
```
PUT /v1/user/:user_id/add_favorite_offer/
```
* receiving user data by user Id
```
PUT/DELETE /v1/user/:user_id
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
## Getting Started

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
