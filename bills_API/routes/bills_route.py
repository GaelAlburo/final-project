from flask import Blueprint, jsonify, request
from marshmallow import ValidationError
from flasgger import swag_from
from logger.bills_logger import Logger

class BillsRoute(Blueprint):
    """Class to handle the bills routes"""

    def __init__(self, bills_service, bills_schema):
        super().__init__("bills", __name__)
        self.logger = Logger()
        self.bills_service = bills_service
        self.bills_schema = bills_schema
        self.register_routes()


    def register_routes(self):
        """Function to register the routes for the bills API"""

        self.route("/api/v1/bills", methods=["GET"])(self.get_all_bills)
        self.route("/api/v1/bills", methods=["POST"])(self.add_bill)
        self.route("/api/v1/bills/<string:bill_id>", methods=["GET"])(self.get_bill_by_id)
        self.route("/api/v1/bills/user/<string:user_id>", methods=["GET"])(self.get_bills_by_user)
        self.route("/api/v1/bills/<string:bill_id>", methods=["DELETE"])(self.delete_bill)
        self.route("/healthcheck", methods=["GET"])(self.healthcheck)

    def get_all_bills(self):
        """Fetch all bills from the database"""
        try:
            bills = self.bills_service.get_all_bills()
            return jsonify(bills), 200
        except Exception as e:
            self.logger.error(f"Error fetching all bills: {e}")
            return jsonify({"error": "Unable to fetch bills"}), 500
        
    def get_bill_by_id(self, bill_id):
        """Fetch a single bill by its ID"""
        try:
            bill = self.bills_service.get_bill_by_id(bill_id)
            if bill:
                return jsonify(bill), 200
            else:
                return jsonify({"error": "Bill not found"}), 404
        except Exception as e:
            self.logger.error(f"Error fetching bill by ID: {e}")
            return jsonify({"error": "Unable to fetch bill"}), 500
        
    def get_bills_by_user(self, user_id):
        """Fetch all bills for a specific user"""
        try:
            bills = self.bills_service.get_bills_by_user(user_id)
            return jsonify(bills), 200
        except Exception as e:
            self.logger.error(f"Error fetching bills for user {user_id}: {e}")
            return jsonify({"error": f"Unable to fetch bills for user {user_id}"}), 500

    def add_bill(self):
        """Add a new bill to the database"""
        try:
            data = request.json
            if not data:
                return jsonify({"error": "Invalid data"}), 400

            # Validate data using the schema
            validated_data = self.bills_schema.load(data)
            new_bill = self.bills_service.add_bill(validated_data)
            return jsonify(new_bill), 201
        
        except ValidationError as e:
            self.logger.error(f"Validation error: {e}")
            return jsonify({"error": "Invalid data", "details": e.messages}), 400
        except Exception as e:
            self.logger.error(f"Error adding bill: {e}")
            return jsonify({"error": "Unable to add bill"}), 500
        
    def delete_bill(self, bill_id):
        """Delete a bill by its ID"""
        try:
            deleted_bill = self.bills_service.delete_bill(bill_id)
            if deleted_bill:
                return jsonify({"message": "Bill deleted successfully", "bill": deleted_bill}), 200
            else:
                return jsonify({"error": "Bill not found"}), 404
        except Exception as e:
            self.logger.error(f"Error deleting bill: {e}")
            return jsonify({"error": "Unable to delete bill"}), 500
        
    def healthcheck(self):
        """Healthcheck endpoint"""
        return jsonify({"status": "Up"}), 200