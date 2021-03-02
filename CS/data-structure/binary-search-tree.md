# 자료구조 - 이진 탐색 트리

## 이진 탐색 트리

**딕셔너리, 세트** 구현에 쓸 수 있음.

이름에서 알 수 있듯 이진 트리이다. 힙이 힙 속성을 갖고 있듯이 이진 탐색 트리도 이진 트리에 일정한 속성을 조건으로 한다.

<img width="814" alt="스크린샷 2021-03-02 오후 4 42 14" src="https://user-images.githubusercontent.com/61453718/109614647-3fb33a80-7b76-11eb-8924-183242f45d83.png">

위 그림처럼 노드를 기준으로 왼쪽 노드들은 전부 더 작은 값이 들어가야 하고, 오른쪽 노드들은 전부 더 큰 값이 들어가야 한다. 이는 `root` 노드에만 해당되는 사항이 아니라, 모든 노드에 대해 해당되는 사항이어야 한다.

<img width="816" alt="스크린샷 2021-03-02 오후 4 46 53" src="https://user-images.githubusercontent.com/61453718/109615149-e5ff4000-7b76-11eb-9c85-04d9974364f3.png">

즉 이와 같이 다른 노드들에 대해서도 이렇게 해당되는 사항이어야 한다는 것이다. 이것이 바로 이진 탐색 트리 속성이다.

ex) 4를 찾고 싶을 때 -> `root`노드를 기준으로 왼쪽은 작고 오른쪽은 크므로 왼쪽 / 오른쪽 자식 노드로 이동하면서 저장한 데이터를 찾는 연산을 실행할 수 있다.

### 이진 탐색 트리 구현

이진 탐색 트리는 완전 이진 트리라는 보장이 없기 때문에 **배열이나 파이썬 리스트로 구현하지 않고, 노드 클래스를 정의한 후 여러 노드 인스턴스를 생성한 후 이 인스턴스들을 연결시켜서 구현**한다.

> 이진 트리

```python
class Node:
    """이진 트리 노드"""
    def __init__(self, data):
      self.data = data
      self.left_child = None
      self.right_child = None
```

기존 이진 트리 노드에서 `self.parent = None`이라는 인스턴스 변수를 추가해주면 된다. 이 변수는 노드의 부모에 대한 레퍼런스를 저장한다.

더블리 링크드 리스트가 `next`, `prev`를 이용해서 값을 찾았던 것과 비슷한 로직이다. 이진 탐색 트리 노드 또한 왼쪽, 오른쪽 자식은 물론이고 부모에 대한 레퍼런스까지 저장할 수 있다.

몇 개의 인스턴스를 만들어 보자.

> BinarySearchTree.py

```python
class Node:
    """이진 탐색 트리 노드 클래스"""
    def __init__(self, data):
      self.data = data
      self.parent = None
      self.left_child = None
      self.right_child = None

# 노드 인스턴스 생성
node_0 = Node(5)
node_1 = Node(3)
node_2 = Node(7)

# 3은 5보다 작으므로, node_1을 node_0의 왼쪽 자식으로 만들어 주고 7은 5보다 크므로 node_2를 node_0의 오른쪽 자식으로 만들어 준다. 그리고 이 2개의 부모 노드를 node_0으로 지정한다.
node_0.left_child = node_1
node_0.right_child = node_2

node_1.parent = node_0
node_2.parent = node_0
```

<img width="203" alt="스크린샷 2021-03-02 오후 4 59 00" src="https://user-images.githubusercontent.com/61453718/109616526-9752a580-7b78-11eb-9daf-973db662abf7.png">

이제 이러한 형태의 이진 트리가 생성된 것이다. 이러한 일련의 과정을 클래스로 만들어 줄 수도 있다.

```python
class BinarySearchTree:
    """이진 탐색 트리 클래스"""
    def __init__(self):
        self.root - None # root 노드는 특별하므로 따로 변수로 만들어줘서 관리함

# 비어 있는 이진 탐색 트리 생성
bst = BinarySearchTree()
(...)
```

### 이진 탐색 트리 출력

#### in-order 순회

<img width="774" alt="스크린샷 2021-03-02 오후 5 02 42" src="https://user-images.githubusercontent.com/61453718/109616915-1ba52880-7b79-11eb-8cb4-a07da5846f80.png">

`in-order` 순회를 하면서 노드의 값을 출력하면 A, B, C, D, E, F, G, H, I의 순서대로 출력된다.

`in-order` 순회는:

