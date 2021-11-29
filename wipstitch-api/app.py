from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
#from werkzeug.security import generate_password_hash, check_password_hash
from flask_bcrypt import generate_password_hash, check_password_hash
# from flask_login import UserMixin
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
import os
import datetime
from decouple import config


app = Flask(__name__)
CORS(app, resources={"/login/*": {"origins": "*"}, "/authenticate": {"origins": "*"}, "/lists/*": {"origins": "*"}, "/wips/*": {"origins": "*"}, "/list": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
# CORS(app)
bcrypt = Bcrypt(app)
app.permanent_session_lifetime = datetime.timedelta(days=7)
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
        fields = ('list_name', 'items', 'public', 'username', 'id')

list_schema = ListSchema()
lists_schema = ListSchema(many=True)

#wips
class Wip(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    wip_name = db.Column(db.String(100), unique=False)
    username = db.Column(db.String(100), unique=False)
    public = db.Column(db.Boolean)
    completed = db.Column(db.Boolean)

    def __init__(self, wip_name, username, public, completed):
        self.wip_name = wip_name
        self.username = username
        self.public = public 
        self.completed = completed

class WipSchema(ma.Schema):
    class Meta:
        fields = ('wip_name', 'public', 'username', 'completed', 'id')

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
        fields = ('task_name', 'wip_id', 'completed', 'id')

wiptask_schema = WipTaskSchema()
wiptasks_schema = WipTaskSchema(many=True)

#endpoints

#login endpoint
@app.route("/login/<username>", methods=["POST"])
@cross_origin()
def login(username):
    print(request.get_json())
    username_check = request.json['username']
    password = request.json['password']
    
    user = User.query.get(username)
    password_hash = user.password

    if User.check_password(password_hash, password) == False:
        return jsonify({"msg":"incorrect password"})

    expires = datetime.timedelta(days=7)
    access_token = create_access_token(identity=username, expires_delta=expires)
    return jsonify(access_token=access_token), 200


#check for JWT
@app.route("/authenticate", methods=["POST"])
@jwt_required()
def authenticate():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
    # access_token = request.json['access_token']
    # access_token = request.json['auth']

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
    public = request.json["public_status"]

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
@app.route("/wip", methods=["POST"])
def create_wip():
    wip_name = request.json["wip_name"]
    username = request.json["username"]
    public = request.json["public"]
    completed = request.json["completed"]

    new_wip = Wip(wip_name, username, public, completed)

    db.session.add(new_wip)
    db.session.commit()

    wip = Wip.query.get(new_wip.id)

    response = wip_schema.jsonify(wip)
    return response

#get all wips associated with a user
@app.route("/wips/<username>", methods=["GET"])
def get_wips(username):
    all_wips = Wip.query.filter(Wip.username == username)
    result = wips_schema.dump(all_wips)
    return jsonify(result)

#get one wip
@app.route("/wip/<id>", methods=["GET"])
def get_wip(id):
    selected_wip = Wip.query.get(id)
    return wip_schema.jsonify(selected_wip)

#update wip
@app.route("/wip/<id>", methods=["PUT"])
def update_wip(id):
    wip = Wip.query.get(id)
    wip_name = request.json["wip_name"]
    public = request.json["public"]
    completed = request.json["completed"]

    wip.wip_name = wip_name
    wip.public = public
    wip.completed = completed

    db.session.commit()
    return wip_schema.jsonify(wip)

#delete wip
@app.route("/wip/<id>", methods=["DELETE"])
def delete_wip(id):
    wip = Wip.query.get(id)

    WipTask.query.filter(WipTask.wip_id == id).delete()

    db.session.delete(wip)
    db.session.commit()

    return jsonify({"msg":"Wip and Wip Tasks successfully deleted"})

#create wip task
@app.route("/wiptask", methods=["POST"])
def create_wiptask():
    task_name = request.json['task_name']
    wip_id = request.json['wip_id']
    completed = request.json['completed']

    new_wiptask = WipTask(task_name, wip_id, completed)

    db.session.add(new_wiptask)
    db.session.commit()

    wiptask = WipTask.query.get(new_wiptask.id)
    return wiptask_schema.jsonify(wiptask)

#get all wip tasks for a wip
@app.route("/wiptasks/<id>", methods=["GET"])
def get_wiptasks(id):
    all_wiptasks = WipTask.query.filter(WipTask.wip_id == id)
    result = wiptasks_schema.dump(all_wiptasks)
    return jsonify(result)

#update wip task
@app.route("/wiptask/<id>", methods=["PUT"])
def update_wiptask(id):
    wiptask = WipTask.query.get(id)
    task_name = request.json["task_name"]
    completed = request.json["completed"]

    wiptask.task_name = task_name
    wiptask.completed = completed

    db.session.commit()
    return wiptask_schema.jsonify(wiptask)


#delete one wiptask
@app.route("/wiptask/<id>", methods=["DELETE"])
def delete_wiptask(id):
    wiptask = WipTask.query.get(id)
    db.session.delete(wiptask)
    db.session.commit()

    return jsonify({"msg":"Wip task was successfully deleted"})


if __name__ == '__main__':
    app.run(debug=True)

