import requests
import json

url_item = 'http://localhost:8001/todos'

response = requests.get(url_item)

print(response.text)
