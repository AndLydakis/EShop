* API runs on 3000
* Backend runs on 8000

---
- Move frontend in to backend dir
- ```npm run build``` to create static project
- Add base path ```(frontend/build)``` to ```settings.py```
- Add ```index.html``` as the default to ```urls.py```
- Add base path ```(frontend/build/static)``` to ```STATICFILES_DIR``` in```settings.py```
- Setup up PQL database
- Replace DB in ```settings.py```:  
  ```python
     DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': '',
            'USER': '',
            'PASSWORD': '',
            'HOST': '',
            'PORT': '',
        }
    }
  ```
- Run ```python manage.py makemigrations base``` && ```python manage.py migrate base```

### AWS
- Console -> RDS -> Create DB -> make sure public availability is enabled
- Go to Connectivity & Security and adjust input/outbounds to 0s
- Modify ```settings.py``` with the new endpoints and perform migrations

**Add product images to Bucket**
- Console -> S3 -> Create standard bucket
- Adjust policy (see bucket-policy.txt)
- Create IAM user for bucket
- Add credentials in ```settings.py```
  ```
  AWS_ACCESS_KEY_ID
  AWS_SECRET_ACCESS_KEY
  AWS_STORAGE_BUCKET_NAME
  ```
- Adjust ```settings.py -> MEDIA_ROOT``` to configure upload to bucket
  - use boto3
  - add ```DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'```
  - add ```storages``` to ```INSTALLED_APPS```

### Heroku Deployment (Git)
- Create Standard App
- Settings Tab -> ConfigVars -> set all the access tokens etc here.
- Settings Tab -> Buildpacks -> Python. (this requires a ```requirements.txt```):
generate with  ```pip freeze > requirements.txt```  once all packages are installed
```pip install gunicorn```  
```pip install whitenoise``` to serve the files 
- Add to ```settings.py``` middleware:
  ```python
  'whitenoise.middleware.WhiteNoiseMiddleware'
  ```
- ```settings.py``` -> DEBUG=False and update ```ALLOWED_HOSTS```
- Add static files for deployment: 
  ```STATIC_ROOT = BASE_DIR/'staticfiles'```
- Bundle them with ```python manage.py collectstatic```
- Adjust ```urls.py```: ```urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)```

- Add to bottom of ```setting.py```:
```python
  # we are on Heroku, run on static files
  if os.getcwd() == '/app':
      DEBUG = False
```

- Use Gunicorn
- See [Procfile](./backend/Procfile)
- Add [runtime.txt](./backend/runtime.txt)

- Remove ```/build``` from ```frontend/.gitignore```

- frontend: ```npm run build```
- backend: ```python manage.py collectstatic```

### Possible Heroku Error:
```$ python backend/manage.py collectstatic --noinput```

Settings->Config Vars -> DISABLE_COLLECTSTATIC = 1

