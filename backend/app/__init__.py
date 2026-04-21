from flask import Flask, jsonify
from flask_cors import CORS

from .config import Config
from .extensions import db, migrate


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)

    # Import models so Flask-Migrate can detect them.
    from .models import building, complaint, maintenance_invoice, notice, society, unit, user, user_role, visitor_entry
    from .routes.complaints import complaints_bp
    from .routes.health import health_bp
    from .routes.setup import setup_bp
    from .routes.visitors import visitors_bp

    app.register_blueprint(health_bp)
    app.register_blueprint(setup_bp)
    app.register_blueprint(visitors_bp)
    app.register_blueprint(complaints_bp)

    @app.route("/")
    def index():
        return jsonify(
            {
                "message": "Mygate-like backend starter is running",
                "docs_hint": "Use /health and /api/visitors endpoints first",
            }
        )

    # Beginner-friendly local setup: ensure tables exist for the starter app.
    with app.app_context():
        db.create_all()

    return app
