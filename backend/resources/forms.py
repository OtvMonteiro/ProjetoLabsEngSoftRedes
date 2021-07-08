from sqlite3.dbapi2 import connect
from flask import request
from flask_restful import Resource
import werkzeug
import os
import sqlite3
from PIL import Image
import io

from db import db

# class UploadForm(Resource):

#     @classmethod
#     def post(cls):
#         print('comecou')
#         print(request)
#         print(request.data)
#         print(request.files)
#         imagem = request.files['imagem']
#         imagem.seek(0)

#         imagem_PIL = Image.open(imagem)
#         imagem_PIL_resized = imagem_PIL.resize((1000, 1000))

#         img_byte_arr = io.BytesIO()
#         imagem_PIL_resized.save(img_byte_arr, format='jpeg')
#         img_byte_arr = img_byte_arr.getvalue()

#         print(imagem_PIL)
#         print(imagem_PIL_resized)
#         print('sucesso')
#         # return {'hello': 'world'}
#         # file.save(os.path.join(UPLOAD_DIR, file.filename))
#         # connection = sqlite3.connect(r'A:\Documents\GitHub\ProjetoLabsEngSoftRedes - Main\backend\data.db')
#         connection.execute("""INSERT INTO images ("image_data") values (?)""", [sqlite3.Binary(img_byte_arr)])
#         connection.commit()
#         print('sucesso')
#         return {'hello': 'world'}

class FormsModel(db.Model):
    __tablename__ = "images"
    id = db.Column(db.Integer, primary_key=True)
    image_data = db.Column(db.BLOB, nullable=False, unique=True)

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

