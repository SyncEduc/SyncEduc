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
    elif(target == "professor"):
        cursor.execute("SELECT * FROM tb_professores WHERE token = ?", [f"{token}"])
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
    cursor = connection.cursor()
    if(opcao == "aluno"):
        cursor.execute(f"SELECT * FROM tb_estudantes WHERE email = '{email}'")
    elif(opcao == "professor"):
        cursor.execute(f"SELECT * FROM tb_professores WHERE email = '{email}'")
    else:
        cursor.execute(f"SELECT * FROM tb_admin WHERE email = '{email}'")
    rows = cursor.fetchall()
    valid = ''
    print(rows)
    if(len(rows)==1):
        if(opcao == "aluno"):
            valid = bcrypt.check_password_hash(rows[0][4], senha)
        elif(opcao == "admin"):
            valid = True if(senha == rows[0][4]) else False
        else:
            valid = True if(bcrypt.check_password_hash(rows[0][3], senha)) else False
    else:
        return {
            "message": "Dados invalidos"
        }
    print(valid)
    if(len(rows) == 1):
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
        return{
            "message": "Erro Interno"
        }

@app.route("/usuario", methods=["POST"])
def usuario():
    tipo = request.args.get("tipo")
    token = request.args.get("token")
    cursor = connection.cursor()
    if(tipo == "aluno"):
        cursor.execute(f"SELECT * FROM tb_estudantes WHERE token = '{token}'")
    elif(tipo == "professor"):
        cursor.execute(f"SELECT * FROM tb_professores WHERE token = '{token}'",)
    else:
        cursor.execute(f"SELECT * FROM tb_admin WHERE token = '{token}'")
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
        return {
        "message": "token invalido"
    }
    

@app.route("/user")
def user():
    token = request.args.get('token') or ''
    cursor = connection.cursor()
    target = request.args.get("target") or ''
    type = request.args.get("type")
    id = request.args.get("id") or ''
    if(target == "aluno"):
        cursor.execute(f"SELECT * FROM tb_estudantes WHERE token = '{token}'")
    elif(target == "professor"):
        cursor.execute(f"SELECT * FROM tb_professores WHERE token = '{token}'")
    else:
        cursor.execute(f"SELECT * FROM tb_admin WHERE token = '{token}'")
    user = cursor.fetchall()
    if(len(user)==1):
        if(type == "aluno"):
            cursor.execute(f"SELECT * FROM tb_estudantes WHERE id = '{id}'")
        elif(type == "professor"):
            cursor.execute(f"SELECT * FROM tb_professores WHERE id = '{id}'")
        else:
            cursor.execute(f"SELECT * FROM tb_admin WHERE id = '{id}'")
        rows = cursor.fetchall()
        return {
            "avatar_url": rows[0][-2],
            "name": rows[0][1]
        }
    else:
        return {
            "message": "token Invalido"
        }
        
        
@app.route('/atualizarDado', methods=["POST"])
def atualizarDado():
    opcao = request.args.get('opcao')
    coluna = request.args.get('target')
    token = request.args.get('token')
    valor = request.args.get('value')
    print(opcao)
    if(coluna == "senha" and opcao != "admin"):
        valor = bcrypt.generate_password_hash(valor).decode("utf-8")

    if(opcao == "aluno"):
        cursor.execute(f"UPDATE tb_estudantes  SET {coluna} = ? WHERE token = ?", (f"{valor}", f"{token}"))
        connection.commit()
    elif(opcao == "professor"):
        cursor.execute(f"UPDATE tb_professores  SET {coluna} = ? WHERE token = ?", (f"{valor}", f"{token}"))
        connection.commit()
    else:
        cursor.execute(f"UPDATE tb_admin  SET {coluna} = ? WHERE token = ?", (f"{valor}", f"{token}"))
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
        return {
            "message": "Categoria deletada com sucesso"
        }


