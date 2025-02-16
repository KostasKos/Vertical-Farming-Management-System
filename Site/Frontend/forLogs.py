from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Database connection configuration
db_config = {
    'host': 'localhost',       # Replace with your database host
    'user': 'root',            # Replace with your database user
    'password': '12345678',    # Replace with your database password
    'database': 'iot_db' # Replace with your database name
}

# Route to get sensorMaintenance logs
@app.route('/sensor-maintenance', methods=['GET'])
def get_sensor_maintenance_logs():
    sensor_id = request.args.get('sensor_id')  # Optional filter by sensor_id
    try:
        # Connect to the database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        # SQL query
        if sensor_id:
            query = """
                SELECT * FROM sensorMaintenance
                WHERE sensor_id = %s
                ORDER BY timestamp DESC
            """
            cursor.execute(query, (sensor_id,))
        else:
            query = """
                SELECT * FROM sensorMaintenance
                ORDER BY timestamp DESC
            """
            cursor.execute(query)

        # Fetch all rows
        logs = cursor.fetchall()

        # Close the database connection
        cursor.close()
        conn.close()

        # Return the logs as JSON
        return jsonify({'status': 'success', 'data': logs}), 200

    except mysql.connector.Error as err:
        return jsonify({'status': 'error', 'message': str(err)}), 500


# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, port=5000)
