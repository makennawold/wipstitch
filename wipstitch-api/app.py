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

    def __init__(self, list_name, items, username, public):
        self.list_name = list_name
        self.items = items
        self.username = username
        self.public = public

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
    completed = db.Column(db.Boolean)

    def __init__(self, wip_name, public, username, completed):
        self.wip_name = wip_name
        self.public = public
        self.username = username
        self.completed = completed

class WipSchema(ma.Schema):
    class Meta:
        fields = ('wip_name', 'public', 'username', 'completed')

wip_schema = WipSchema()
wips_schema = WipSchema(many=True)

#wip tasks
class WipTask(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String(100), unique=False)
    wip_id = db.Column(db.Integer, unique=False)
    completed = db.Column(db.Boolean)

    def __init__(self, task_name, wip_id, completed):
        self.task_name = task_name
        self.wip_id = wip_id
        self.completed = completed

class WipTaskSchema(ma.Schema):
    class Meta:
        fields = ('task_name', 'wip_id', 'completed')

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
@app.route("/user/<username>", methods=["DELETE"])
def delete_user(username):
    user = User.query.get(username)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"msg":"user has been deleted"})


#create a list
@app.route("/list", methods=["POST"])
def create_list():
    list_name = request.json["list_name"]
    items = request.json["items"]
    username = request.json["username"]
    public = request.json["public"]

    new_list = List(list_name, items, username, public)

    db.session.add(new_list)
    db.session.commit()

    created_list = List.query.get(new_list.id)
    return list_schema.jsonify(created_list)

#get all lists associated with a user
@app.route("/lists/<username>", methods=["GET"])
def get_lists(username):
    all_lists = List.query.filter(List.username == username)
    result = lists_schema.dump(all_lists)
    return jsonify(result)

#get single list
@app.route("/list/<id>", methods=["GET"])
def get_list(id):
    selected_list = List.query.get(id)
    return list_schema.jsonify(selected_list)


#update a list
@app.route("/list/<id>", methods=["PUT"])
def update_list(id):
    old_list = List.query.get(id)
    list_name = request.json["list_name"]
    items = request.json["items"]
    public = request.json["public"]

    old_list.list_name = list_name
    old_list.items = items
    old_list.public = public

    db.session.commit()
    return list_schema.jsonify(old_list)

#delete a list
@app.route("/list/<id>", methods=["DELETE"])
def delete_list(id):
    selected_list = List.query.get(id)
    db.session.delete(selected_list)
    db.session.commit()

    return jsonify({"msg":"List was successfully deleted"})

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

