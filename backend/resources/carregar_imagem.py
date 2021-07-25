#from sqlite3.dbapi2 import connect
from typing import BinaryIO
from flask import request
from flask_restful import Resource
#from werkzeug import secure_filename
from PIL import Image
import io
import os
import base64
from models.imagem_carregada import ImagensCarregadasModel
from schemas.imagem_carregada import ImagensCarregadasSchema
from pyzbar import pyzbar
from pyzbar.pyzbar import Point
import math

imagens_carregadas_schema = ImagensCarregadasSchema()


class UploadForm(Resource):

    @classmethod
    def post(cls):
        
        imagem = request.files['imagem']
        imagem.seek(0)

        imagem_PIL = Image.open(imagem)
        max_width = 4000.
        orig_rel = imagem_PIL.height/imagem_PIL.width
        max_height = orig_rel*max_width
        imagem_PIL = imagem_PIL.resize((int(max_width), int(max_height)))
        # imagem_PIL_resized = imagem_PIL.resize((1656, 2339))
        qrcode_area = [imagem_PIL.width/2, 0, imagem_PIL.width, imagem_PIL.height/2]
        qrcode_image = imagem_PIL.crop(qrcode_area)
        pyzbar_decode = pyzbar.decode(qrcode_image)

        if not pyzbar_decode:
            return 'QR Code não reconhecido'

        qrcode_decoded = pyzbar_decode[0]

        # imagem torta : Decoded(data=b'Barueri', type='QRCODE', rect=Rect(left=1141, top=184, width=196, height=200), polygon=[Point(x=1141, y=196), Point(x=1153, y=384), Point(x=1337, y=367), Point(x=1325, y=184)])
        # imagem nomal : Decoded(data=b'Barueri', type='QRCODE', rect=Rect(left=1310, top=127, width=217, height=217), polygon=[Point(x=1310, y=127), Point(x=1310, y=344), Point(x=1527, y=344), Point(x=1527, y=127)])
        qrcode_polygon = qrcode_decoded.polygon

        x0 = float(qrcode_polygon[0].x)
        y0 = float(qrcode_polygon[0].y)

        x3 = float(qrcode_polygon[3].x)
        y3 = float(qrcode_polygon[3].y)

        height_diff = abs(y0 - y3)
        width_diff = abs(x0 - x3)
        hypotenuse = math.sqrt(height_diff**2 + width_diff**2)
        rotate = (180/math.pi)*math.asin(height_diff/hypotenuse)

        if y3 < y0:
            imagem_rotated = imagem_PIL.rotate(-rotate)
        else:
            imagem_rotated = imagem_PIL.rotate(rotate)

        pyzbar_decode_rotated = pyzbar.decode(imagem_rotated)

        if not pyzbar_decode_rotated:
            return 'QR Code não reconhecido'

        qrcode_polygon_rotated = pyzbar_decode_rotated[0].polygon
        qrcode_polygon_expected = [Point(x=1310, y=127), Point(x=1310, y=344), Point(x=1527, y=344), Point(x=1527, y=127)]

        rotated_width_diff = abs(qrcode_polygon_rotated[0].x - qrcode_polygon_rotated[2].x)
        # rotated_height_diff = abs(qrcode_polygon_rotated[0].y - qrcode_polygon_rotated[2].y)

        expected_width_diff = abs(qrcode_polygon_expected[0].x - qrcode_polygon_expected[2].x)
        # expected_height_diff = abs(qrcode_polygon_expected[0].y - qrcode_polygon_expected[2].y)

        relation = expected_width_diff/rotated_width_diff

        resize_width = imagem_rotated.width * relation
        resize_height = imagem_rotated.height * relation
        
        imagem_resized = imagem_rotated.resize((int(resize_width), int(resize_height)))
        pyzbar_decode_resized = pyzbar.decode(imagem_resized)

        if not pyzbar_decode_resized:
            return 'QR Code não reconhecido'

        qrcode_polygon_resized = pyzbar_decode_resized[0].polygon

        x1 = qrcode_polygon_resized[3].x+129 - 1656
        y1 = qrcode_polygon_resized[3].y-129

        x2 = qrcode_polygon_resized[3].x+129
        y2 = qrcode_polygon_resized[3].y-129 + 2339

        crop_area = [x1, y1, x2, y2]
        imagem_cropped = imagem_resized.crop(crop_area)

        img_byte_arr = io.BytesIO()
        if imagem.content_type.find('jpeg') != -1 or imagem.content_type.find('jpg') != -1:
            imagem_cropped.save(img_byte_arr, format='jpeg')
        else:
            imagem_cropped.save(img_byte_arr, format='png')
        
        img_byte_arr = img_byte_arr.getvalue()
        #img_byte_arr = img_byte_arr.read()

        dados = { 'image_data' : base64.b64encode(img_byte_arr), 
                    'digitado' : False,
                    'id_digitador': None
        } 
        formulario = imagens_carregadas_schema.load(dados)
        formulario.save_to_db()

        print('sucesso')
        return 'sucesso'



