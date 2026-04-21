from datetime import datetime

from ..extensions import db


class Notice(db.Model):
    __tablename__ = "notices"

    id = db.Column(db.Integer, primary_key=True)
    society_id = db.Column(
        db.Integer, db.ForeignKey("societies.id"), nullable=False, index=True
    )
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    audience = db.Column(db.String(50), nullable=False, default="all")
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
