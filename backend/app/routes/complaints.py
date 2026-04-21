from flask import Blueprint, jsonify, request

from ..extensions import db
from ..models.complaint import Complaint

complaints_bp = Blueprint("complaints", __name__, url_prefix="/api/complaints")


@complaints_bp.get("")
def list_complaints():
    society_id = request.args.get("society_id", type=int)
    query = Complaint.query

    if society_id:
        query = query.filter_by(society_id=society_id)

    complaints = query.order_by(Complaint.created_at.desc()).all()
    return jsonify(
        [
            {
                "id": complaint.id,
                "title": complaint.title,
                "description": complaint.description,
                "priority": complaint.priority,
                "status": complaint.status,
                "unit_id": complaint.unit_id,
                "created_by_user_id": complaint.created_by_user_id,
                "created_at": complaint.created_at.isoformat(),
            }
            for complaint in complaints
        ]
    )


@complaints_bp.post("")
def create_complaint():
    data = request.get_json() or {}
    required_fields = ["society_id", "unit_id", "created_by_user_id", "title", "description"]

    missing_fields = [field for field in required_fields if not data.get(field)]
    if missing_fields:
        return jsonify({"message": "Missing required fields", "missing_fields": missing_fields}), 400

    complaint = Complaint(
        society_id=data["society_id"],
        unit_id=data["unit_id"],
        created_by_user_id=data["created_by_user_id"],
        title=data["title"],
        description=data["description"],
        priority=data.get("priority", "medium"),
        status="open",
    )
    db.session.add(complaint)
    db.session.commit()

    return jsonify({"message": "Complaint created", "complaint_id": complaint.id}), 201
