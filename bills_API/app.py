from flask import Flask
from flask_cors import CORS
from flasgger import Swagger

from models.bills_model import BillsModel
from services.bills_service import BillsService
from schemas.bills_schema import BillSchema
from routes.bills_route import BillsRoute

app = Flask(__name__)
CORS(app)

# Swagger
#swagger = Swagger(app)

# Model
db_conn = BillsModel()
db_conn.connect_to_database()

# Service
bills_service = BillsService(db_conn)

# Schema
bills_schema = BillSchema()

# Routes
bills_routes = BillsRoute(bills_service, bills_schema)

# Register the blueprint to make the routes available in the app
app.register_blueprint(bills_routes)

if __name__ == "__main__":
    try:
        app.run(debug=True)
    finally:
        db_conn.close_connection()