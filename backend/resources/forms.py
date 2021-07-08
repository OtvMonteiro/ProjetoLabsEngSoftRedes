from sqlite3.dbapi2 import connect
from flask import request
from flask_restful import Resource
import werkzeug
import os
import sqlite3


class UploadForm(Resource):
    @classmethod
    def post(cls):
        print('comecou')
        print(request)
        print(request.data)
        print(request.files)
        imagem = request.files['imagem']
        imagem.seek(0)
        # file.save(os.path.join(UPLOAD_DIR, file.filename))
        connection = sqlite3.connect(r'C:\Users\migue\ws-labengsoft\projeto\ProjetoLabsEngSoftRedes\backend\data.db')
        connection.execute("""INSERT INTO images ("image_data") values (?)""", [sqlite3.Binary(imagem.read())])
        connection.commit()
        print('sucesso')
        return {'hello': 'world'}

