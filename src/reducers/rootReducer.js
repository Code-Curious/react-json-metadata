const defaultState = {
      JsonData: {
        "name": {
          "type": "string",
          "value": "Salim"
        },
        "age": {
          "type": "number",
          "value": 24
        },
        "favorite_color": {
          "type": "string",
          "value": "silver"
        },
        "gender": {
          "type": "string",
          "enum": [
          "male",
          "female"
          ],
          "value": "male"
        },
        "location": {
          "type": "object",
          "title": "Location",
          "properties": {
            "country": {
              "type": "string",
              "value": "Morocco"
            },
            "city": {
              "type": "string",
              "value": "Rabat"
            },
            "house": {
              "type": "object",
              "properties": {
                "typee": {
                  "type": "string",
                  "value": "apartment"
                },
                "size": {
                  "type": "string", 
                  "value":"medium"
                },
                "floor": {
                  "type": "object", 
                  "properties":{
                    "number": {
                      "type": "number",
                      "value": 3
                    },
                    "hasElevator" : {
                      "type": "boolean",
                      "value": true
                    }
                  }}
                }
              }
            }
          },
          "pet": {
            "type": "object",
            "properties":{
              "typee":{
                "type": "string",
                "value": "cat"
              },
              "name": {
                "type": "string", 
                "value":"Simba"
              }
            }
          }
        }
      }

export default function rootReducer(state = defaultState, action = {}) {
  switch(action.type) {
    default: return state
  }
}
