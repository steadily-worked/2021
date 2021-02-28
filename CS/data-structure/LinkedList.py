class Node:
    """링크드 리스트의 노드 클래스"""

    def __init__(self, data):
        self.data = data    # 노드가 저장하는 데이터
        self.next = None    # 다음 노드에 대한 레퍼런스


# 데이터 2, 3, 5, 7, 11을 담는 노드를 생성
head_node = Node(2)  # 2라는 data가 생성됨. self.data에 2 저장. head node
node_1 = Node(3)
node_2 = Node(5)
node_3 = Node(7)
tail_node = Node(11)  # 마지막 노드: tail node

# 노드 객체 연결하기
head_node.next = node_1
node_1.next = node_2
node_2.next = node_3
node_3.next = tail_node

# 노드 순서대로 출력

iterator = head_node

# while iterator is not None:
#     print(iterator.data)
#     iterator = iterator.next

# 링크드 리스트를 체계적으로 관리하기 위해 링크드 리스트 클래스 만들기


class LinkedList:
    """링크드 리스트 클래스"""

    def __init__(self):
        self.head = None
        self.tail = None

    def find_node_at(self, index):
        """링크드 리스트 접근 연산 메소드. 파라미터 인덱스는 항상 있다고 가정"""
        iterator = self.head

        for _ in range(index):
            iterator = iterator.next

        return iterator

    def append(self, data):  # data: parameter
        """링크드 리스트 추가 연산 메소드"""
        new_node = Node(data)

        if self.head is None:  # 링크드 리스트가 비어있는 경우
            self.head = new_node
            self.tail = new_node
        else:  # 링크드 리스트가 비어있지 않은 경우
            self.tail.next = new_node
            self.tail = new_node

    def __str__(self):
        """링크드 리스트를 문자열로 표현해서 리턴하는 메소드"""
        res_str = "|"

        # 링크드 리스트 안에 모든 노드를 돌기 위한 변수. 일단 가장 앞 노드로 정의한다.
        iterator = self.head

        while iterator is not None:
            # 각 노드의 데이터를 리턴하는 문자열에 더해준다.
            res_str += f" {iterator.data} |"
            iterator = iterator.next  # 다음 노드로 넘어간다.

        return res_str

# new_node를 tail 뒤에 설정하려면, self.tail.next = new_node
# 그 다음에 new_node를 tail로 설정해준다. self.tail = new_node


# 새로운 링크드 리스트 생성
my_list = LinkedList()

# 링크드 리스트에 데이터 추가
my_list.append(2)
my_list.append(3)
my_list.append(5)
my_list.append(7)
my_list.append(11)

iterator = my_list.head

while iterator is not None:
    print(iterator.data)
    iterator = iterator.next

# 링크드 리스트 노드에 접근(데이터 갖고 오기)
print(my_list.find_node_at(3).data)

# 링크드 리스트 노드에 접근 (데이터 바꾸기)
my_list.find_node_at(2).data = 13

print(my_list)
