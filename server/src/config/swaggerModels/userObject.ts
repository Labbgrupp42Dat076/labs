const User = {
    "User": {
        "type": "object",
        "properties": {
            "id": {
                "type": "integer",
                "description": "The unique identifier for the user."
            },
            "name": {
                "type": "string",
                "description": "The name of the user."
            },
            "password": {
                "type": "string",
                "description": "The password of the user."
            },
            "noteIds": {
                "type": "array",
                "items": {
                "type": "integer"
                },
                "description": "A list of note IDs associated with the user."
            },
            "todoIds": {
                "type": "array",
                "items": {
                "type": "integer"
                },
                "description": "A list of todo IDs associated with the user."
            }
        },
        "required": ["id", "name", "password", "noteIds", "todoIds"]
    }
}

export default User;
