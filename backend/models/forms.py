from db import db

# TODO corrigir nome da classe para tabelas de imagens carregadas
class FormsModel(db.Model):
    __tablename__ = "images"
    id = db.Column(db.Integer, primary_key=True)
    image_data = db.Column(db.String, nullable=False)
    digitado = db.Column(db.Boolean, nullable=False)
#    image_data = db.Column(db.LargeBinary, nullable=False)


    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
    @classmethod
    def find_by_id(cls, _id: int) -> "FormsModel":
        return cls.query.filter_by(id=_id).first()

