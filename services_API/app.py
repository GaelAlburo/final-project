from flask import Flask
from flask_cors import CORS
from flasgger import Swagger

from models.services_model import ServicesModel
from services.services_service import ServicesService
from schemas.services_schema import ServiceSchema
from routes.services_route import ServiceRoute

app = Flask(__name__)
CORS(app)

# Swagger
swagger = Swagger(app)

# Model
db_conn = ServicesModel()
db_conn.connect_to_database()

# Service
review_service = ServicesService(db_conn)

# Schema
review_schema = ServiceSchema()

# Routes
review_routes = ServiceRoute(review_service, review_schema)

# Register the blueprint to make the routes available in the app
app.register_blueprint(review_routes)

if __name__ == "__main__":
    try:
        app.run(debug=True)
    finally:
        db_conn.close_connection()