@app.route("/categorias", methods=["GET"])
def categorias():
    cursor.execute("SELECT * FROM tb_categorias")
    categories = cursor.fetchall()
    return{
        "categories": categories
    }

@app.route("/registrarProfessor", methods=["POST"])
def registrarProfessor():
    token = request.args.get('token')
    nome = request.args.get('name')
    email = request.args.get('email')
    senha = request.args.get('password')
    imageURL = request.args.get('imageURL')
    categoria_id = request.args.get("category")
    encrypt = bcrypt.generate_password_hash(senha).decode("utf-8")
    cursor.execute("SELECT * FROM tb_admin WHERE token = ?", [f"{token}"])
    jwtPayload = {
        'nome': nome,
        'email': email,
        'encrypt': encrypt
    }
    token_professor = jwt.encode({"some": f"{jwtPayload}"}, "secret", algorithm="HS256")
    users = cursor.fetchall()
    if(len(users) ==1):
        cursor.execute("INSERT INTO tb_professores(nome, email, senha, avatar_url, token, categoria) values(?,?,?,?,?,?)", [f"{nome}", f"{email}", f"{encrypt}", f"{imageURL}", f"{token_professor}", f"{categoria_id}"])
        connection.commit()
        return{
            "message": "Professor(a) cadastrado com sucesso!"
        }
    
@app.route("/professores")
def professores():
    cursor.execute("SELECT * FROM tb_professores")
    teachers = cursor.fetchall()
    return {
        "teachers": teachers
    }

@app.route("/registrarCurso", methods=["POST"])
def registrarCurso():
    token = request.args.get('token')
    cursor.execute("SELECT * FROM tb_professores WHERE token = ?", [f"{token}"])
    teacher = cursor.fetchall()
    if(len(teacher)==1):
        professor_id = teacher[0][0]
        categoria_id = teacher[0][4]
        titulo = request.args.get('title')
        descricao = request.args.get('description')
        banner_link = request.args.get('banner')
        cursor.execute("INSERT INTO tb_cursos (professor_id, categoria_id, titulo, banner_link, descricao) values(?,?,?,?,?)",
        (f"{professor_id}", f"{categoria_id}", f"{titulo}", f"{banner_link}", f"{descricao}"))
        connection.commit()
        cursor.execute("SELECT * FROM tb_cursos WHERE professor_id = ?", [f"{professor_id}"])
        rows = cursor.fetchall()
        if(len(rows)>=1):
            return {
                "course_info": rows[-1]
            }
        else:
            return {
                "message": "Erro interno"
            }
    else:
        return {
            "message": "Token invalido"
        }
    
@app.route("/resgitrarAula", methods=["POST"])
def resgitrarAula():
    token = request.args.get('token')
    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM tb_professores WHERE token = '{token}'")
    teacher = cursor.fetchall()
    
    if(len(teacher)==1):
        titulo = request.args.get("title")
        link = request.args.get("link")
        curso_id = request.args.get("curso")
        cursor.execute("INSERT INTO tb_aulas (titulo, link, curso_id) values(?,?,?)", (f"{titulo}", f"{link}", f"{curso_id}"))
        connection.commit()
        return {
            "message": "Aula cadastrada com sucesso!"
        }
    else:
        return {
            "message": "Token invalido"
        }
    
@app.route("/cursos")
def cursos():
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM tb_cursos")
    cursos = cursor.fetchall()
    return {
        "cursos": cursos
    }

@app.route("/aulas")
def aulas():
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM tb_aulas")
    aulas = cursor.fetchall()
    return {
        "aulas": aulas
    }

