from marshmallow import Schema, fields, ValidationError, validates
import datetime

class TicketSchema(Schema):
    """Class to validate the incoming ticket data"""

    name = fields.String(required=True)
    description = fields.String(required=True)
    status = fields.String(required=True)
    user_id = fields.Integer(required=True)
    date = fields.DateTime(required=True)

    @validates("name")
    def validates_name(self, value):
        """Function to validate the name field"""

        if len(value) < 5:
            raise ValidationError("Ticket name must have at least 6 characters")
        elif len(value) > 50:
            raise ValidationError("Ticket name must have at most 50 characters")

    @validates("description")
    def validates_description(self, value):
        """Function to validate the description field"""

        if len(value) < 10:
            raise ValidationError("Ticket Description must have at least 10 characters")
        elif len(value) > 100:
            raise ValidationError("Ticket Description must have at most 100 characters")

    @validates("status")
    def validates_status(self, value):
        """Function to validate the status field"""

        if value != "pending" and value != "solved":
            raise ValidationError("Ticket Status must have the value 'pending' or 'solved'")
    
    @validates("user_id")
    def validates_user_id(self, value):
        """Function to validate the user_id field"""

        if value <= 0:
            raise ValidationError("Ticket User ID must be greater than 0")
        elif value > 15:
            raise ValidationError("Ticket User ID must be at most 15")
        
    @validates("date")
    def validates_date(self, value):
        """Function to validate the date field"""

        if value == None:
            raise ValidationError("Ticket Date must not be empty")
        elif value > datetime.datetime.now():
            raise ValidationError("Ticket Date must be in the past")