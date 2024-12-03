from marshmallow import Schema, fields, validates_schema, ValidationError
from datetime import datetime, timezone

class ServiceSchema(Schema):
    """Schema for individual services within a bill"""
    id_service = fields.Int(required=True)
    name = fields.Str(required=True)
    amount = fields.Float(required=True)

class BillSchema(Schema):
    """Schema for a bill"""
    id = fields.Int(dump_only=True)
    id_user = fields.Int(required=True)
    id_services = fields.List(fields.Nested(ServiceSchema), required=True)
    totalAmount = fields.Float(dump_only=True)
    date = fields.DateTime(dump_only=True, default=datetime.now(timezone.utc).isoformat())

    @validates_schema
    def calculate_amount(self, data, **kwargs):
        """Custom validation to calculate the total amount"""
        if "id_services" in data:
            total = sum(service["amount"] for service in data["id_services"])
            data["totalAmount"] = total
        else:
            raise ValidationError("id_services is required to calculate amount")