@app.route("/registrarComentario", methods=["POST"])
def registrarComentario():
    token = request.args.get('token') or ''
    cursor = connection.cursor()
    target = request.args.get("target") or ''
    curso_id = request.args.get("curso") or ''
    mensagem = request.args.get("mensagem") or ''
    if(target == "aluno"):
        cursor.execute(f"SELECT * FROM tb_estudantes WHERE token = '{token}'")
    elif(target == "professor"):
        cursor.execute(f"SELECT * FROM tb_professores WHERE token = '{token}'")
    else:
        cursor.execute(f"SELECT * FROM tb_admin WHERE token = '{token}'")
    user = cursor.fetchall()
    if(len(user)==1):
        cursor.execute("INSERT INTO tb_comentarios (curso_id, user_id, tipo, mensagem) values(?,?,?,?)", 
        (f"{curso_id}", f"{user[0][0]}", f"{target}", f"{mensagem}"))
        connection.commit()
        return {
            "mensagem": "Comentário enviado com sucesso"
        }
    
@app.route("/comentarios")
def comentarios():
    token = request.args.get('token') 
    cursor = connection.cursor()
    target = request.args.get("target") 
    id = request.args.get("id") 
    if(target == "aluno"):
        cursor.execute(f"SELECT * FROM tb_estudantes WHERE token = '{token}'")
    elif(target == "professor"):
        cursor.execute(f"SELECT * FROM tb_professores WHERE token = '{token}'")
    else:
        cursor.execute(f"SELECT * FROM tb_admin WHERE token = '{token}'")
    user = cursor.fetchall()
    if(len(user)==1):
        cursor = connection.cursor()
        cursor.execute(f"SELECT * FROM tb_comentarios WHERE curso_id = {id}")
        rows = cursor.fetchall()
        return {
            "comments": rows
        }
    else:
        return {
            "message": "token Invalido"
        }
    
@app.route("/registrarResposta", methods=["POST"])
def registrarResposta():
    token = request.args.get('token') or ''
    cursor = connection.cursor()
    target = request.args.get("target") or ''
    comentario_id = request.args.get("comment") or ''
    mensagem = request.args.get("mensagem") or ''
    if(target == "aluno"):
        cursor.execute(f"SELECT * FROM tb_estudantes WHERE token = '{token}'")
    elif(target == "professor"):
        cursor.execute(f"SELECT * FROM tb_professores WHERE token = '{token}'")
    else:
        cursor.execute(f"SELECT * FROM tb_admin WHERE token = '{token}'")
    user = cursor.fetchall()
    if(len(user)==1):
        cursor.execute("INSERT INTO tb_respostas (comentario_id, user_id, tipo, mensagem) values(?,?,?,?)", 
        (f"{comentario_id}", f"{user[0][0]}", f"{target}", f"{mensagem}"))
        connection.commit()
        return {
            "mensagem": "Resposta enviado com sucesso"
        }
    
@app.route("/respostas")
def respostas():
    token = request.args.get('token') 
    cursor = connection.cursor()
    target = request.args.get("target") 
    id = request.args.get("id") 
    if(target == "aluno"):
        cursor.execute(f"SELECT * FROM tb_estudantes WHERE token = '{token}'")
    elif(target == "professor"):
        cursor.execute(f"SELECT * FROM tb_professores WHERE token = '{token}'")
    else:
        cursor.execute(f"SELECT * FROM tb_admin WHERE token = '{token}'")
    user = cursor.fetchall()
    if(len(user)==1):
        cursor = connection.cursor()
        cursor.execute(f"SELECT * FROM tb_respostas WHERE comentario_id = {id}")
        rows = cursor.fetchall()
        return {
            "responses": rows
        }
    else:
        return {
            "message": "token Invalido"
        }
    


@app.route("/deletearCurso", methods=["POST"])
def deletarCurso():
    token = request.args.get('token') 
    id = request.args.get('id')
    cursor = connection.cursor()
    cursor.execute(f"SELECT * FROM tb_professores WHERE token = '{token}'")
    teacher = cursor.fetchall()
    if(len(teacher) == 1):
        cursor.execute(f"DELETE FROM tb_cursos WHERE id = {id}")
        return{
            "message": "Curso deletado com sucesso"
        }
    else:
        return {
            "message": "Token invalido"
        }    