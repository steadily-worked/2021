# 특정 리소스의 일부만 갱신
import requests
import json

url_item = 'http://localhost:8001/todos/2'

response = requests.delete(url_item)

print(response.text)
