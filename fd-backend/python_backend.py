from flask import Flask, request, jsonify
import flirty_model

app = Flask(__name__)

@app.route("/api/query", methods=["POST"])
def handle_query():
    try:
        data = request.json
        input_string = data["query"]
        result = flirty_model.arbitrary_function(input_string)
        # return jsonify({"message": "User data saved successfully."}), 200
        return jsonify({"result": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
