from marshmallow import fields, validates, ValidationError


class ServiceSchema:
    """Class to validate the incoming service data"""

    name = fields.String(required=True)
    cost = fields.Float(required=True)
    company_name = fields.String(required=True)
    description = fields.String(required=True)
    type = fields.String(required=True)

    @validates("name")
    def validates_name(self, value):
        """Function to validate the name field"""

        if len(value) < 5:
            raise ValidationError("Service Name must have at least 5 characters")
        elif len(value) > 50:
            raise ValidationError("Service Name must have at most 50 characters")

    @validates("cost")
    def validates_cost(self, value):
        """Function to validate the cost field"""

        if value <= 0.0:
            raise ValidationError("Service Cost must be greater than 0")

    @validates("company_name")
    def validates_company_name(self, value):
        """Function to validate the company_name field"""

        if len(value) < 5:
            raise ValidationError(
                "Service Company Name must have at least 5 characters"
            )
        elif len(value) > 50:
            raise ValidationError(
                "Service Company Name must have at most 50 characters"
            )

    @validates("description")
    def validates_description(self, value):
        """Function to validate the description field"""

        if len(value) < 10:
            raise ValidationError(
                "Service Description must have at least 10 characters"
            )
        elif len(value) > 300:
            raise ValidationError(
                "Service Description must have at most 300 characters"
            )

    @validates("type")
    def validates_type(self, value):
        """Function to validate the type field"""

        if len(value) < 5:
            raise ValidationError("Service Type must have at least 5 characters")
        elif len(value) > 50:
            raise ValidationError("Service Type must have at most 50 characters")
