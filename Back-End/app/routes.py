from app import app, bcrypt, cursor, connection
from flask import Flask, request
import jwt


@app.route("/registro", methods=['POST'])
def registro():
    nome = request.args.get('nome')
    email = request.args.get('email')
    senha = request.args.get('senha')
    nascimento = request.args.get('nascimento')
    encrypt = bcrypt.generate_password_hash(senha)
    
    jwtPayload = {
        'nome': nome,
        'email': email,
        'nascimento': nascimento,
        'encrypt': encrypt
    }
    token = jwt.encode({"some": f"{jwtPayload}"}, "secret", algorithm="HS256")
    cursor.execute(f"SELECT * FROM tb_estudantes WHERE email = ?", [f"{email}"])
    rows = cursor.fetchall()
    if(len(rows)>=1):
        return {
            "message": "Email já cadastrado!"
        }
    else:
        cursor.execute("INSERT INTO tb_estudantes(nome, email, nascimento, senha, token) values(?,?,?,?,?)", 
                    (f"{nome}",f"{email}",f"{nascimento}",f"{encrypt}", f"{token}"))
        connection.commit()
        return {
            "token": token
        }


@app.route("/verificarToken", methods=["POST"])
def verificarToken():
    token = request.args.get("token")
    cursor.execute("SELECT * FROM tb_estudantes WHERE token = ?", [f"{token}"])
    rows = cursor.fetchall()
    if(len(rows)==1):
        return {
            "token": token
        }
    else:
        return {
            "message": "Token invalido"
        }






