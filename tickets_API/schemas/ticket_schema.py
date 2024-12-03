from marshmallow import Schema, fields, ValidationError, validates
import datetime


class TicketSchema(Schema):
    """Class to validate the incoming ticket data"""

    text = fields.String(required=True)
    id_user = fields.Integer(required=True)
    name_user = fields.String(required=True)
    date = fields.String(required=True)
    status = fields.String(required=True)

    @validates("text")
    def validates_text(self, value):
        """Function to validate the text field"""

        if len(value) < 5:
            raise ValidationError("Ticket name must have at least 5 characters")
        elif len(value) > 280:
            raise ValidationError("Ticket name must have at most 280 characters")

    @validates("id_user")
    def validates_id_user(self, value):
        """Function to validate the user_id field"""

        if value <= 0:
            raise ValidationError("user_id must be greater than 0")

    @validates("name_user")
    def validates_name_user(self, value):
        """Function to validate the name_user field"""

        if len(value) < 5:
            raise ValidationError("User name must have at least 5 characters")
        elif len(value) > 50:
            raise ValidationError("User name must have at most 50 characters")

    @validates("status")
    def validates_status(self, value):
        """Function to validate the status field"""

        if value != "pending" and value != "solved":
            raise ValidationError("Ticket Status must be either 'pending' or 'solved'")
