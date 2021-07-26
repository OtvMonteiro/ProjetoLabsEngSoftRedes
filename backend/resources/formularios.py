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

camposObrigatorios = ['Nome','CPF','RG', 'Lote', 'Data de Aplicação']

class Formularios(Resource):
    @classmethod
    def post(cls):

        requestJSON = request.get_json()
        print(requestJSON)
        camposJSON = json.loads(requestJSON['camposJSON'])
        
        # Aqui serão adicionados os campos obrigatórios
        campos = camposObrigatorios.copy()
        camposUpperCase = []
        for i in range(len(campos)):
            camposUpperCase.append(campos[i].upper())

        for i in range(len(camposJSON)) :
            print(camposJSON[i]['nomeCampo'])
            if camposJSON[i]['nomeCampo'] != '' and camposJSON[i]['nomeCampo'].strip().upper() not in camposUpperCase:
                campos.append(camposJSON[i]['nomeCampo'].strip())
                camposUpperCase.append(camposJSON[i]['nomeCampo'].strip().upper())

        # Verificando se o municipio já criou um formulário
        municipio = requestJSON['nomeMunicipio']
        if FormulariosModel.find_by_municipio(municipio):
            formularioAntigo = FormulariosModel.find_by_municipio(municipio)
            print("O munícipio já tem formulário")
            formularioAntigo.delete_from_db()
        else:
            print("O munícipio não tem formulário")
        
        # Armazenando o formulário no banco de dados
        formularioDict = {
            'municipio': municipio,
            'numCampos': str(len(campos))
        }

        for i in range(len(campos)):
            formularioDict['campo'+str(i+1)] = campos[i]
        
        formulario = formulario_schema.load(formularioDict)
        formulario.save_to_db()
        
        # Criando o formulário em pdf
        bufferPDF = BytesIO()

        myPDF = Canvas(bufferPDF, pagesize=A4)
        myPDF = createPDF(campos, myPDF, municipio)
        
        bufferPDF.seek(0)
        pdfOut = bufferPDF.getvalue()
        bufferPDF.close()

        response = make_response(pdfOut)
        response.headers['Content-Disposition'] = "attachment; filename='Test.pdf"
        response.mimetype = 'application/pdf'
        return response


def createPDF(campos, canvas, nomeDoMunicipio):
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
    qr = QRCodeImage(nomeDoMunicipio, size=larguraQRCode-2*distanciaQrMargem)
    qr.drawOn(canvas, margem+larguraCabecalho+distanciaQrMargem, altura-margem-alturaCabecalhoEQR+distanciaQrMargem)

    # Cabeçalho
    canvas.setFontSize(size=20)
    canvas.drawString(margem+margem, altura-margem-alturaCabecalhoEQR+1.5*margem, "Formulário de Vacinação")

    canvas.save()

    return canvas


class RecuperarFormulario(Resource):
    @classmethod
    def post(cls):
        requestJSON = request.get_json()
        print(requestJSON)
        municipio = requestJSON['nomeMunicipio']
        print(municipio)
        formulario = FormulariosModel.find_by_municipio(municipio)
        print(formulario.municipio)

        camposRec = []
        for i in range(1,formulario.numCampos+1):
            if i == 1:
                camposRec.append(formulario.campo1)
            elif i == 2:
                camposRec.append(formulario.campo2)
            elif i == 3:
                camposRec.append(formulario.campo3)
            elif i == 4:
                camposRec.append(formulario.campo4)
            elif i == 5:
                camposRec.append(formulario.campo5)
            elif i == 6:
                camposRec.append(formulario.campo6)
            elif i == 7:
                camposRec.append(formulario.campo7)
            elif i == 8:
                camposRec.append(formulario.campo8)
            elif i == 9:
                camposRec.append(formulario.campo9)
            elif i == 10:
                camposRec.append(formulario.campo10)
            elif i == 11:
                camposRec.append(formulario.campo11)
            else:
                print("Ihh rapaz!")
        print(camposRec)

        # Criando o formulário em pdf
        bufferPDF = BytesIO()

        myPDF = Canvas(bufferPDF, pagesize=A4)
        myPDF = createPDF(camposRec, myPDF, municipio)
        
        bufferPDF.seek(0)
        pdfOut = bufferPDF.getvalue()
        bufferPDF.close()

        response = make_response(pdfOut)
        response.headers['Content-Disposition'] = "attachment; filename='Test.pdf"
        response.mimetype = 'application/pdf'
        return response

