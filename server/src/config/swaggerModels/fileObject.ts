const fileObject = {
    "FileObject": {
        "type": "object",
        "properties": {
            "id": {
                "type": "integer",
                "description": "The unique identifier for the file object."
            },
            "path": {
                "type": "string",
                "description": "The file path of the object."
            }
        },
        "required": ["id", "path"]
    }
};

export default fileObject;