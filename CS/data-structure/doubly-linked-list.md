# 자료구조

## 더블리 링크드 리스트

> 각 노드가 다음 노드는 물론이고, 바로 이전 노드의 레퍼런스까지 저장하는 리스트

더블리 링크드 리스트 노드에서는, 전 노드에 대한 레퍼런스 prev가 추가된다.

```Python
class Node:
    """링크드 리스트 노드"""
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None
        # 다음 노드, 현재 노드, 전 노드에 대한 레퍼런스 저장 가능
class LinkedList:
    """링크드 리스트"""
    def __init__(self):
        self.head = None
        self.tail = None
```

### 겹치는 메소드(연산들)

`__init__` 말고도 싱글리 링크드 리스트에서 안바꿔도 되는 메소드들이 몇 개 있다.

`find_node_at`(접근 연산), `find_node_with_data`(탐색 연산), `__str__` 메소드가 싱글리 링크드 리스트와 겹친다.

#### 접근

```python
def find_node_at(self, index):
    iterator = self.head

    for _ in range(index):
        iterator = iterator.next

    return iterator
```

#### 탐색

```python
def find_node_with_data(self, data):
    iterator = self.head

    while iterator is not None:
        if iterator.data = data:
            return iterator

        iterator = iterator.next

    return None
```

#### `__str__` 메소드

```python
def __str__(self):
    res_str = "|"

    iterator = self.head

    while iterator is not None:
        res_str += " {} |".format(iterator.data)
        iterator = iterator.next

    return res_str
```

### 추가 연산

```python
class LinkedList:
    """더블리 링크드 리스트 클래스"""
    def __init__(self):
        self.head = None
        self.tail = None

    def append(self, data):
        """링크드 리스트 추가 연산 메소드"""
        new_node = Node(data) # 새로운 데이터를 저장하는 노드

        # 링크드 리스트가 비어있는 경우
        if self.head is None:
            self.head = new_node
            self.tail = new_node
        else: # 링크드 리스트 안에 이미 데이터가 있는 경우
            self.tail.next = new_node # new_node를 tail node의 다음으로 만들어 준다.
            new_node.prev = self.tail # tail node를 새롭게 만든 new_node의 전 node로 만들어 준다.
            self.tail = new_node # tail을 새로 만든 node로 바꿔주기
```

### 삽입 연산 (특정 노드 뒤에 데이터를 더함)

```python
def insert_after(self, previous_node, data):
    """더블리 링크드 리스트 삽입 연산"""
    new_node = Node(data)
    if previous_node = self.tail:
        # tail node 뒤에 삽입할 때 (previous_node = self.tail)
        previous_node.next = new_node # 새로운 노드를 tail 노드의 다음 노드로 지정
        new_node.prev = previous_node # tail 노드를 새로운 노드의 전 노드로 지정
        self.tail = new_node # 새로운 노드를 tail 노드로 지정
    else:
        # 두 노드 사이에 삽입할 때
        new_node.prev = previous_node # 새롭게 생성한 노드를 이미 있는 링크드 리스트에 연결시키고
        new_node.next = previous_node.next
        previous_node.next.prev = new_node # 이미 있는 노드들의 앞과 다음 레퍼런스를 새롭게 생성한 노드로 지정한다
        previous_node.next = new_node
        # new_node.next = previous_node.next
        # previous_node.next = new_node
        # new_node.prev = previous_node
```

### 삽입 연산 (가장 앞에 데이터를 삽입)

```python
def prepend(self, data):
    new_data = Node(data)
    if self.head is None:
        self.head = new_data
        self.tail = new_data
    else:
        self.head.prev = new_data # 새로운 노드의 다음 노드를 head 노드로 지정
        new_data.next = self.head # head 노드의 전 노드를 새로운 노드로 지정
        self.head = new_data # head 노드 업데이트
```

### 삭제 연산

`def delete_after(self, node_to_delete):`

삭제 메소드: delete, 삭제하고 싶은 노드: node_to_delete

1. 지우려는 노드가 리스트에서 마지막 남은 노드인 경우 - head와 tail에 None을 지정
2. head 노드를 지우려는 경우 (지우려는 노드가 head 노드인데 마지막 남은 노드는 아닌 경우)
   - head를 head의 다음 노드로 바꿔주고, head의 전 노드를 None으로 바꿔준다.
3. tail 노드를 지우려는 경우 (지우려는 노드가 head 노드인데 마지막 남은 노드는 아닌 경우)
   - tail을 tail의 전 노드로 바꿔주고, tail의 다음 노드를 None으로 바꿔준다.
4. 두 노드 사이의 노드를 삭제하는 경우
   - node_to_delete.prev.next = node_to_delete.next
   - node_to_delete.next.prev = node_to_delete.prev

이를 코드로 하면,

```python
def delete_after(self, node_to_delete):
    if self.head is self.tail:
        self.head = None
        self.tail = None
    elif node_to_delete is self.head:
        self.head = self.head.next
        self.head.prev = None
    elif node_to_delete is self.tail:
        self.tail = self.tail.prev
        self.tail.next = None
    else:
        node_to_delete.prev.next = node_to_delete.next
        node_to_delete.next.prev = node_to_delete.prev
```

### 더블리 링스크 리스트의 시간 복잡도

#### 접근 & 탐색 연산

head 노드부터 하나씩 다음 노드로 가면서 원하는 위치에 있거나 데이터를 갖는 노드를 찾았다. 링크드 리스트의 길이가 n이라고 할 때, 최악의 경우 걸리는 시간은 n에 비례하므로 접근과 탐색은 O(n)이 걸린다.

#### 삽입 & 삭제 연산

삽입 연산은, 특정 노드가 주어졌을 때 그다음 위치에 새로운 노드를 더해줬다. 앞과 뒤 노드의 레퍼런스 몇개만 바꿔주면 되므로 링크드 리스트의 길이와 상관없이 O(1)

삭제 연산은 마찬가지로 레퍼런스 두개만 바꿔주면 노드를 지울 수 있었다. 그러므로 O(1)

> 싱글리 링크드 리스트 노드는 저장하려는 데이터와 다음 노드에 대한 레퍼런스를 저장하는 반면, 더블리 링크드 리스트 노드는 저장하려는 데이터와 그 데이터의 앞, 뒤 노드에 대한 레퍼런스를 저장한다. 따라서 더블리 링크드 리스트가 싱글리 링크드 리스트보다 약 두 배 정도 많은 추가적인 저장 공간이 필요하다. 따라서, 공간이 부족해질 수도 있는 상황에선 더블리 링크드 리스크보다 싱글리 링크드 리스트를 사용하는 게 더 낫다.

출처: [코드잇](https://codeit.kr)
