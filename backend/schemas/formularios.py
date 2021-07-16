from schema import ma
from models.formularios import FormulariosModel


class FormulariosSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = FormulariosModel
        dump_only = ("id_formulario",)
        load_instance = True
