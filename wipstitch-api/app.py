from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_bcrypt import Bcrypt
#from werkzeug.security import generate_password_hash, check_password_hash
from flask_bcrypt import generate_password_hash, check_password_hash
# from flask_login import UserMixin
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
import os
import datetime
from decouple import config

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'app.sqlite')
app.config['JWT_SECRET_KEY'] = config('JWT_SECRET')
db = SQLAlchemy(app)
ma = Marshmallow(app)
jwt = JWTManager(app)

#user
class User(db.Model):
    username = db.Column(db.String(100), primary_key=True)
    password = db.Column(db.String(21))

    def __init__(self, username, password):
        self.username = username
        self.password = generate_password_hash(password).decode('utf-8')
    def check_password(password, check_password):
        return check_password_hash(password, check_password)

class UserSchema(ma.Schema):
    class Meta:
        fields = ('username', 'password')

user_schema = UserSchema()
users_schema = UserSchema(many=True)

# list
class List(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    list_name = db.Column(db.String(100), unique=False)
    items = db.Column(db.String(3000), unique=False)
    username = db.Column(db.String(100), unique=False)
    public = db.Column(db.Boolean)

    def __init__(self, list_name, items, public, username):
        self.list_name = list_name
        self.items = items
        self.public = public
        self.username = username

class ListSchema(ma.Schema):
    class Meta:
        fields = ('list_name', 'items', 'public', 'username')

list_schema = ListSchema()
lists_schema = ListSchema(many=True)

#wips
class Wip(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    wip_name = db.Column(db.String(100), unique=False)
    username = db.Column(db.String(100), unique=False)
    public = db.Column(db.Boolean)

    def __init__(self, wip_name, public, username):
        self.wip_name = wip_name
        self.public = public
        self.username = username

class WipSchema(ma.Schema):
    class Meta:
        fields = ('wip_name', 'public', 'username')

wip_schema = WipSchema()
wips_schema = WipSchema(many=True)

#wip tasks
class WipTask(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String(100), unique=False)
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
@app.route("/login/<username>", methods=["POST"])
def login(username):
    username_check = request.json['username']
    password = request.json['password']
    
    user = User.query.get(username)
    password_hash = user.password

    if User.check_password(password_hash, password) == False:
        return jsonify({"msg":"incorrect password"})

    expires = datetime.timedelta(days=7)
    access_token = create_access_token(identity=username, expires_delta=expires)
    return jsonify(access_token=access_token), 200
    # return jsonify({"msg": "welcome"})

    

#create a user
@app.route("/user", methods=["POST"])
def add_user():
    username = request.json['username']
    password = request.json['password']

    new_user = User(username, password)

    db.session.add(new_user)
    db.session.commit()

    user = User.query.get(new_user.username)
    return user_schema.jsonify(user)

#get a user
@app.route("/user/<username>", methods=["GET"])
def get_user(username):
    user = User.query.get(username)
    return user_schema.jsonify(user)

#get all users
@app.route("/users", methods=["GET"])
def get_users():
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    return jsonify(result)

#delete a user
#update a user


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

