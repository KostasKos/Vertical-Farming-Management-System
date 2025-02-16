from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Database configuration
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '12345678',
    'database': 'iot_db'
}

@app.route('/api/sensors', methods=['GET'])
def get_sensors():
    connection = None
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        cursor = connection.cursor(dictionary=True)

        query = """
        SELECT 
            s.id AS sensor_id,
            s.name AS sensor_name,
            s.sensorType AS sensor_type, 
            r.name AS location,
            COALESCE(MAX(sm.timestamp), 'Never') AS last_maintenance,
            CASE
                WHEN MAX(sm.timestamp) IS NULL THEN 'Critical'
                WHEN DATEDIFF(NOW(), MAX(sm.timestamp)) > 30 THEN 'Needs Attention'
                ELSE 'Good'
            END AS status
        FROM Sensors s
        LEFT JOIN Shelves sh ON s.shelve_id = sh.id
        LEFT JOIN Rooms r ON sh.room_id = r.id
        LEFT JOIN sensorMaintenance sm ON sm.sensor_id = s.id
        GROUP BY s.id, s.name, s.sensorType, r.name
        ORDER BY s.id;
        """

        cursor.execute(query)
        sensors = cursor.fetchall()

        sensor_list = [
            {
                'id': sensor['sensor_id'],
                'name': sensor['sensor_name'],
                'type': sensor['sensor_type'],
                'location': sensor['location'],
                'lastMaintenance': sensor['last_maintenance'],
                'status': sensor['status']
            }
            for sensor in sensors
        ]

        return jsonify(sensor_list), 200

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return jsonify({'error': 'Database error occurred'}), 500

    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()

if __name__ == '__main__':
    app.run(debug=True, port=5001)