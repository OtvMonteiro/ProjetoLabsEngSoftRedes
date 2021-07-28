from db import db

# TODO corrigir nome da classe para tabelas de imagens carregadas
class ImagensCarregadasModel(db.Model):
    __tablename__ = "images"
    id = db.Column(db.Integer, primary_key=True)
    image_data = db.Column(db.String, nullable=False)
    digitado = db.Column(db.Boolean, nullable=False)
    id_digitador = db.Column(db.Integer)
    municipio = db.Column(db.String, nullable=False)

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

    def update_digitado(self, valor: bool) -> None:
        db.session.query(ImagensCarregadasModel).filter(ImagensCarregadasModel.id == self.id).update({'digitado': valor})
        db.session.commit()

    def update_id_digitador(self, id_digitador: int) -> None:
        db.session.query(ImagensCarregadasModel).filter(ImagensCarregadasModel.id == self.id).update({'id_digitador': id_digitador})
        db.session.commit()
    
    @classmethod
    def query_available(cls) -> "ImagensCarregadasModel":
        return cls.query.filter_by(digitado=False, id_digitador=None).first()

    @classmethod
    def find_by_id(cls, _id: int) -> "ImagensCarregadasModel":
        return cls.query.filter_by(id=_id).first()