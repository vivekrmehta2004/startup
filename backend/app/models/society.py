from datetime import datetime

from ..extensions import db


class Society(db.Model):
    __tablename__ = "societies"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    buildings = db.relationship("Building", backref="society", lazy=True)
    notices = db.relationship("Notice", backref="society", lazy=True)
