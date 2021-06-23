from flask import request
from flask_restful import Resource
import werkzeug
import os

UPLOAD_DIR="C:/Users/migue/ws-labengsoft/training/backend/uploadsImages"

class UploadForm(Resource):
    @classmethod
    def post(cls):
        file = request.files['file']
        file.save(os.path.join(UPLOAD_DIR, file.filename))

        return {'hello': 'world'}

