const Note = {
    "Note": {
        "type": "object",
        "properties": {
            "id": {
                "type": "integer"
            },
            "title": {
                "type": "string"
            },
            "preview": {
                "type": "string"
            },
            "fileID": {
                "type": "integer"
            },
            "todoIds": {
                "type": "array",
                "items": {
                    "type": "integer"
                }
            }
        },
        "required": ["title", "preview", "fileID", "id", "todoIds"]
    }
}

export default Note;