1. 왼쪽 부분 트리를 `in-order` 순회한다.
2. 현재 노드의 데이터를 출력한다.
3. 오른쪽 부분 트리를 `in-order` 순회한다.

의 순서로 전체 트리를 순회한다.

#### `in-order` 순회와 이진 탐색 트리

이진 탐색 트리를 `in-order` 순회하면 저장된 데이터들을 정렬된 순서대로 출력할 수 있다.

<img width="774" alt="스크린샷 2021-03-02 오후 5 06 02" src="https://user-images.githubusercontent.com/61453718/109617309-92422600-7b79-11eb-98c4-4c97b017c716.png">

이러한 이진 탐색 트리가 있다고 해 보자. 이 때 트리의 `root` 노드를(노드 8) `in-order` 순회 함수의 파라미터로 넘겨주면, 트리 안에 있는 데이터를

```
1, 3, 4, 6, 7, 8, 10, 13, 14
```

처럼 정렬된 순서대로 출력할 수 있는 것이다.

#### BinarySearchTree 클래스

이전에 구현해 본 `in-order` 순회 함수를 재활용해서 이진 탐색 트리를 나타내는 `BinarySearchTree` 클래스에 트리 속의 데이터를 순서대로 출력하는 메소드 `print_sorted_tree` 메소드를 작성해보자.

```python
def print_inorder(node):
    """주어진 노드를 in-order로 출력해주는 함수"""
    if node is not None:
        print_inorder(node.left_child)
        print(node.data)
        print_inorder(node.right_child)

class BinarySearchTree:
    """이진 탐색 트리 클래스"""
    def __init__(self):
        self.root = None

    def print_sorted_tree(self):
        """이진 탐색 트리 내의 데이터를 정렬된 순서로 출력해주는 메소드"""
        print_inorder(self.root) # root 노드를 in-order로 출력한다.
```

### 이진 탐색 트리 삽입

<img width="812" alt="스크린샷 2021-03-02 오후 5 17 20" src="https://user-images.githubusercontent.com/61453718/109618660-26f95380-7b7b-11eb-82e6-7bd82867be36.png">

이 트리에 데이터 13을 삽입하고 싶다고 해보자. 가장 먼저 13을 저장하는 새로운 노드를 만든 후 이진 탐색 트리의 속성을 망가뜨리지 않게 넣어야 하는데, 어디에 저장해야 될 지 위치를 알아야 한다. `root` 노드에서 시작하면, 13은 12보다 크므로 오른쪽, 그리고 그 아래 18보단 작으므로 왼쪽, 그리고 그 아래 15보단 작으므로 왼쪽으로 가면 된다.

<img width="815" alt="스크린샷 2021-03-02 오후 5 20 58" src="https://user-images.githubusercontent.com/61453718/109619058-a850e600-7b7b-11eb-9c0a-3cd01941bb6e.png">

이렇게 새로운 노드를 15의 왼쪽 자식 노드로 만들어 주면 된다. 그리고 그와 동시에 15를 13의 부모 노드로 지정해 줘야 한다. 이것을 일반화해보면:

1. 새로운 노드를 생성한다.
2. `root` 노드부터 비교하면서 저장할 위치를 찾는다.
3. 찾은 위치에 새롭게 만든 노드를 연결한다.

이렇게 하면 이진 탐색 트리의 속성을 유지하면서 새로운 노드를 삽입할 수 있다.

삽입 시의 시간 복잡도를 알아보자. 트리의 높이를 `h`라고 했을 때, 새로운 노드를 생성하는 것과 찾은 위치에 새롭게 만든 노드를 연결하는 것은 모두 `O(1)`의 공통된 시간 복잡도를 갖는다.

문제는 `root` 노드부터 비교하면서 저장할 위치를 찾는 것인데, 최악의 경우를 생각해 보자. 최악의 경우는 트리의 가장 깊은 위치에 새로운 노드를 저장해야 하는 경우이다.

<img width="815" alt="스크린샷 2021-03-02 오후 5 24 45" src="https://user-images.githubusercontent.com/61453718/109619496-3036f000-7b7c-11eb-8813-930cc573532e.png">

이 경우 높이 `h`보다 한 단계 더 깊은 수준의 높이를 가지므로, 이 경우의 시간 복잡도는 `O(h + 1)`이다. 상수는 고려하지 않으므로 `O(h)`와 같다.

결국 삽입 시간의 전체 복잡도는 `O(1)` + `O(h)` + `O(1)` = `O(2 + h)` = `O(h)`이다.
