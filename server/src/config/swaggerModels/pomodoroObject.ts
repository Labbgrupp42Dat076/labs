const Pomodoro = {
    "Pomodoro": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "description": "The unique identifier for the pomodoro item."
        },
        "startTime": {
          "type": "integer",
          "description": "Start time in seconds"
        },
        "endTime": {
          "type": "integer",
          "description": "End time in seconds"
        },
        "duration": {
          "type": "integer",
          "description": "Duration in seconds"
        },
        "userId": {
          "type": "integer",
          "description": "The unique identifier for the user owning it."
        }
      },
      "required": ["id", "startTime", "endTime", "duration", "userId"]
    }
}
 
export default Pomodoro;