from sqlite3.dbapi2 import connect
from typing import BinaryIO
from flask import request
from flask_restful import Resource
import werkzeug
import os
import sqlite3
from PIL import Image
import io
import db


from models.forms import FormsModel
from schemas.forms import FormsSchema

forms_schema = FormsSchema()


class UploadForm(Resource):

    @classmethod
    def post(cls):
        
        print('comecou')
        print(request)
        print(request.data)
        print(request.files)
        imagem = request.files['imagem']
        imagem.seek(0)

        imagem_PIL = Image.open(imagem)
        imagem_PIL_resized = imagem_PIL.resize((1656, 2339))

        img_byte_arr = io.BytesIO()
        if imagem.content_type.find('jpeg') != -1 or imagem.content_type.find('jpg') != -1:
            imagem_PIL_resized.save(img_byte_arr, format='jpeg')
        else:
            imagem_PIL_resized.save(img_byte_arr, format='png')
        
        #img_byte_arr = img_byte_arr.getvalue()
        img_byte_arr = img_byte_arr.read()

        print(imagem_PIL)
        print(imagem_PIL_resized)
        print('sucesso')

        
        dados = { 'image_data' : img_byte_arr } 
        formulario = forms_schema.load(dados)
        formulario.save_to_db()


        # # return {'hello': 'world'}
        # # file.save(os.path.join(UPLOAD_DIR, file.filename))
        # # connection = sqlite3.connect(r'A:\Documents\GitHub\ProjetoLabsEngSoftRedes - Main\backend\data.db')
        # connection.execute("""INSERT INTO images ("image_data") values (?)""", [sqlite3.Binary(img_byte_arr)])
        # connection.commit()
        print('sucesso')
        return {'hello': 'world'}


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


