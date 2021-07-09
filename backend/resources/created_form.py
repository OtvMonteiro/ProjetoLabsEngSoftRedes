from flask import request
from flask_restful import Resource
import json


class CreatedForm(Resource):
    @classmethod
    def post(cls):

        requestJSON = request.get_json()
        x = json.loads(requestJSON['camposJSON'])
        # print(type(x))
        # print(len(x))
        
        for i in range(len(x)) :
            print(x[i]['nomeCampo'])

        return {"message": "Enviado com sucesso!"}, 201
