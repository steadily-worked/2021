import requests
import json

url_item = 'http://localhost:8001/todos/4'

new_item = {
    "id": 5,
    "content": "TypeScript",
    "completed": True
}

response = requests.put(url_item, data=new_item)

print(response.json())
