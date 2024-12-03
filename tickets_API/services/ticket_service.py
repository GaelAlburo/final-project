from flask import jsonify
from logger.ticket_logger import Logger


class TicketService:
    """Service class to that implements the logic of the CRUD operations for tickets"""

    def __init__(self, db_conn):
        self.logger = Logger()
        self.db_conn = db_conn

    def get_all_tickets(self):
        """Function to fetch all tickets from the database"""
        try:
            tickets = list(self.db_conn.db.tickets.find())
            return tickets
        except Exception as e:
            self.logger.error(f"Error fetching all tickets from database: {e}")
            return (
                jsonify({"error": f"Error fetching all tickets from database: {e}"}),
                500,
            )

    def get_ticket_by_id(self, ticket_id):
        """Function to fetch a ticket by its id"""
        try:
            ticket = self.db_conn.db.tickets.find_one({"_id": ticket_id})
            return ticket
        except Exception as e:
            self.logger.error(f"Error fetching ticket by id from database: {e}")
            return (
                jsonify({"error": f"Error fetching ticket by id from database: {e}"}),
                500,
            )

    def add_ticket(self, new_ticket):
        """Function to add a ticket to the database"""

        try:
            # Gets the highest id
            max_id = self.db_conn.db.tickets.find_one(sort=[("_id", -1)])["_id"]
            next_id = max_id + 1
            new_ticket["_id"] = next_id

            self.db_conn.db.tickets.insert_one(new_ticket)
            return new_ticket, 201
        except Exception as e:
            self.logger.error(f"Error adding ticket to database: {e}")
            return jsonify({"error": f"Error adding ticket to database: {e}"}), 500

    def update_ticket(self, ticket_id, ticket):
        """Function that updates a ticket in the database by its id"""

        try:
            update_ticket = self.get_ticket_by_id(ticket_id)
            if update_ticket:
                updated_ticket = self.db_conn.db.tickets.update_one(
                    {"_id": ticket_id}, {"$set": ticket}
                )
                if updated_ticket.modified_count > 0:
                    return updated_ticket
                else:
                    return "The ticket is already up to date"
            else:
                return None

        except Exception as e:
            self.logger.error(f"Error updating ticket in database: {e}")
            return jsonify({"error": f"Error updating ticket in database: {e}"}), 500

    def delete_ticket(self, ticket_id):
        """Function that deletes a ticket from the database by its id"""
        try:
            deleted_ticket = self.get_ticket_by_id(ticket_id)
            if deleted_ticket:
                self.db_conn.db.tickets.delete_one({"_id": ticket_id})
                return deleted_ticket
            else:
                return None
        except Exception as e:
            self.logger.error(f"Error deleting ticket in database: {e}")
            return jsonify({"error": f"Error deleting ticket in database: {e}"}), 500
