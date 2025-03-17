const Pomodoro = {
    "Pomodoro": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer"
        },
        "startTime": {
          "type": "integer"
        },
        "endTime": {
          "type": "integer"
        },
        "duration": {
          "type": "integer",
          "description": "Duration in minutes"
        },
        "userId": {
          "type": "integer"
        }
      }
    }
}
 
export default Pomodoro;