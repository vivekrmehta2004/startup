from ..extensions import db


class Building(db.Model):
    __tablename__ = "buildings"

    id = db.Column(db.Integer, primary_key=True)
    society_id = db.Column(
        db.Integer, db.ForeignKey("societies.id"), nullable=False, index=True
    )
    name = db.Column(db.String(100), nullable=False)

    units = db.relationship("Unit", backref="building", lazy=True)
