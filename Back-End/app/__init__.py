from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
import sqlite3

app = Flask(__name__)
app.config['SECRET_KEY'] = 'SENHA SECRETA'

cors = CORS(app)
bcrypt = Bcrypt(app)



connection = sqlite3.connect("app/database.sqlite", check_same_thread=False)
cursor = connection.cursor()

from app import routes


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
