import json
from io import BytesIO
from flask import request, make_response, send_file
from flask_restful import Resource
from reportlab.pdfgen.canvas import Canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab_qrcode import QRCodeImage


from models.formularios import FormulariosModel
from schemas.formularios import FormulariosSchema

formulario_schema = FormulariosSchema()

class Formularios(Resource):
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

        # Verificando se o municipio já criou um formulário
        municipio = 'São Paulo' # TODO Esse municipio vem do nome usuário
        if FormulariosModel.find_by_municipio(municipio):
            formularioAntigo = FormulariosModel.find_by_municipio(municipio)
            print("achou Barueri")
            formularioAntigo.delete_from_db()
        else:
            print("não achou Barueri")
        
        # Armazenando o formulário no banco de dados
        formularioDict = {
            'municipio': municipio,
            'numCampos': str(len(campos))
        }

        for i in range(len(campos)):
            formularioDict['campo'+str(i+1)] = campos[i]
        
        formulario = formulario_schema.load(formularioDict)
        formulario.save_to_db()

        # Teste de armazenamento no db (ESTÁ FUNCIONANDO)
        # testJson = {
        #     'municipio': 'Barueri',
        #     'numCampos': str(len(campos)),
        #     'campo1': campos[0],
        #     'campo2': campos[1],
        #     'campo3': campos[2]
        # }
        # test = formulario_schema.load(testJson)
        # test.save_to_db()
        
        # Criando o formulário em pdf
        bufferPDF = BytesIO()

        myPDF = Canvas(bufferPDF, pagesize=A4)
        myPDF = createPDF(campos, myPDF)        
        
        # myPDF.drawString(50,50,'Backend')
        # myPDF.save()
        
        bufferPDF.seek(0)
        pdfOut = bufferPDF.getvalue()
        bufferPDF.close()

        '''
        # return {"message": "Enviado com sucesso!"}, 201
        # return send_file("FormulárioTeste.pdf", as_attachment=True)
        '''
        response = make_response(pdfOut)
        response.headers['Content-Disposition'] = "attachment; filename='Test.pdf"
        response.mimetype = 'application/pdf'
        return response


def createPDF(campos, canvas):
    '''
        Gera um formulário em pdf utilazando reportlab
    '''
    canvas.setTitle("Formulário de Vacinação")

    # paper size
    largura = 21.0*cm
    altura = 29.7*cm
    margem = 1*cm

    alturaCabecalhoEQR = 4.0*cm
    larguraCabecalho = 15.0*cm
    larguraQRCode = 4.0*cm

    espacamento = 1.0*cm
    alturaCampo = 1.0*cm
    larguraCampo = 17.0*cm
    margemCampo = 1.0*cm

    distanciaNomeCampo = 0.2*cm
    distanciaQrMargem = 0.1*cm

    # variáveis
    numeroDeCampos = len(campos)

    # Criação do Formulário

    # Margem: 
    canvas.rect(margem, margem, largura-2*margem, altura-2*margem)
    # Margem do Cabeçalho: 
    canvas.rect(margem, altura-margem-alturaCabecalhoEQR, larguraCabecalho, alturaCabecalhoEQR)
    # Margem do QRCode: 
    canvas.rect(margem+larguraCabecalho, altura-margem-alturaCabecalhoEQR, larguraQRCode, alturaCabecalhoEQR)

    # Campos e suas identificações:
    for i in range(numeroDeCampos):
        yPosicaoCampo = altura-margem-alturaCabecalhoEQR-(i+1)*(espacamento+alturaCampo)
        canvas.roundRect(margem+margemCampo, yPosicaoCampo, larguraCampo, alturaCampo, 5)
        canvas.drawString(margem+margemCampo, yPosicaoCampo+alturaCampo+distanciaNomeCampo, campos[i])

    # QrCode:
    qr = QRCodeImage('Deu trabalho, mas a gente conseguiu', size=larguraQRCode-2*distanciaQrMargem)
    qr.drawOn(canvas, margem+larguraCabecalho+distanciaQrMargem, altura-margem-alturaCabecalhoEQR+distanciaQrMargem)

    # Cabeçalho
    canvas.setFontSize(size=20)
    canvas.drawString(margem+margem, altura-margem-alturaCabecalhoEQR+1.5*margem, "Formulário de Vacinação")

    canvas.save()

    return canvas
