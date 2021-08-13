# 특정 리소스의 일부만 갱신
import requests
import json

url_item = 'http://localhost:8001/todos/4'

new_item = {
    "content": "Dart"
    # 이거 하나만 썼다는 건, Content만 바꾼다는 뜻임
}

response = requests.patch(url_item, data=new_item)

print(response.text)
