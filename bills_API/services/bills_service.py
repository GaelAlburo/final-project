from flask import jsonify
from datetime import datetime, timezone
from logger.bills_logger import Logger

class BillsService:
    """Service class to that implements the logic of the CRUD operations for bills"""

    def __init__(self, db_conn):
        self.logger = Logger()
        self.db_conn = db_conn

    def get_all_bills(self):
        """Function to fetch all services from the database"""
        try:
            bills = list(self.db_conn.db.bills.find())
            return bills
        except Exception as e:
            self.logger.error(f"Error fetching all bills from database: {e}")
            return (
                jsonify({"error": f"Error fetching all bills from database: {e}"}),
                500,
            )

    def get_bill_by_id(self, bill_id):
        """Function to fetch a bills by id"""

        try:
            bill = self.db_conn.db.bills.find_one({"_id": bill_id})
            return bill
        except Exception as e:
            self.logger.error(f"Error fetching bill by id from database: {e}")
            return (
                jsonify({"error": f"Error fetching bill by id from database: {e}"}),
                500,
            )
        
    def get_bills_by_user(self, user_id):
        """Function to fetch a bills by user_id"""

        try:
            bills = list(self.db_conn.db.bills.find({"id_user": user_id}))
            return bills
        except Exception as e:
            self.logger.error(f"Error fetching bills for user {user_id}: {e}")
            return jsonify({"error": f"Error fetching bills for user {user_id}: {e}"}), 500

    def add_bill(self, new_bill):
        """Function to add a bill to the database"""

        try:
            max_id = self.db_conn.db.bills.find_one(sort=[("_id", -1)])
            next_id = (max_id["_id"] + 1) if max_id else 1
            new_bill["_id"] = next_id

            new_bill["date"] = datetime.now(timezone.utc).isoformat()

            self.db_conn.db.bills.insert_one(new_bill)
            return new_bill
        except Exception as e:
            self.logger.error(f"Error adding bill to database: {e}")
            return jsonify({"error": f"Error adding bill to database: {e}"}), 500



    def delete_bill(self, bill_id):
        """Function to delete a service from the database by its id"""

        try:
            deleted_bill = self.get_bill_by_id(bill_id)
            if deleted_bill:
                self.db_conn.db.bills.delete_one({"_id": bill_id})
                return deleted_bill
            else:
                return None

        except Exception as e:
            self.logger.error(f"Error deleting bill from database: {e}")
            return jsonify({"error": f"Error deleting bill from database: {e}"}), 500