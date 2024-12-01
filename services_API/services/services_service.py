from flask import jsonify
from logger.services_logger import Logger


class ServicesService:
    """Service class to that implements the logic of the CRUD operations for services"""

    def __init__(self, db_conn):
        self.logger = Logger()
        self.db_conn = db_conn

    def get_all_services(self):
        """Function to fetch all services from the database"""

        try:
            services = list(self.db_conn.db.services.find())
            return services
        except Exception as e:
            self.logger.error(f"Error fetching all services from database: {e}")
            return (
                jsonify({"error": f"Error fetching all services from database: {e}"}),
                500,
            )

    def get_service_by_id(self, service_id):
        """Function to fetch a service by its id"""

        try:
            service = self.db_conn.db.services.find_one({"_id": service_id})
            return service
        except Exception as e:
            self.logger.error(f"Error fetching service by id from database: {e}")
            return (
                jsonify({"error": f"Error fetching service by id from database: {e}"}),
                500,
            )

    def add_service(self, new_service):
        """Function to add a service to the database"""

        try:
            # Gets the highest id
            max_id = self.db_conn.db.services.find_one(sort=[("_id", -1)])["_id"]
            next_id = max_id + 1
            new_service["_id"] = next_id

            self.db_conn.db.services.insert_one(new_service)
            return new_service
        except Exception as e:
            self.logger.error(f"Error adding service to database: {e}")
            return jsonify({"error": f"Error adding service to database: {e}"}), 500

    def update_service(self, service_id, service):
        """Function that updates a service in the database by its id"""

        try:
            update_service = self.get_service_by_id(service_id)
            if update_service:
                updated_service = self.db_conn.db.services.update_one(
                    {"_id": service_id}, {"$set": service}
                )
                if updated_service.modified_count > 0:
                    return updated_service
                else:
                    return "The service is already up to date"
            else:
                return None

        except Exception as e:
            self.logger.error(f"Error updating service in database: {e}")
            return jsonify({"error": f"Error updating service in database: {e}"}), 500

    def delete_service(self, service_id):
        """Function to delete a service from the database by its id"""

        try:
            deleted_service = self.get_service_by_id(service_id)
            if deleted_service:
                self.db_conn.db.services.delete_one({"_id": service_id})
                return deleted_service
            else:
                return None

        except Exception as e:
            self.logger.error(f"Error deleting service from database: {e}")
            return jsonify({"error": f"Error deleting service from database: {e}"}), 500
