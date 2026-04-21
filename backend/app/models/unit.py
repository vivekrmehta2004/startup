from ..extensions import db


class Unit(db.Model):
    __tablename__ = "units"

    id = db.Column(db.Integer, primary_key=True)
    building_id = db.Column(
        db.Integer, db.ForeignKey("buildings.id"), nullable=False, index=True
    )
    unit_number = db.Column(db.String(30), nullable=False)
    floor = db.Column(db.String(30))

    residents = db.relationship("User", backref="unit", lazy=True)
