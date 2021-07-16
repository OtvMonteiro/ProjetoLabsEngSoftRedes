from db import db


class ImagensModel(db.Model):
    __tablename__ = "imagens"
    id_imagem = db.Column(db.Integer, primary_key=True)
    imagem = db.Column(db.LargeBinary, nullable=False)

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

