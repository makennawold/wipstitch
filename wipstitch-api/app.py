from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
#from werkzeug.security import generate_password_hash, check_password_hash
from flask_bcrypt import generate_password_hash, check_password_hash
# from flask_login import UserMixin
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
import os
import datetime

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'app.sqlite')
#put secret key here?
db = SQLAlchemy(app)
ma = Marshmallow(app)
jwt = JWTManager(app)

#user
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    password = db.Column(db.String())

    def __init__(self, username, password):
        self.username = username
        self.password = generate_password_hash(password).decode('utf8')
    def check_password(self, password):
        return check_password_hash(self.password, password)

class UserSchema(ma.Schema):
    class meta:
        fields = ('username', 'password')

user_schema = UserSchema()
users_schema = UserSchema(many=True)

# list
class List(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    list_name = db.Column(db.String(100) unique=False)
    items = db.Column(db.String(3000) unique=False)
    user_id = db.Column(db.Integer, unique=False)
    public = db.Column(db.Boolean)

    def __init__(self, list_name, items, public, user_id):
        self.list_name = list_name
        self.items = items
        self.public = public
        self.user_id = user_id

class ListSchema(ma.Schema):
    class Meta:
        fields = ('list_name', 'items', 'public', 'user_id')

list_schema = ListSchema()
lists_schema = ListSchema(many=True)

#wips
class Wip(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    wip_name = db.Column(db.String(100) unique=False)
    user_id = db.Column(db.Integer, unique=False)
    public = db.Column(db.Boolean)

    def __init__(self, wip_name, public, user_id):
        self.wip_name = wip_name
        self.public = public
        self.user_id = user_id

class WipSchema(ma.Schema):
    class Meta:
        fields = ('wip_name', 'public', 'user_id')

wip_schema = WipSchema()
wips_schema = WipSchema(many=True)

#wip tasks
class WipTask(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String(100) unique=False)
    wip_id = db.Column(db.Integer, unique=False)

    def __init__(self, task_name, wip_id):
        self.task_name = task_name
        self.wip_id = wip_id

class WipTaskSchema(ma.Schema):
    class Meta:
        fields = ('task_name', 'wip_id')

wiptask_schema = WipTaskSchema()
wiptasks_schema = WipTaskSchema(many=True)

#endpoints

#login endpoint

#create a user
#delete a user
#update a user
#query a user

#create a list
#update a list
#delete a list
#get a list by id
#get all lists(filter private and public on front end side?)

#create wip
#get one wip << should also grab wip tasks associated
#update wip
#delete wip
#get all wips
#get all public wips

#create wip task
#get wip task
#update wip task
#delete wip task


if __name__ == '__main__':
    app.run(debug=True)

