# Pro Shop
### Django/React/Postgres based e-Shop, hosted on Heroku and AWS  

* Paypal API
* User Account/Reviews
* Admin Panels (Edit User/Order/Products)
* Object Carousel
* Object Search

See [some images](WALKTHROUGH.md)

Occasionally hosted on [proshop-and.herokuapp.com](proshop-and.herokuapp.com)  
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

### [Deployment](DEPLOYMENT.md)

### Random Environment Notes

### 1st time create frontend: 
```
npx create-react-app frontend
```


### 1st time create backend
```
django-admin startproject backend
```

### run backend
```
python manage.py runserver
```

### create django app
```
python manage.py startapp <name>
```

### Authentication
[JWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/)
