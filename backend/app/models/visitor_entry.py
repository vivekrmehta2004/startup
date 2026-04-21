from datetime import datetime

from ..extensions import db


class VisitorEntry(db.Model):
    __tablename__ = "visitor_entries"

    id = db.Column(db.Integer, primary_key=True)
    society_id = db.Column(
        db.Integer, db.ForeignKey("societies.id"), nullable=False, index=True
    )
    unit_id = db.Column(db.Integer, db.ForeignKey("units.id"), nullable=False, index=True)
    visitor_name = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20))
    purpose = db.Column(db.String(255))
    status = db.Column(db.String(30), nullable=False, default="invited")
    created_by_user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    checkin_at = db.Column(db.DateTime, nullable=True)
    checkout_at = db.Column(db.DateTime, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
