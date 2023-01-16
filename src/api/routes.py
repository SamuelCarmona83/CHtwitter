"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Tweet
from api.utils import generate_sitemap, APIException
import hashlib


#Importaciones de JWT
from flask_jwt_extended import jwt_required
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity

api = Blueprint('api', __name__)

@api.route('/user', methods=['GET','POST'])
def handle_user():
    if request.method == 'GET':
        response_body = {
            "msg": "Hello, this is your GET /user response 😎"
        }
        return jsonify(response_body), 200
    else:
        body = request.json

        if 'email' not in body:
            return 'El usuario no tiene email', 400
        if 'password' not in body:
            return 'El usuario no tiene password', 400
        if 'username' not in body:
            return 'El usuario no tiene username', 400
        if 'profile_name' not in body:
            return 'El usuario no tiene profile_name', 400
        
        profile = User.query.filter_by(email=body['email']).one_or_none()
        if profile == None:
            new_user = User(body['email'], hashlib.md5( body['password'].encode() ).hexdigest(), body['username'], body['profile_name'])
            
            try:
                db.session.add(new_user)
                db.session.commit()
                return "Se ha creado el usuario con exito!✅"
            except Exception as err:
                return 'Ha ocurrido un error!💥', 500
            #User(email, password, username, profile_name)
        else:
            return "Ya existe un usuario con ese email!", 400

        return "Method not implemented yet!",500

@api.route('/profile/<string:user_name>', methods=['GET'])
def get_profile(user_name):
    profile = User.query.filter_by(username=user_name).one_or_none()
    if profile == None:
        return 'Ese usuario no existe ❌', 404
    else:
        return jsonify(profile.get_profile()), 200


@api.route('/tweets', methods=['GET'])
def get_tweets():
    all_tweets = Tweet.query.all()
    return jsonify(
            list(reversed([ tweet.serialize() for tweet in all_tweets ]))
        ), 200


@api.route('/tweets', methods=['POST'])
@jwt_required()
def post_tweet():
    body = request.json
    if "content" not in body:
        return "Ese tuit no tiene contenido! ⛔", 400
    else:
        author = User.query.filter_by(username=get_jwt_identity()).one_or_none()
        if author == None:
            return "Ese usuario no existe en tuiter.", 404
        else:
            new_tweet = Tweet(body["content"], author, body["image"])
            db.session.add(new_tweet) #Memoria RAM
            try:
                db.session.commit() #Guarda en datos solidos!
                return jsonify(new_tweet.serialize()), 201
            except Exception as err:
                return jsonify({ "error": "Ocurrio un error en el servidor 🐬"}), 500
        #return jsonify(new_tweet.serialize()), 201
    return "Error algo ah ocurrido! 🐋", 404

@api.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username == None or password == None:
        return jsonify({"msg": "Bad username or password"}), 401
    else:
        profile = User.query.filter_by(username=username, password=hashlib.md5( password.encode() ).hexdigest()).one_or_none()
        if profile == None:
            return 'El usuario no esta registrado en Chuiter', 404
        else:
            access_token = create_access_token(identity=username)
            return jsonify({"token": access_token })

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200