const todoSchema = {
    "Todo": {
        "type": "object",
        "properties": {
        "id": {
            "type": "integer",
            "description": "The unique identifier for the todo item."
        },
        "title": {
            "type": "string",
            "description": "The title or name of the todo item."
        },
        "completed": {
            "type": "boolean",
            "description": "Indicates whether the todo item is completed or not."
        }
        },
        "required": ["id", "title", "completed"]
    }
}

export default todoSchema;
