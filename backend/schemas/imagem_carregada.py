from schema import ma
from models.imagem_carregada import ImagensCarregadasModel


class ImagensCarregadasSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ImagensCarregadasModel
        load_only = ("image_data",)
        dump_only = ("id",)
        load_instance = True
