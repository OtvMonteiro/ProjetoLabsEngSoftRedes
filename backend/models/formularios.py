from db import db


class FormulariosModel(db.Model):
    __tablename__ = "formularios"
    id_formulario = db.Column(db.Integer, primary_key=True)
    municipio = db.Column(db.String(80), unique=True, nullable=False)
    numCampos = db.Column(db.Integer, nullable=False)
    campo1 = db.Column(db.String(80))
    campo2 = db.Column(db.String(80))
    campo3 = db.Column(db.String(80))
    campo4 = db.Column(db.String(80))
    campo5 = db.Column(db.String(80))
    campo6 = db.Column(db.String(80))
    campo7 = db.Column(db.String(80))
    campo8 = db.Column(db.String(80))
    campo9 = db.Column(db.String(80))
    campo10 = db.Column(db.String(80))
    campo11 = db.Column(db.String(80))

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_municipio(cls, municipio: str) -> "FormulariosModel":
        return cls.query.filter_by(municipio=municipio).first()

