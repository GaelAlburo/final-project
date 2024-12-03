from flask import Blueprint, jsonify, request
from marshmallow import ValidationError
from flasgger import swag_from
from logger.bills_logger import Logger

class BillsRoute(Blueprint):
    """Class to handle the bills routes"""

    def __init__(self, bills_service, bills_schema):
        super().__init__("bill", __name__)
        self.logger = Logger()
        self.bills_service = bills_service
        self.bills_schema = bills_schema
        self.register_routes()


    def register_routes(self):
        """Function to register the routes for the bills API"""

        self.route("/api/v1/bills", methods=["GET"])(self.get_all_bills)
        self.route("/api/v1/bills", methods=["POST"])(self.add_bill)
        self.route("/api/v1/bills/<int:bill_id>", methods=["GET"])(self.get_bill_by_id)
        self.route("/api/v1/bills/user/<int:user_id>", methods=["GET"])(self.get_bills_by_user)
        self.route("/api/v1/bills/<int:bill_id>", methods=["DELETE"])(self.delete_bill)
        self.route("/healthcheck", methods=["GET"])(self.healthcheck)

    @swag_from(
        {
            "tags": ["bills"],
            "summary": "Retrieve all bills",
            "description": "Fetch all bills from the database.",
            "responses": {
                200: {
                    "description": "List of all bills",
                    "schema": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "_id": {"type": "integer", "example": 1},
                                "id_user": {"type": "integer", "example": 1},
                                "id_services": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "id_service": {"type": "integer", "example": 1},
                                            "name": {"type": "string", "example": "Cloud Storage"},
                                            "amount": {"type": "number", "example": 50.0}
                                        }
                                    }
                                },
                                "totalAmount": {"type": "number", "example": 150.0},
                                "date": {"type": "string", "format": "date-time", "example": "2024-12-02T06:00:00+00:00"}
                            }
                        }
                    }
                },
                500: {
                    "description": "Internal server error",
                    "schema": {"type": "object", "properties": {"error": {"type": "string", "example": "Unable to fetch bills"}}}
                }
            }
        }
    )
    def get_all_bills(self):
        """Fetch all bills from the database"""
        try:
            bills = self.bills_service.get_all_bills()
            return jsonify(bills), 200
        except Exception as e:
            self.logger.error(f"Error fetching all bills: {e}")
            return jsonify({"error": "Unable to fetch bills"}), 500
        
    @swag_from(
        {
            "tags": ["bills"],
            "summary": "Retrieve a single bill by its ID",
            "description": "Fetch a single bill by providing its unique ID. Only accessible by authorized users.",
            "parameters": [
                {
                    "name": "bill_id",
                    "in": "path",
                    "required": True,
                    "type": "integer",
                    "description": "The unique ID of the bill to retrieve.",
                    "example": 1
                }
            ],
            "responses": {
                200: {
                    "description": "Bill retrieved successfully",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "_id": {"type": "integer", "example": 1},
                            "id_user": {"type": "integer", "example": 1},
                            "id_services": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "id_service": {"type": "integer", "example": 1},
                                        "name": {"type": "string", "example": "Cloud Storage"},
                                        "amount": {"type": "number", "example": 50.0}
                                    }
                                }
                            },
                            "totalAmount": {"type": "number", "example": 150.0},
                            "date": {"type": "string", "format": "date-time", "example": "2024-12-02T06:00:00+00:00"}
                        }
                    }
                },
                404: {
                    "description": "Bill not found",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "error": {"type": "string", "example": "Bill not found"}
                        }
                    }
                },
                500: {
                    "description": "Internal server error",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "error": {"type": "string", "example": "Unable to fetch bill"}
                        }
                    }
                }
            }
        }
    )
    def get_bill_by_id(self, bill_id):
        """Fetch a single bill by its ID"""
        try:
            bill = self.bills_service.get_bill_by_id(bill_id)
            if bill:
                return jsonify(bill), 200
            else:
                self.logger.error(f"Error bill not found ID: {e}")
                return jsonify({"error": "Bill not found"}), 404
        except Exception as e:
            self.logger.error(f"Error fetching bill by ID: {e}")
            return jsonify({"error": "Unable to fetch bill"}), 500

    @swag_from(
        {
            "tags": ["bills"],
            "summary": "Retrieve all bills for a specific user",
            "description": "Fetch all bills associated with a specific user ID. Returns an array of bills or an error message if no bills are found.",
            "parameters": [
                {
                    "name": "user_id",
                    "in": "path",
                    "required": True,
                    "type": "integer",
                    "description": "The unique ID of the user whose bills are being fetched.",
                    "example": 1
                }
            ],
            "responses": {
                200: {
                    "description": "List of bills for the specified user.",
                    "schema": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "_id": {"type": "integer", "example": 1},
                                "id_user": {"type": "integer", "example": 1},
                                "id_services": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "id_service": {"type": "integer", "example": 1},
                                            "name": {"type": "string", "example": "Cloud Storage"},
                                            "amount": {"type": "number", "example": 50.0}
                                        }
                                    }
                                },
                                "totalAmount": {"type": "number", "example": 150.0},
                                "date": {"type": "string", "format": "date-time", "example": "2024-12-02T06:00:00.000Z"}
                            }
                        }
                    }
                },
                404: {
                    "description": "No bills found for the specified user.",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "error": {"type": "string", "example": "No bills found for user 1"}
                        }
                    }
                },
                500: {
                    "description": "Internal server error.",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "error": {"type": "string", "example": "Unable to fetch bills for user 1"}
                        }
                    }
                }
            }
        }
    )
    def get_bills_by_user(self, user_id):
        """Fetch all bills for a specific user"""
        try:

            bills = self.bills_service.get_bills_by_user(user_id)
            if not bills:
                self.logger.error(f"Error fetching bills for user {user_id}: {e}")
                return jsonify({"error": f"No bills found for user {user_id}"}), 200

            return jsonify(self.bills_schema.dump(bills, many=True)), 200

        except Exception as e:
            self.logger.error(f"Error fetching bills for user {user_id}: {e}")
            return jsonify({"error": f"Unable to fetch bills for user {user_id}"}), 500

    def add_bill(self):
        """Add a new bill to the database"""
        try:
            data = request.json
            if not data:
                self.logger.error(f"Invalid data error: {e}")
                return jsonify({"error": "Invalid data"}), 400

            validated_data = self.bills_schema.load(data)
            new_bill = self.bills_service.add_bill(validated_data)
            return jsonify(new_bill), 201
        except ValidationError as e:
            self.logger.error(f"Validation error: {e}")
            return jsonify({"error": "Invalid data", "details": e.messages}), 400
        except Exception as e:
            self.logger.error(f"Error adding bill: {e}")
            return jsonify({"error": "Unable to add bill"}), 500

    @swag_from(
        {
            "tags": ["bills"],
            "summary": "Delete a bill by its ID",
            "description": "Deletes a bill with the specified ID. If the bill does not exist, returns a 404 error.",
            "parameters": [
                {
                    "name": "bill_id",
                    "in": "path",
                    "required": True,
                    "type": "integer",
                    "description": "The unique ID of the bill to be deleted.",
                    "example": 1
                }
            ],
            "responses": {
                200: {
                    "description": "Bill deleted successfully.",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "message": {"type": "string", "example": "Bill deleted successfully"},
                            "bill": {
                                "type": "object",
                                "properties": {
                                    "_id": {"type": "integer", "example": 1},
                                    "id_user": {"type": "integer", "example": 1},
                                    "id_services": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "id_service": {"type": "integer", "example": 1},
                                                "name": {"type": "string", "example": "Cloud Storage"},
                                                "amount": {"type": "number", "example": 50.0}
                                            }
                                        }
                                    },
                                    "totalAmount": {"type": "number", "example": 150.0},
                                    "date": {"type": "string", "format": "date-time", "example": "2024-12-02T06:00:00.000Z"}
                                }
                            }
                        }
                    }
                },
                404: {
                    "description": "Bill not found.",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "error": {"type": "string", "example": "Bill not found"}
                        }
                    }
                },
                500: {
                    "description": "Internal server error.",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "error": {"type": "string", "example": "Unable to delete bill"}
                        }
                    }
                }
            }
        }
    )
    def delete_bill(self, bill_id):
        """Delete a bill by its ID"""
        try:
            deleted_bill = self.bills_service.delete_bill(bill_id)
            if deleted_bill:
                return jsonify({"message": "Bill deleted successfully", "bill": deleted_bill}), 200
            else:
                self.logger.error(f"Error bill not found")
                return jsonify({"error": "Bill not found"}), 404
        except Exception as e:
            self.logger.error(f"Error deleting bill: {e}")
            return jsonify({"error": "Unable to delete bill"}), 500

    @swag_from(
        {
            "tags": ["health"],
            "summary": "API Healthcheck",
            "description": "Returns the health status of the API. Indicates whether the service is running and operational.",
            "responses": {
                200: {
                    "description": "API is up and running",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "status": {"type": "string", "example": "Up"}
                        }
                    }
                }
            }
        }
    )     
    def healthcheck(self):
        """Healthcheck endpoint"""
        return jsonify({"status": "Up"}), 200