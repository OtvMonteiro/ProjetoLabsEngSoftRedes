from schema import ma
from models.forms import FormsModel


class FormsSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = FormsModel
        # load_only = ("image_data",)
        dump_only = ("id",)
        load_instance = True
