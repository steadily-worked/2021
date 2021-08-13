import requests
import json

url_item = 'http://localhost:8001/todos'

new_item = {
    "id": 5,
    "content": "TypeScript",
    "completed": False
}

response = requests.post(url_item, data=new_item)

print(response.text)
