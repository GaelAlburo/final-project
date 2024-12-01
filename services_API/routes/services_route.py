from flask import Blueprint, jsonify, request
from marshmallow import ValidationError
from flasgger import swag_from
from logger.services_logger import Logger


class ServiceRoute(Blueprint):
    """Class to handle the services routes"""

    def __init__(self, service_service, service_schema):
        super().__init__("review", __name__)
        self.logger = Logger()
        self.service_service = service_service
        self.service_schema = service_schema
        self.register_routes()

    def register_routes(self):
        """Function to register the routes for the service API"""

        self.route("/api/v1/services", methods=["GET"])(self.get_services)
        self.route("/api/v1/services", methods=["POST"])(self.add_service)
        self.route("/api/v1/services/<int:service_id>", methods=["PUT"])(
            self.update_service
        )
        self.route("/api/v1/services/<int:service_id>", methods=["DELETE"])(
            self.delete_service
        )
        self.route("/healthcheck", methods=["GET"])(self.healthcheck)

    # Swagger documentation for the GET request to /api/v1/services
    @swag_from(
        {
            "tags": ["services"],
            "responses": {
                200: {
                    "description": "GET all services",
                    "schema": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "name": {"type": "String"},
                                "cost": {"type": "Float"},
                                "company_name": {"type": "String"},
                                "description": {"type": "String"},
                                "type": {"type": "String"},
                            },
                        },
                    },
                }
            },
        }
    )
    def get_services(self):
        """Returns all the services"""

        services = self.service_service.get_all_services()
        return jsonify(services), 200

    def fetch_request_data(self):
        """Function to fetch the request data from the request body and validate it with the schema"""

        try:
            request_data = request.json
            if not request_data:
                return jsonify({"error": "Invalid data"}), 400

            name = request_data.get("name")
            cost = request_data.get("cost")
            company_name = request_data.get("company_name")
            description = request_data.get("description")
            type = request_data.get("type")

            try:
                self.service_schema.validates_name(name)
                self.service_schema.validates_cost(cost)
                self.service_schema.validates_company_name(company_name)
                self.service_schema.validates_rating(description)
                self.service_schema.validates_type(type)

            except ValidationError as e:
                self.logger.error(f"Invalid data: {e}")
                return jsonify({"error": f"Invalid data: {e}"}), 400

            return name, cost, company_name, description, type

        except Exception as e:
            self.logger.error(f"Error fetching the request data: {e}")
            return jsonify({"error": f"Error fetching the request data: {e}"}), 500

    # Swagger documentation for the POST request to /api/v1/reviews
    @swag_from(
        {
            "tags": ["services"],
            "parameters": [
                {
                    "name": "body",
                    "in": "body",
                    "required": True,
                    "schema": {
                        "type": "object",
                        "properties": {
                            "name": {"type": "String"},
                            "cost": {"type": "Float"},
                            "company_name": {"type": "String"},
                            "description": {"type": "String"},
                            "type": {"type": "String"},
                        },
                        "required": [
                            "name",
                            "cost",
                            "company_name",
                            "description",
                            "type",
                        ],
                    },
                }
            ],
            "responses": {
                201: {
                    "description": "Service added successfully",
                },
                400: {"description": "Invalid data"},
                500: {"description": "Internal server error"},
            },
        }
    )
    def add_service(self):
        """Adds a new service"""

        try:
            name, cost, company_name, description, name = self.fetch_request_data()

            new_service = {
                "name": name,
                "cost": cost,
                "company_name": company_name,
                "description": description,
                "type": type,
            }

            created_service = self.service_service.add_service(new_service)
            self.logger.info(f"Service added: {created_service}")
            return jsonify(created_service), 201

        except Exception as e:
            self.logger.error(f"Error adding service: {e}")
            return jsonify({"error": f"Error adding service: {e}"}), 500

    # Swagger documentation for the PUT request to /api/v1/services/<service_id>
    @swag_from(
        {
            "tags": ["services"],
            "parameters": [
                {
                    "name": "service_id",
                    "in": "path",
                    "required": True,
                    "type": "integer",
                },
                {
                    "name": "body",
                    "in": "body",
                    "required": True,
                    "schema": {
                        "type": "object",
                        "properties": {
                            "name": {"type": "String"},
                            "cost": {"type": "Float"},
                            "company_name": {"type": "String"},
                            "description": {"type": "String"},
                            "type": {"type": "String"},
                        },
                        "required": [
                            "name",
                            "cost",
                            "company_name",
                            "description",
                            "type",
                        ],
                    },
                },
            ],
            "responses": {
                200: {"description": "Service updated successfully"},
                400: {"description": "Invalid data"},
                404: {"description": "Service not found"},
                500: {"description": "Internal server error"},
            },
        }
    )
    def update_service(self, service_id):
        """Updates a service by its ID"""

        try:
            name, cost, company_name, description, name = self.fetch_request_data()

            update_service = {
                "_id": service_id,
                "name": name,
                "cost": cost,
                "company_name": company_name,
                "description": description,
                "type": type,
            }

            updated_service = self.service_service.update_service(
                service_id, update_service
            )
            if updated_service:
                self.logger.info(f"Review updated: {updated_service}")
                return jsonify(updated_service), 200
            else:
                self.logger.error("Service not found")
                return jsonify({"error": "Service not found"}), 404

        except Exception as e:
            self.logger.error(f"Error updating service: {e}")
            return jsonify({"error": f"Error updating service: {e}"}), 500

    # Swagger documentation for the DELETE request to /api/v1/services/<service_id>
    @swag_from(
        {
            "tags": ["services"],
            "parameters": [
                {
                    "name": "service_id",
                    "in": "path",
                    "required": True,
                    "type": "integer",
                }
            ],
            "responses": {
                200: {"description": "Service deleted successfully"},
                404: {"description": "Service not found"},
                500: {"description": "Internal server error"},
            },
        }
    )
    def delete_service(self, service_id):
        """Deletes a service by its ID"""

        try:
            deleted_service = self.service_service.delete_service(service_id)
            if deleted_service:
                self.logger.info(f"Service deleted: {deleted_service}")
                return jsonify(deleted_service), 200
            else:
                self.logger.error("Service not found")
                return jsonify({"error": "Service not found"}), 404

        except Exception as e:
            self.logger.error(f"Error deleting service: {e}")
            return jsonify({"error": f"Error deleting service: {e}"}), 500

    def healthcheck(self):
        """Function to check the health of the services API inside the docker container"""

        return jsonify({"status": "Up"}), 200
