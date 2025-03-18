const Note = {
    "Note": {
        "type": "object",
        "properties": {
            "id": {
                "type": "integer",
                "description": "The unique identifier for the note item."
            },
            "title": {
                "type": "string",
                "description": "The title or name of the note item."
            },
            "preview": {
                "type": "string",
                "description": "The preview of the note item."
            },
            "fileID": {
                "type": "integer",
                "description": "The unique identifier for the file object."
            },
            "todoIds": {
                "type": "array",
                "items": {
                    "type": "integer",
                    "description": "A list of todo IDs associated with the note."
                }
            }
        },
        "required": ["title", "preview", "fileID", "id", "todoIds"]
    }
}

export default Note;