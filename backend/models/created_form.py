from db import db


class CreatedFormModel(db.Model):
    __tablename__ = "createdform"
    id_formulario = db.Column(db.Integer, primary_key=True)
    qr_code = db.Column(db.LargeBinary, unique=True)
    pdf = db.Column(db.LargeBinary)
    municipio = db.Column(db.String(80), nullable=False)


class FieldsForm(db.Model):
    __tablename__ = "fieldsform"
    id_campo = db.Column(db.Integer, primary_key=True)
    id_formulario = db.Column(db.Integer, db.ForeignKey("createdform.id_formulario"), nullable=False)
    nome = db.Column(db.String(80), nullable=False)
    posicao = db.Column(db.Integer, nullable=False)
    tamanho = db.Column(db.Integer, nullable=False)
