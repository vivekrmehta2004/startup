from datetime import date, datetime

from ..extensions import db


class MaintenanceInvoice(db.Model):
    __tablename__ = "maintenance_invoices"

    id = db.Column(db.Integer, primary_key=True)
    society_id = db.Column(
        db.Integer, db.ForeignKey("societies.id"), nullable=False, index=True
    )
    unit_id = db.Column(db.Integer, db.ForeignKey("units.id"), nullable=False, index=True)
    billing_month = db.Column(db.String(20), nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    due_date = db.Column(db.Date, default=date.today, nullable=False)
    status = db.Column(db.String(20), nullable=False, default="unpaid")
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
