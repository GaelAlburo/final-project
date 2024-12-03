from flask import Blueprint, request, jsonify
from marshmallow import ValidationError
from flasgger import swag_from
from logger.ticket_logger import Logger

class TicketRoute(Blueprint):

    def __init__(self, ticket_service, ticket_schema):
        super().__init__('ticket', __name__)
        self.ticket_service = ticket_service
        self.ticket_schema = ticket_schema
        self.logger = Logger()
        self.register_routes()

    def register_routes(self):
        self.route("/api/v1/tickets", methods=["GET"])(self.get_tickets)
        self.route("/api/v1/tickets/<int:ticket_id>", methods=["GET"])(self.get_one_ticket)
        self.route("/api/v1/tickets", methods=["POST"])(self.add_ticket)
        #self.route("/api/v1/tickets/status", methods=["GET"])(self.get_ticket_status)
        self.route("/api/v1/tickets/<ticket_id>", methods=["PUT"])(self.update_ticket)
        self.route("/api/v1/tickets/<ticket_id>", methods=["DELETE"])(self.delete_ticket)
        self.route("/healthcheck", methods=["GET"])(self.healthcheck)
    
    # Swagger documentation for the get request to /api/v1/tickets
    @swag_from(
        {
            "tags": ["tickets"],
            "responses": {
                200: {
                    "description": "Get all tickets",
                    "schema": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "user_id": {"type": "string"},
                                "status": {"type": "string"},
                                "description": {"type": "string"},
                                "date": {"type": "string"},
                                "name": {"type": "string"},
                            }
                        }
                    }
                }
            }
        }
    )

    def get_tickets(self):
        """ Get all tickets """
        tickets = self.ticket_service.get_tickets()
        return jsonify(tickets), 200
    
    def fetch_ticket(self):
        """ Fetch a ticket """
        try:
            request_data = request.json
            if not request_data:
                return jsonify({"error":"Invalid data"}), 400
            
            name = request_data.get("name")
            description = request_data.get("description")
            user = request_data.get("user_id")
            status = request_data.get("status")
            date = request_data.get("date")

            try:
                self.service_schema.validates_name(name)
                self.service_schema.validates_description(description)
                self.service_schema.validates_user(user)
                self.service_schema.validates_status(status)
                self.service_schema.validates_date(date)
            
            except ValidationError as e:
                self.logger.error(f'Invalid data: {e}')
                return jsonify({"error": f"Invalid data: {e}"}), 400
            
            return name, description, user, status, date
        
        except Exception as e:
            self.logger.error(f'Error fetching the request data: {e}')
            return jsonify({"error": f"Error fetching the request data: {e}"}), 500

    # Swagger documentation for the post request to /api/v1/tickets
    @swag_from(
        {
            "tags": ["tickets"],
            "parameters": [
                {
                    "in": "body",
                    "name": "body",
                    "required": True,
                    "schema": {
                        "type": "object",
                        "properties": {
                            "user_id": {"type": "string"},
                            "status": {"type": "string"},
                            "description": {"type": "string"},
                            "date": {"type": "string"},
                            "name": {"type": "string"},
                        },
                        "required": [
                            "user_id", 
                            "status", 
                            "description", 
                            "date", 
                            "name"],
                    },
                }
            ],
            "responses": {
                201: {"description": "Ticket created"},
                400: {"description": "Invalid data"},
                500: {"description": "Error creating ticket"},
        },
    })

    def add_ticket(self):
        """ Add a ticket """
        try:
            name, description, user, status, date = self.fetch_ticket()

            new_ticket = {
                "name": name,
                "description": description,
                "user_id": user,
                "status": status,
                "date": date
            }
            created_ticket = self.ticket_service.add_ticket(new_ticket)
            self.logger.info(f'Ticket created: {created_ticket}')
            return jsonify(created_ticket), 201
        
        except Exception as e:
            self.logger.error(f'Error adding ticket: {e}')
            return jsonify({"error": f"Error adding ticket: {e}"}), 500
    
    # Swagger documentation for the get request to /api/v1/tickets/<int:ticket_id>
    @swag_from(
        {
            "tags": ["tickets"],
            "parameters": [
                {
                    "name": "ticket_id",
                    "in": "path",
                    "required": True,
                    "type": "integer",
                }
            ],
            "responses": {
                200: {
                    "description": "Ticket found",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "user_id": {"type": "string"},
                            "status": {"type": "string"},
                            "description": {"type": "string"},
                            "date": {"type": "string"},
                            "name": {"type": "string"},
                        }
                    }
                },
                404: {"description": "Ticket not found"},
            }
        }
    )

    def get_one_ticket(self, ticket_id):
        """ Get one ticket """
        ticket = self.ticket_service.get_ticket_by_id(ticket_id)
        if ticket:
            self.logger.info(f'Ticket found: {ticket}')
            return jsonify(ticket), 200
        else:
            self.logger.error('Ticket not found')
            return jsonify({"error": "Ticket not found"}), 404
    
    # Swagger documentation for the put request to /api/v1/tickets/<int:ticket_id>
    @swag_from(
        {
            "tags": ["tickets"],
            "parameters": [
                {
                    "name": "ticket_id",
                    "in": "path",
                    "required": True,
                    "type": "integer",
                },
                {
                    "in": "body",
                    "name": "body",
                    "required": True,
                    "schema": {
                        "type": "object",
                        "properties": {
                            "user_id": {"type": "string"},
                            "status": {"type": "string"},
                            "description": {"type": "string"},
                            "date": {"type": "string"},
                            "name": {"type": "string"},
                        },
                        "required": [
                            "user_id", 
                            "status", 
                            "description", 
                            "date", 
                            "name"],
                    },
                }
            ],
            "responses": {
                200: {"description": "Ticket updated"},
                400: {"description": "Invalid data"},
                404: {"description": "Ticket not found"},
                500: {"description": "Error updating ticket"},
            }
        }
    )

    def update_ticket(self, ticket_id):
        """ Update a ticket """

        try:
            name, description, user, status, date = self.fetch_ticket()

            update_ticket = {
                "_id": ticket_id,
                "name": name,
                "description": description,
                "user_id": user,
                "status": status,
                "date": date
            }

            updated_ticket = self.ticket_service.update_ticket(
                ticket_id, update_ticket)
            
            if updated_ticket:
                self.logger.info(f'Ticket updated: {updated_ticket}')
                return jsonify(update_ticket), 200
            else:
                self.logger.error('Ticket not found')
                return jsonify({"error": "Ticket not found"}), 
        except Exception as e:
            self.logger.error(f'Error updating ticket: {e}')
            return jsonify({"error": f"Error updating ticket: {e}"}), 500
    
    # Swagger documentation for the delete request to /api/v1/tickets/<int:ticket_id>
    @swag_from(
        {
            "tags": ["tickets"],
            "parameters": [
                {
                    "name": "ticket_id",
                    "in": "path",
                    "required": True,
                    "type": "integer",
                }
            ],
            "responses": {
                200: {"description": "Ticket deleted"},
                404: {"description": "Ticket not found"},
                500: {"description": "Error deleting ticket"},
            }
        }
    )
    
    def delete_ticket(self, ticket_id):
        """ Delete a ticket """
        try:
            deleted_ticket = self.ticket_service.delete_ticket(ticket_id)
            if deleted_ticket:
                self.logger.info(f'Ticket deleted: {deleted_ticket}')
                return jsonify(deleted_ticket), 200
            else:
                self.logger.error('Ticket not found')
                return jsonify({"error": "Ticket not found"}), 404
        
        except Exception as e:
            self.logger.error(f'Error deleting ticket: {e}')
            return jsonify({"error": f"Error deleting ticket: {e}"}), 500
    
    def healthcheck(self):
        return jsonify({"status": "ok"}), 200
