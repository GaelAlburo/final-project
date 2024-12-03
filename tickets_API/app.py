from flask import Flask
from flask_cors import CORS
from flasgger import Swagger

from models.ticket_model import TicketsModel
from services.ticket_service import TicketService
from schemas.ticket_schema import TicketSchema
from routes.ticket_route import TicketRoute

app = Flask(__name__)
CORS(app)

# Swagger
swagger = Swagger(app)

# Model
db_conn = TicketsModel()
db_conn.connect_to_database()

# Service
ticket_service = TicketService(db_conn)

# Schema
ticket_schema = TicketSchema()

# Routes
ticket_routes = TicketRoute(ticket_service, ticket_schema)

# Register the blueprint to make the routes available in the app
app.register_blueprint(ticket_routes)

if __name__ == "__main__":
    try:
        app.run(debug=True)
    finally:
        db_conn.close_connection()