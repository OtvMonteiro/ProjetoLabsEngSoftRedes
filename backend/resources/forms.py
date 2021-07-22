#from sqlite3.dbapi2 import connect
from typing import BinaryIO
from flask import request
from flask_restful import Resource
#from werkzeug import secure_filename
from PIL import Image
import io
import os

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
        
        img_byte_arr = img_byte_arr.getvalue()
        #img_byte_arr = img_byte_arr.read()

        print(imagem_PIL)
        print(imagem_PIL_resized)
        print('sucesso')

        
        dados = { 'image_data' : str(img_byte_arr), 
                    'digitado' : False,
                    'id_digitador' : None
        } 
        formulario = forms_schema.load(dados)
        formulario.save_to_db()


        # # return {'hello': 'world'}
        # # file.save(os.path.join(UPLOAD_DIR, file.filename))
        # # connection = sqlite3.connect(r'A:\Documents\GitHub\ProjetoLabsEngSoftRedes - Main\backend\data.db')
        # connection.execute("""INSERT INTO images ("image_data") values (?)""", [sqlite3.Binary(img_byte_arr)])
        # connection.commit()
        print('sucesso')
        return dados
#        return {'hello': 'world'}

# def upload_aws():
#     key = Auth.auth_user()
#     bucket = 'profile-photos'
#     content_type = request.mimetype
#     imagem = request.files['file']
#     imagem.seek(0)
#     imagem_PIL = Image.open(imagem)
#     image_file = imagem_PIL.resize((1656, 2339))



#     client = boto3.client('s3',
#                           region_name='sfo2',
#                           endpoint_url='https://example.xxx.amazonaws.com',
#                           aws_access_key_id=os.environ['AWS_ACCESS_KEY'],
#                           aws_secret_access_key=os.environ['AWS_SECRET_KEY'])

#     filename = secure_filename(image_file.filename)  # This is convenient to validate your filename, otherwise just use file.filename

#     client.put_object(Body=image_file,
#                       Bucket=bucket,
#                       Key=filename,
#                       ContentType=content_type)

#     return custom_response({'message': 'image uploaded'}, 200)

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


