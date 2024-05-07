# -*- coding: utf-8 -*-
"""main.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1BYjZFkX80YXpJOBJpMvogItfAJR-FLaG
"""
from flask import Flask, request, jsonify
import random
# Import necessary libraries
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

app = Flask(__name__)

# Load the Iris dataset
iris = load_iris()
X = iris.data  # Features (sepal length, sepal width, petal length, petal width)
y = iris.target  # Target (species)

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print("Top 10 rows of X_train:", X_train[:10])
print("Top 10 rows of y_train:", y_train[:10])
print("Top 10 rows of X_test:", X_test[:10])
print("Top 10 rows of y_test:", y_test[:10])

# Initialize the Random Forest classifier
clf = RandomForestClassifier(n_estimators=100, random_state=42)

# Train the classifier on the training data
clf.fit(X_train, y_train)

# Make predictions on the testing data
y_pred = clf.predict(X_test)

# Calculate the accuracy of the model
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)


def arbitrary_function(input_string):
    # Generate a random number (0 or 1)
    print("input_string:", input_string)

    # Choose a single input value
    single_input = [[5.1, 3.5, 1.4, 0.2]]  # Example input features for one iris sample

    # Make prediction for the single input
    predicted_class = clf.predict(single_input)

    # Map the predicted class index to the actual class name
    predicted_class_name = iris.target_names[predicted_class[0]]

    print("Predicted class:", predicted_class_name)
    random_number = random.randint(0, 1)
    
    # Return True if random_number is 1, otherwise return False
    return random_number == 1, predicted_class_name


# Define a route to handle incoming POST requests
@app.route("/api/query", methods=["POST"])
def handle_query():
    try:
        data = request.json
        input_string = data["query"]
        result, class_name = arbitrary_function(input_string)
        # return jsonify({"message": "User data saved successfully."}), 200
        return jsonify({"result": result, "class_name": class_name}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)