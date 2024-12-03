from flask import Blueprint, request, jsonify
from marshmallow import ValidationError
from flasgger import swag_from
from logger.ticket_logger import Logger
from datetime import datetime


class TicketRoute(Blueprint):
    """Class to handle the routes for the tickets API"""

    def __init__(self, ticket_service, ticket_schema):
        super().__init__("ticket", __name__)
        self.ticket_service = ticket_service
        self.ticket_schema = ticket_schema
        self.logger = Logger()
        self.register_routes()

    def register_routes(self):
        """Function to register the routes for the tickets API"""

        self.route("/api/v1/tickets", methods=["GET"])(self.get_tickets)
        self.route("/api/v1/tickets/<int:ticket_id>", methods=["GET"])(
            self.get_one_ticket
        )
        self.route("/api/v1/tickets", methods=["POST"])(self.add_ticket)
        self.route("/api/v1/tickets/<int:ticket_id>", methods=["PUT"])(
            self.update_ticket
        )
        self.route("/api/v1/tickets/<ticket_id>", methods=["DELETE"])(
            self.delete_ticket
        )
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
                                "text": {"type": "string"},
                                "id_user": {"type": "Number"},
                                "name_user": {"type": "string"},
                                "date": {"type": "string", "format": "date-time"},
                                "status": {"type": "string"},
                            },
                        },
                    },
                }
            },
        }
    )
    def get_tickets(self):
        """Get all tickets"""
        tickets = self.ticket_service.get_all_tickets()
        return jsonify(tickets), 200

    def fetch_request_data(self):
        """Function to fetch the request data"""
        try:
            request_data = request.json
            if not request_data:
                return (
                    400,
                    f"Invalid data: {request_data}",
                    None,
                    None,
                    None,
                    None,
                    None,
                )

            text = request_data.get("text")
            id_user = request_data.get("id_user")
            name_user = request_data.get("name_user")
            date = request_data.get("date")
            status = request_data.get("status")

            try:
                id_user = int(id_user)
            except (ValueError, TypeError):
                self.logger.error(f"Invalid id_user: {id_user}")
                return 400, f"Invalid id_user: {id_user}", None, None, None, None, None

            try:
                self.ticket_schema.validates_text(text)
                self.ticket_schema.validates_id_user(id_user)
                self.ticket_schema.validates_name_user(name_user)
                self.ticket_schema.validates_status(status)

            except ValidationError as e:
                self.logger.error(f"Invalid data: {e}")
                return 400, f"Invalid data: {e}", None, None, None, None, None

            return 200, None, text, id_user, name_user, date, status

        except Exception as e:
            self.logger.error(f"Error fetching the request data: {e}")
            return 500, f"Error fetching the request data", None, None, None, None, None

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
                            "text": {"type": "string"},
                            "id_user": {"type": "Number"},
                            "name_user": {"type": "string"},
                            "date": {"type": "string", "format": "date-time"},
                            "status": {"type": "string"},
                        },
                        "required": [
                            "text",
                            "id_user",
                            "name_user",
                            "date",
                            "status",
                        ],
                    },
                }
            ],
            "responses": {
                201: {"description": "Ticket created"},
                400: {"description": "Invalid data"},
                500: {"description": "Error creating ticket"},
            },
        }
    )
    def add_ticket(self):
        """Add a ticket"""
        try:
            code, message, text, id_user, name_user, date, status = (
                self.fetch_request_data()
            )

            if code != 200:
                self.logger.error(f"Error fetching ticket data: {message}")
                return jsonify({"error": message}), code

            new_ticket = {
                "text": text,
                "id_user": id_user,
                "name_user": name_user,
                "date": date,
                "status": status,
            }

            created_ticket, code = self.ticket_service.add_ticket(new_ticket)

            if code != 201:
                self.logger.error(f"Error adding ticket: {created_ticket}")
                return (
                    jsonify({"error": f"Error creating new service: {created_ticket}"}),
                    code,
                )

            self.logger.info(f"Ticket created: {created_ticket}")
            return jsonify(created_ticket), 201

        except Exception as e:
            self.logger.error(f"Error adding ticket: {e}")
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
                            "text": {"type": "string"},
                            "id_user": {"type": "Number"},
                            "name_user": {"type": "string"},
                            "date": {"type": "string", "format": "date-time"},
                            "status": {"type": "string"},
                        },
                    },
                },
                404: {"description": "Ticket not found"},
            },
        }
    )
    def get_one_ticket(self, ticket_id):
        """Get one ticket"""

        ticket = self.ticket_service.get_ticket_by_id(ticket_id)
        if ticket:
            self.logger.info(f"Ticket found: {ticket}")
            return jsonify(ticket), 200
        else:
            self.logger.error("Ticket not found")
            return jsonify({"error": "Ticket not found"}), 404

    # Swagger documentation for the PUT request to /api/v1/tickets/<int:ticket_id>
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
                            "text": {"type": "string"},
                            "id_user": {"type": "Number"},
                            "name_user": {"type": "string"},
                            "date": {"type": "string", "format": "date-time"},
                            "status": {"type": "string"},
                        },
                        "required": [
                            "text",
                            "id_user",
                            "name_user",
                            "date",
                            "status",
                        ],
                    },
                },
            ],
            "responses": {
                200: {"description": "Ticket updated"},
                400: {"description": "Invalid data"},
                404: {"description": "Ticket not found"},
                500: {"description": "Error updating ticket"},
            },
        }
    )
    def update_ticket(self, ticket_id):
        """Update a ticket"""

        try:
            code, message, text, id_user, name_user, date, status = (
                self.fetch_request_data()
            )

            if code != 200:
                self.logger.error(f"Error fetching ticket data: {message}")
                return jsonify({"error": message}), code

            update_ticket = {
                "text": text,
                "id_user": id_user,
                "name_user": name_user,
                "date": date,
                "status": status,
            }

            updated_ticket = self.ticket_service.update_ticket(ticket_id, update_ticket)

            if updated_ticket:
                self.logger.info(f"Ticket updated: {updated_ticket}")
                return jsonify(update_ticket), 200
            else:
                self.logger.error("Ticket not found")
                return jsonify({"error": "Ticket not found"}), 404

        except Exception as e:
            self.logger.error(f"Error updating ticket: {e}")
            return jsonify({"error": f"Error updating ticket: {e}"}), 500

    # Swagger documentation for the DELETE request to /api/v1/tickets/<int:ticket_id>
    # @swag_from(
    #     {
    #         "tags": ["tickets"],
    #         "parameters": [
    #             {
    #                 "name": "ticket_id",
    #                 "in": "path",
    #                 "required": True,
    #                 "type": "integer",
    #             }
    #         ],
    #         "responses": {
    #             200: {"description": "Ticket deleted successfully"},
    #             404: {"description": "Ticket not found"},
    #             500: {"description": "Internal server error"},
    #         },
    #     }
    # )
    def delete_ticket(self, ticket_id):
        """Delete a ticket by ID"""

        try:
            deleted_ticket = self.ticket_service.delete_ticket(ticket_id)
            if deleted_ticket:
                self.logger.info(f"Ticket deleted: {deleted_ticket}")
                return jsonify(deleted_ticket), 200
            else:
                self.logger.error("Ticket not found")
                return jsonify({"error": "Ticket not found"}), 404

        except Exception as e:
            self.logger.error(f"Error deleting ticket: {e}")
            return jsonify({"error": f"Error deleting ticket: {e}"}), 500

    def healthcheck(self):
        """Function to check the health of the services API inside the docker container"""
        return jsonify({"status": "Up"}), 200
