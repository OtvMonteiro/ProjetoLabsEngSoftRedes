import json
from io import StringIO
from flask import request, make_response, send_file
from flask_restful import Resource
from reportlab.pdfgen.canvas import Canvas
from reportlab.lib.pagesizes import A4
# from reportlab.lib.units import cm

class CreatedForm(Resource):
    @classmethod
    def post(cls):

        requestJSON = request.get_json()
        x = json.loads(requestJSON['camposJSON'])
        # print(type(x))
        # print(len(x))
        
        campos = []
        for i in range(len(x)) :
            print(x[i]['nomeCampo'])
            campos.append(x[i]['nomeCampo'])

        canvas = createPDF(campos)
        canvas.save()

        # return {"message": "Enviado com sucesso!"}, 201
        return send_file("FormulárioTeste.pdf", as_attachment=True)

def createPDF(campos):
    '''
        Gera um formulário em pdf utilazando reportlab
    '''
    canvas = Canvas("FormulárioTeste.pdf", pagesize=A4)
    canvas = headWrite(canvas)

    return canvas


def headWrite(canvas):
    '''
        Escreve o cabeçalho do formulário
    '''
    width, height = A4 # paper size
    margin = 20

    # roundRect(x,y,width,height,stroke,fill)
    canvas.roundRect( (width/2 - (width/2-margin)), (height-margin-25), (width-2*margin), 25, 5, stroke=1, fill=0)
    canvas.drawString((width/2 - (width/2-margin) + margin), (height-margin+2), "Nome:")

    return canvas
