from flask import Blueprint, jsonify

from ..extensions import db
from ..models.building import Building
from ..models.society import Society
from ..models.unit import Unit
from ..models.user import User
from ..models.user_role import UserRole

setup_bp = Blueprint("setup", __name__, url_prefix="/api/setup")


@setup_bp.post("/seed")
def seed_demo_data():
    if Society.query.first():
        return jsonify({"message": "Seed data already exists"}), 200

    society = Society(name="Green Residency", city="Bengaluru")
    db.session.add(society)
    db.session.flush()

    building = Building(society_id=society.id, name="Tower A")
    db.session.add(building)
    db.session.flush()

    unit = Unit(building_id=building.id, unit_number="A-101", floor="1")
    admin_unit = Unit(building_id=building.id, unit_number="A-102", floor="1")
    db.session.add_all([unit, admin_unit])
    db.session.flush()

    resident = User(
        full_name="Aarav Resident",
        email="resident@example.com",
        phone="9999999999",
        unit_id=unit.id,
    )
    admin = User(
        full_name="Isha Admin",
        email="admin@example.com",
        phone="8888888888",
        unit_id=admin_unit.id,
    )
    db.session.add_all([resident, admin])
    db.session.flush()

    db.session.add_all(
        [
            UserRole(user_id=resident.id, society_id=society.id, role="resident"),
            UserRole(user_id=admin.id, society_id=society.id, role="society_admin"),
        ]
    )
    db.session.commit()

    return jsonify(
        {
            "message": "Seed data created",
            "society_id": society.id,
            "resident_user_id": resident.id,
            "admin_user_id": admin.id,
            "resident_unit_id": unit.id,
        }
    )
