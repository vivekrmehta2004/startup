from datetime import datetime

from flask import Blueprint, jsonify, request

from ..extensions import db
from ..models.unit import Unit
from ..models.visitor_entry import VisitorEntry

visitors_bp = Blueprint("visitors", __name__, url_prefix="/api/visitors")

from flask import Blueprint
from app.extensions import db
from app.models import Society, Unit, User

bp = Blueprint('visitors', __name__)

@bp.route('/seed', methods=['GET'])
def seed():
    try:
        s = Society(id=1, name="Demo Society")
        u = Unit(id=1, society_id=1, flat_no="101")
        user = User(id=1, name="Test User", unit_id=1)

        db.session.add_all([s, u, user])
        db.session.commit()

        return {"message": "Seeded successfully"}
    except Exception as e:
        return {"error": str(e)}
    
@visitors_bp.get("")
def list_visitors():
    society_id = request.args.get("society_id", type=int)
    query = VisitorEntry.query

    if society_id:
        query = query.filter_by(society_id=society_id)

    visitors = query.order_by(VisitorEntry.created_at.desc()).all()
    return jsonify(
        [
            {
                "id": visitor.id,
                "visitor_name": visitor.visitor_name,
                "phone": visitor.phone,
                "purpose": visitor.purpose,
                "status": visitor.status,
                "unit_id": visitor.unit_id,
                "checkin_at": visitor.checkin_at.isoformat() if visitor.checkin_at else None,
                "checkout_at": visitor.checkout_at.isoformat() if visitor.checkout_at else None,
                "created_at": visitor.created_at.isoformat(),
            }
            for visitor in visitors
        ]
    )


@visitors_bp.post("/invite")
def invite_visitor():
    data = request.get_json() or {}
    required_fields = ["society_id", "unit_id", "visitor_name"]

    missing_fields = [field for field in required_fields if not data.get(field)]
    if missing_fields:
        return (
            jsonify(
                {
                    "message": "Missing required fields",
                    "missing_fields": missing_fields,
                }
            ),
            400,
        )

    unit = Unit.query.get(data["unit_id"])
    if not unit:
        return jsonify({"message": "Unit not found"}), 404

    visitor = VisitorEntry(
        society_id=data["society_id"],
        unit_id=data["unit_id"],
        visitor_name=data["visitor_name"],
        phone=data.get("phone"),
        purpose=data.get("purpose"),
        created_by_user_id=data.get("created_by_user_id"),
        status="approved",
    )
    db.session.add(visitor)
    db.session.commit()

    return (
        jsonify(
            {
                "message": "Visitor invited successfully",
                "visitor_id": visitor.id,
            }
        ),
        201,
    )


@visitors_bp.post("/checkin")
def checkin_visitor():
    data = request.get_json() or {}
    visitor_id = data.get("visitor_id")

    if not visitor_id:
        return jsonify({"message": "visitor_id is required"}), 400

    visitor = VisitorEntry.query.get(visitor_id)
    if not visitor:
        return jsonify({"message": "Visitor not found"}), 404

    visitor.status = "checked_in"
    visitor.checkin_at = datetime.utcnow()
    db.session.commit()

    return jsonify({"message": "Visitor checked in", "visitor_id": visitor.id})


@visitors_bp.post("/checkout")
def checkout_visitor():
    data = request.get_json() or {}
    visitor_id = data.get("visitor_id")

    if not visitor_id:
        return jsonify({"message": "visitor_id is required"}), 400

    visitor = VisitorEntry.query.get(visitor_id)
    if not visitor:
        return jsonify({"message": "Visitor not found"}), 404

    visitor.status = "checked_out"
    visitor.checkout_at = datetime.utcnow()
    db.session.commit()

    return jsonify({"message": "Visitor checked out", "visitor_id": visitor.id})
