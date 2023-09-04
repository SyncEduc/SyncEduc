from app import app, bcrypt, cursor, connection
from flask import Flask, request
import jwt


@app.route("/registro", methods=['POST'])
def registro():
    nome = request.args.get('nome')
    email = request.args.get('email')
    senha = request.args.get('senha')
    nascimento = request.args.get('nascimento')
    encrypt = bcrypt.generate_password_hash(senha).decode("utf-8")
    
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
            "token": token,
            "target": "aluno"
        }


@app.route("/verificarToken", methods=["POST"])
def verificarToken():
    token = request.args.get("token")
    target = request.args.get("target")
    if(target == "aluno"):
        cursor.execute("SELECT * FROM tb_estudantes WHERE token = ?", [f"{token}"])
        rows = cursor.fetchall()
        if(len(rows)==1):
            return {
                "token": token,
                "target": target
            }
        else:
            return {
                "message": "Token invalido"
            }
        
    else:
        cursor.execute("SELECT * FROM tb_admin WHERE token = ?", [f"{token}"])
        rows = cursor.fetchall()
        print(rows)
        if(len(rows)==1):
            return {
                "token": token,
                "target": target
            }
        else:
            return {
                "message": "Token Invalido"
            }

@app.route("/login", methods=["POST"])
def login():
    email = request.args.get("email")
    senha = request.args.get("senha")
    opcao = request.args.get("opcao")
    if(opcao == "aluno"):
        cursor.execute(f"SELECT * FROM tb_estudantes WHERE email = ?", [f"{email}"])
        rows = cursor.fetchall()
        if(len(rows) == 1):
            valid = bcrypt.check_password_hash(rows[0][4], senha)
            if(valid):
                return {
                    "token": rows[0][-1],
                    "target": opcao
                }
            else:
                return {
                    "message": "Dados invalidos"
                }
    else:
        cursor.execute(f"SELECT * FROM tb_admin WHERE email = ?", [f"{email}"])
        rows = cursor.fetchall()
        if(len(rows) == 1):
            valid = True if(rows[0][4] == senha) else False
            if(valid):
                return {
                    "token": rows[0][-1],
                    "target": opcao
                }
            else:
                return {
                    "message": "Dados invalidos"
                }

@app.route("/usuario", methods=["POST"])
def usuario():
    tipo = request.args.get("tipo")
    token = request.args.get("token")
    if(tipo == "aluno"):
        cursor.execute(f"SELECT * FROM tb_estudantes WHERE token = ?", [f"{token}"])
        rows = cursor.fetchall()
        if(len(rows)==1):
            return {
                "nome": rows[0][1],
                "email": rows[0][2],
                "nascimento": rows[0][3],
                "senha": rows[0][4],
                "descricao": rows[0][5],
                "avatar_url": rows[0][6]
            }
    else:
        cursor.execute(f"SELECT * FROM tb_admin WHERE token = ?", [f"{token}"])
        rows = cursor.fetchall()
        if(len(rows)==1):
            return {
                "nome": rows[0][1],
                "email": rows[0][2],
                "nascimento": rows[0][3],
                "senha": rows[0][4],
                "descricao": rows[0][5],
                "avatar_url": rows[0][6]
            }
        
@app.route('/atualizarDado', methods=["POST"])
def atualizarDado():
    coluna = request.args.get('target')
    token = request.args.get('token')
    valor = request.args.get('value')
    if(coluna == "senha"):
        valor = bcrypt.generate_password_hash(valor).decode("utf-8")
    cursor.execute(f"UPDATE tb_estudantes  SET {coluna} = ? WHERE token = ?", (f"{valor}", f"{token}"))
    connection.commit()
    return {
        "token": token
    }

@app.route("/registrarCategoria", methods=["POST"])
def registrarCategoria():
    token = request.args.get('token')
    nome = request.args.get('name')
    cursor.execute("SELECT * FROM tb_admin WHERE token = ?", [f"{token}"])
    users = cursor.fetchall()
    if(len(users) ==1):
        cursor.execute("INSERT INTO tb_categorias(name) values(?)", [f"{nome}"])
        connection.commit()
        return{
            "message": "Categoria cadastrada com sucesso"
        }
@app.route("/deletarCategoria", methods=["POST"])
def deletarCategoria():
    token = request.args.get('token')
    id = request.args.get('id')
    cursor.execute("SELECT * FROM tb_admin WHERE token = ?", [f"{token}"])
    users = cursor.fetchall()
    if(len(users) ==1):
        cursor.execute("DELETE FROM tb_categorias WHERE id = ?", [f"{id}"])
        connection.commit()
        return{
            "message": "Categoria deletada com sucesso"
        }


@app.route("/categorias", methods=["GET"])
def categorias():
    cursor.execute("SELECT * FROM tb_categorias")
    categories = cursor.fetchall()
    return{
        "categories": categories
    }
