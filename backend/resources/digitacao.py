import json
from io import BytesIO
from flask import request, make_response, send_file
from flask_restful import Resource
from PIL import Image
import base64
from pyzbar import pyzbar

from models.formularios import FormulariosModel
from models.imagem_carregada import ImagensCarregadasModel
from schemas.imagem_carregada import ImagensCarregadasSchema
from models.user import UserModel

imagens_carregadas_model = ImagensCarregadasModel()

from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    jwt_required,
)


documento_por_digitador = {}

class DocumentoSendoDigitado:
    
    def __init__(self, nome_digitador) -> None:
        self.nome_digitador = nome_digitador
        self.counter = 0
        self.nomes_campos = []
        self.images_campos = []
        self.campos_digitados = []
        self.nome_municipio = ''
        self.digitacao_terminada = False
        self.image_file = None
        self.image_orm = None
        self.num_campos = 0
        self.valid = True

        self.image_orm = ImagensCarregadasModel.query_available()

        # print(self.image_orm)
        if self.image_orm:
            image_file_path = base64.b64decode(self.image_orm.image_data)
            img_bytesIO = BytesIO(image_file_path)
            img_bytesIO.seek(0)
            self.image_file = Image.open(img_bytesIO)

            pyzbar_decode = pyzbar.decode(self.image_file)
            if pyzbar_decode:
                qrcode_decoded = pyzbar_decode[0]
            else:
                qrcode_decoded = None
                # print('QR Code não reconhecido')
                self.valid = {"message": 'QR Code não reconhecido'}, 402
                
            self.nome_municipio = qrcode_decoded.data.decode()
            formulario_model = FormulariosModel.find_by_municipio(self.nome_municipio)
            self.num_campos = formulario_model.numCampos
            
            if self.num_campos < 1:
                self.valid = {"message": 'Não foram definidos campos'}, 401
                
            for i in range(self.num_campos):
                nome_campo = formulario_model.__getattribute__('campo'+str(i+1))
                self.nomes_campos.append(nome_campo)

            campo_area = [0, 0, 1469, 169]
            campo1_coord_x = 99
            campo1_coord_y = 412

            for i in range(self.num_campos):
                campo_coord = [campo1_coord_x, campo1_coord_y+158*i]
                specific_campo_area = get_specific_campo_area(campo_area, campo_coord)
                campo_img = self.image_file.crop(specific_campo_area)

                img_io = BytesIO()
                campo_img.save(img_io, 'PNG', quality=70)
                img_io.seek(0)
                data = "data:image/png;base64," + base64.b64encode(img_io.read()).decode()
                self.images_campos.append(data)

            self.valid = {'message': 'Deu certo!'}, False
            self.set_digitador(nome_digitador)
            return
        else:
            # print('Nenhum formulário para digitar')
            self.valid = {"message": 'Não há formulários para digitar'}, 404

    def get_current_state(self):
        if self.counter == self.num_campos:
            return {'nomes_campos':self.nomes_campos, 'campos_digitados':self.campos_digitados, 'finalizada': True, 'nome_municipio':self.nome_municipio}
        return {'image_data':self.images_campos[self.counter], 'nome_campo':self.nomes_campos[self.counter], 'total_campos':self.num_campos, 'num_campo':self.counter, 'finalizada': self.digitacao_terminada, 'nome_municipio':self.nome_municipio}

    def adiciona_campo_digitado(self, campo):
        self.campos_digitados.append(campo)
        self.counter+=1

        if self.counter == self.num_campos:
            self.digitacao_terminada = True
            self.image_orm.update_digitado(True)
            documento_por_digitador.pop(self.nome_digitador)
            return {'nomes_campos':self.nomes_campos, 'campos_digitados':self.campos_digitados, 'finalizada': True, 'nome_municipio':self.nome_municipio}
        else:
            return self.get_current_state()

    def set_digitador(self, nome_digitador):
        digitador = UserModel.find_by_username(nome_digitador)
        self.image_orm.update_id_digitador(digitador.id)

    def envia_campos_digitados(self):

        vacivida_api_dict = {}
        for i in range(len(self.nomes_campos)):
            vacivida_api_dict[self.nomes_campos[i]] = self.campos_digitados[i]

        print('Enviado ao Vacivida:', vacivida_api_dict)


def get_specific_campo_area(campo_area, campo_coord):
    return (campo_area[0]+campo_coord[0],campo_area[1]+campo_coord[1],campo_area[2]+campo_coord[0],campo_area[3]+campo_coord[1])


class ContinueDigitacao(Resource):
    @classmethod
    def post(cls):
        requestJSON = request.get_json()
        # print(requestJSON)

        formdata = json.loads(requestJSON['formdata'])
        campo_text = formdata['campo_text']
        nome_digitador = formdata.get('nome_digitador', False)
        if not nome_digitador:
            return {'message': 'Por favor, faça login para poder acessar essa página.', 'erro': True}
        # campo_info = formdata['campo_info']

        documento: DocumentoSendoDigitado = documento_por_digitador[nome_digitador]

        estado_atual = documento.adiciona_campo_digitado(campo_text) 

        return estado_atual


class LoadDigitacao(Resource):
    @classmethod
    def post(cls):

        requestJSON = request.get_json()
        # print(request.data)
        # print(requestJSON)

        nome_digitador = requestJSON.get('nome_digitador', False)
        if not nome_digitador:
            return {'message': 'Por favor, faça login para poder acessar essa página.', 'erro': True}
        
        # print(nome_digitador)
        documento = documento_por_digitador.get(nome_digitador, False)
        # print(documento)
        if not documento:

            new_documento = DocumentoSendoDigitado(nome_digitador)
            # print(new_documento)
            msg, erro = new_documento.valid

            if erro:
                print('erro ao gerar documento', erro)
                return {**msg, 'erro': True}

            documento_por_digitador[nome_digitador] = new_documento

        documento: DocumentoSendoDigitado = documento_por_digitador[nome_digitador]
        # print(documento, documento.nomes_campos)

        # if not documento.digitacao_terminada:
        
        return documento.get_current_state()
