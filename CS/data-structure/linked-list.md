# 자료구조

- 자료 구조의 목적: 자료를 구조화하여 데이터를 효율적으로 사용하는 것.
- 컴퓨터에 데이터가 어떻게 저장되는지를 알아야 함.

### 자료가 저장되는 곳

#### 스토리지(Storage)

- 데이터가 영구적으로 저장되는 곳. 사용자가 직접 지우거나 하지 않는 이상 사라지지 않는다.
- 데이터를 저장하고 받아오는 게 느리다.

#### 메모리(RAM)

- 데이터가 임시로 저장되는 곳. 임시적으로 저장된 것이기 때문에 컴퓨터가 꺼지면 날아감.
- 여기서 '저장'을 누를 경우 스토리지에 저장되고 영구적으로 남음
- 데이터를 저장하고 받아오는 게 빠르다.
- 지금 당장 사용해야 되는 데이터를 저장한다.

> 자료구조는 스토리지가 아닌, '메모리'를 위주로 구성됨

### RAM: Random Access Memory(임의 접근 메모리)

- 일정한 칸으로 나눠져 있다.
- 각 칸에 데이터를 저장할 수 있다.
- 각 칸은 자신만의 주소가 있다.
- 임의 접근: 저장 위치를 알면 접근할 때 항상 일정한 시간이 걸림
- 자료 구조에서, `메모리에 데이터를 저장`하고 `메모리에 저장된 데이터를 찾는` 얘기가 계속해서 나오게 될텐데, 메모리는 임의접근 하고 있다는 것을 항상 기억해야 함.

### 레퍼런스

- X = 95 -> "X는 95다 (X)", "X는 95를 가리킨다 (O)"
  레퍼런스는, 데이터에 접근할 수 있게 해주는 값을 포괄적으로 말한다. "주소"보다 조금 더 포괄적인 표현이다. 자료 구조를 배울 때는 "주소 = 레퍼런스" 라고 생각해도 된다.
- x = 95라는 변수를 사용할 때는, 저장된 값을 알아서 받아오기 때문에

```python
x = 95
print(x + 5) => print(95 + 5)
```

이렇게 생각해도 큰 무리는 없다.

## 배열

C 배열과 다르게 파이썬 배열에서는 값을 가리키는 용도 정도로만 배열을 사용하기 때문에, 아무리 큰 데이터가 있다 한들 크게 상관이 없다.

정적 배열: 크기 고정 (요소 수 제한, 이후에 바꿀 수 없음)
동적 배열: 크기 변함 (요소 계속 추가 가능). 정적 배열로 만들어진 자료 구조이며 정적 배열의 크기를 상황에 맞게 조절한다.

### 분할 상환 분석

분할 상환 분석은 연산을 n번 했을 때 총 드는 시간 X를 n으로 나눠주는 "할부" 개념이다. 최악의 경우로 시간 복잡도를 얘기하는 것이 비합리적인 경우에 사용한다. 동적 배열의 추가(append) 연산에 직접 분할 상환 분석을 해보자.

### 동적 배열 동작

동적 배열에 추가를 할 때는:

1. 새로운 인덱스에 데이터를 저장하는 시간
2. 기존 배열의 크기가 부족해서 더 큰 배열을 만들고, 기존 배열의 데이터들을 옮기는 시간

이 두 가지를 나눠서 생각하면 편하다.

우선 동적 배열에 데이터를 추가할 때 일어나는 일을 나열해 볼 것이다.

비어있는 동적 배열에 추가 연산 9번을 한다고 가정하자. 처음 시작할 때 동적 배열은 크기가 1인 배열이다.

1. 첫 번째 요소 추가:
   1. 그냥 새로운 데이터를 저장한다.
2. 두 번째 요소 추가:
   1. 배열이 꽉 차서, 크기가 2인 배열을 새로 만들고 기존 데이터를 옮겨 저장한다(1개 옮겨 저장)
   2. 맨 뒤 인덱스에 새로운 데이터를 저장한다.
3. 세 번째 요소 추가:
   1. 배열이 꽉 차서, 크기가 4인 배열을 새로 만들고 기존 데이터를 옮겨 저장한다(2개 옮겨 저장)
   2. 맨 뒤 인덱스에 새로운 데이터를 저장한다.
4. 네 번째 요소 추가:
   1. 맨 뒤 인덱스에 새로운 데이터를 저장한다.
5. 다섯 번째 요소 추가
   1. 배열이 꽉 차서, 크기가 8인 배열을 새로 만들고 기존 데이터를 옮겨 저장한다(4개 옮겨 저장)
   2. 맨 뒤 인덱스에 새로운 데이터를 저장한다.
6. 여섯 번째 요소 추가:
   1. 맨 뒤 인덱스에 새로운 데이터를 저장한다.
7. 일곱 번째 요소 추가:
   1. 맨 뒤 인덱스에 새로운 데이터를 저장한다.
8. 여덟 번째 요소 추가:
   1. 맨 뒤 인덱스에 새로운 데이터를 저장한다.
9. 아홉 번째 요소 추가:
   1. 배열이 꽉 차서, 크기가 16인 배열을 새로 만들고 기존 데이터를 옮겨 저장한다(8개 옮겨 저장)
   2. 맨 뒤 인덱스에 새로운 데이터를 저장한다.

이런 식으로 내부 배열이 꽉 찼을 때는 새로운 배열을 만들고, 기존 요소들을 복사하고, 새로운 요소를 저장하면 된다. 그리고 배열에 여유가 있으면 그냥 새로운 요소만 저장하면 된다.

### 분할 상환 분석

분할 상환 분석을 하면 이 동작을 n번 반복한다고 가정한다. 총 걸리는 시간을 계산하기 쉽게 두 가지로 나눠서 생각해 볼 것이라고 했다.

1. 새로운 데이터를 동적 배열 맨 끝에 단순히 저장하는 데 걸리는 시간
2. 더 큰 배열을 만들고 그 배열에 기존의 데이터를 옮기는 데 걸리는 시간

걸리는 두 시간을 각각 따로 계산해 보자.

#### 배열 끝에 새로운 데이터를 저장하는 데 걸리는 시간<

먼저 새로운 데이터를 저장하는 데 걸리는 총 시간에 대해서 생각해보자.

| x번째 추가 | 배열 끝에 데이터 저장하는 데 걸리는 시간 |
| ---------- | ---------------------------------------- |
| 1          | 1                                        |
| 2          | 1                                        |
| 3          | 1                                        |
| 4          | 1                                        |
| 5          | 1                                        |
| 6          | 1                                        |
| 7          | 1                                        |
| 8          | 1                                        |
| 9          | 1                                        |
| ...        | 1                                        |
| n          | 1                                        |

인덱스에 데이터를 저장하는 데 걸리는 시간은 1이라고 했었다. 이걸 총 n번 하는 것이므로 O(n)이 걸린다.

#### 새로운 배열에 데이터를 옮기는 시간

이번에는 내부 배열이 꽉 차서 기존 데이터를 복사하는 데 걸리는 시간에 대해서 생각해 보자.

| x번째 추가 | 배열 크기 | 새로운 배열에 요소 옮겨 저장하는 데 걸린 시간 |
| ---------- | --------- | --------------------------------------------- |
| 1          | 1         | 0                                             |
| 2          | 2         | 1                                             |
| 3          | 4         | 2                                             |
| 4          | 4         | 0                                             |
| 5          | 8         | 4                                             |
| 6          | 8         | 0                                             |
| 7          | 8         | 0                                             |
| 8          | 8         | 0                                             |
| 9          | 16        | 8                                             |
| ...        |           |                                               |
| n          |           |                                               |

새로운 배열에 기존 데이터를 옮겨 저장하는 시간은 위 표에 나와있는 대로 소요된다.

표를 살펴보자. 2, 3, 5, 9번째 추가 때 배열의 크기를 늘려야 한다. 그럴 때마다 데이터를 옮겨야 하는데, 이 때 데이터를 각각 1, 2, 4, 8개씩 복사하고 붙여 넣는다.

데이터를 복사해서 붙여 넣는 총 시간 비용은 이 시간들을 더한 8+4+2+1이다. 좀 더 일반화해서 생각해보자.

추가 연산을 n번 했을 때, 가장 마지막에 데이터를 m개 옮겨서 저장했다고 해보자.

그럼 데이터를 복사해서 저장하는 데 걸린 총 시간은: m + m/2 + m/4 + ... + 1 이렇게 표현할 수 있다.

이런 식으로 어느 자연수든 반씩 줄여서 1까지 계속 더해주면, 그 결과는 절대 2m을 넘을 수 없다. 정확히 말하면 딱 2m-1이 된다.

근데, 가장 최근에 데이터를 옮겨 저장할 때 8이 걸렸다는 것은 무슨 의미일까? 원래 배열의 수용 가능 크기가 8이었지만 크기가 부족해서 16개의 데이터를 담을 수 있는 새로운 배열로 복사했다는 뜻이다. 그럼 결국에 현재 배열 안에 있는 데이터는 9개~16개 사이라는 뜻이다. 16개보다 더 많은 요소가 있으면 가장 최근에 옮겨 저장한 요소가 8이 아니라 16일 것이다.

이 사실을 바탕으로, 우리가 일반화할 때 사용했던 배열 안 요소 수 n과 가장 최근 옮겨 저장한 요소 수 m의 관계에 대해 한 가지 사실을 알아낼 수 있었다.

가장 최근에 복사하는 데 걸린 시간이 8일 때, 배열 안에 있는 데이터는 9개~16개 사이이다. 즉 m은 무조건 n보다 작다고 할 수 있다.

추가 연산을 연속으로 n번 하고, 가장 마지막에 옮겨 저장한 데이터 요소 수를 m이라고 할 때:

- 복사해서 저장하는 데 걸리는 총 시간이 2m - 1 이고
- m은 n보다 작다

이걸 다시 정리해서 나타내면,

<b>연속으로 추가 연산 n번을 하면 데이터를 옮겨서 저장하는 데 걸리는 총 시간은 2n보다 작다</b>

라고 할 수 있다.

#### 두 경우 합치기

지금까지 나온 내용을 종합해 보면, 동적 배열에 n개의 데이터를 연속으로 추가하면:

1. 새로운 데이터를 저장하는 데에는 n의 시간이 들고
2. 데이터를 옮겨 저장하는 데에는 2n보다 적은 시간이 걸린다.

이 두 시간을 합치면 총 드는 시간은 3n보다 적은 시간이다. 이걸 시간 복잡도로 표현하면 O(3n), 그러니까 O(n)이라고 할 수 있다.

근데 이건 추가 연산을 한 번 하는 게 아니라 연속으로 n번 하는 데 걸리는 시간 복잡도이다.

그러니까, 총 n번의 추가 연산을 하는 데 걸리는 시간이 O(n)인 것이다. 추가 연산을 n번 하는 데 O(n)의 시간이 걸리니까 1번 하는 데는, O(n) / n, 즉 O(1)이 걸리는 것이다.

전에는 추가 연산이 최악의 경우 O(n)이 걸린다고 했었는데, 분할 상환 분석을 하면 O(1)이 걸린다고 보는 것이다.

#### 최악의 경우 분석 vs. 분할 상환 분석<

사실 분할 상환 분석을 한다고 꼭 시간 복잡도가 줄어드는 건 아니다. 보통은 할부 개념을 적용해도 시간 복잡도가 줄어들지 않는다.

하지만 만약 최악의 경우보다 분할 상환 분석을 한 시간 복잡도가 더 적다면, 분할 상환 분석을 한 시간 복잡도를 사용한다. 그러니까 "동적 배열의 끝에 데이터를 추가할 때는 O(1)이 걸린다." 라고 표현해도 된다는 것이다.

보통은 혼란을 없애기 위해 좀 더 정확하게:

<b>동적 배열의 추가(append) 연산은 최악의 경우 O(n)이 걸리지만, 상환 분석을 하면 O(1)이 걸린다.</b>

라고 표현할 수 있다.

### 동적 배열 삽입 연산

1. 정적 배열에 남는 공간이 있을 때

- 들어갈 자리 뒤에 있는 요소들을 전부 한 인덱스씩 뒤로 미뤄야 함
- 이 때 시간 복잡도는, [0]에 요소를 삽입할 때 현재 저장돼 있는 n개의 요소들을 전부 한 칸 뒤로 미뤄야 함. -> O(1) \* n = O(n)

2. 정적 배열이 꽉 찼을 때

- 새로운 배열을 만든 후 기존 배열을 복사해 줌. 그 후에 1. 처럼 들어갈 자리 뒤 요소들을 전부 한 인덱스씩 뒤로 미룸
- 이 때 시간 복잡도는
  - 새로운 배열을 만들고 기존요소를 옮겨 저장하는 시간 O(n)
  - 원하는 위치 뒤 요소들을 전부 한 칸 뒤로 미뤄줌. 최악의 경우 인덱스 0번이므로 n개를 뒤로 미뤄줘야 해서 O(n)
  - 새로운 데이터 넣기: O(1)
  - 총합 = O(n) + O(n) + O(1) = O(2n+1) = O(n)

결국 두 개의 삽입 연산의 시간 복잡도는 모두 O(n)임. 아무 위치에 삽입하기만 하면 O(n)이 걸림

### 동적 배열 삭제 연산<

#### 삭제 연산 동작

2, 3, 5, 7, 11이 있는 동적 배열에서 [1] = 3을 지우고 싶다고 했을 때, 한 단계씩 보자.

1. [1] 뒤에 있는 데이터를 모두 한 칸씩 앞으로 밀어서 저장한다.
   1. [1]에 [2]에 있던 5 저장
   2. [2]에 [3]에 있던 7 저장
   3. [3]에 [4]에 있던 11 저장
2. 동적 배열은 배열의 크기와 개발자가 사용하는 인덱스들의 범위를 따로 관리한다. 데이터를 삭제했으므로 동적 배열에서 접근할 수 있는 인덱스 범위도 1을 줄여 준다.

동적 배열에 남은 데이터는 2, 5, 7, 11이다.

요약하자면, 삭제 연산은 그냥 삭제하고 싶은 데이터 뒤에 있는 모든 데이터 요소들을 한 칸씩 앞으로 밀어서 저장하면 된다.

#### 삭제 연산 시간 복잡도

삭제 연산 또한 아무 위치의 데이터를 삭제할 때와 맨 뒤 데이터를 삭제할 때, 두 경우를 나눠서 생각할 수 있다.

#### 맨 앞 데이터를 지울 때(최악의 경우)

이 때 삭제 연산이 가장 오래 걸린다.

가장 앞 데이터를 삭제할 때는 [1]부터 끝까지 모든 요소들을 한 칸씩 앞으로 밀어서 저장해야 한다. 그러니까 삭제하기 전 배열 안에 총 n개의 데이터가 남아 있으면, 총 n-1개의 요소들을 하나씩 앞칸으로 밀어서 저장해야 된다는 것이다. 이 횟수가 n에 비례하므로 O(n)이 걸린다고 할 수 있다.

##### 맨 뒤 데이터를 지울 때

그냥 동적 배열의 사용 공간을 한 인덱스 줄이면 된다. 배열의 데이터 요소 개수에 무관하게 일정한 시간에 (O(1)) 할 수 있다.

### 배열, 동적배열 정리/비교

#### 연산 & 시간 복잡도

|              | 배열  | 동적 배열        |
| ------------ | ----- | ---------------- |
| 접근(access) | O(1)  | O(1)             |
| 탐색(search) | O(n)  | O(n)             |
| 삽입(insert) | `N/A` | O(n), 맨 뒤 O(1) |
| 삭제(delete) | `N/A` | O(n), 맨 뒤 O(1) |

#### 낭비하는 공간

- 배열: 크기가 고정되어 있기 때문에 낭비하는 공간이 없음
- 동적 배열: 공간을 낭비할 수도 있고 안할 수도 있다. (정적 배열 크기 = 동적 배열 크기인 경우까지 낭비X. 정적 배열 크기가 더 클 경우 낭비.)
  - 최악의 경우(새로운 배열을 만들었을 때): 저장 된 요소 수: n & 낭비되는 공간: n-2
    - 9개의 요소 저장 시, 16개로 늘어나면서 7개의 저장 공간이 낭비되고 있음. 최대 n-2

### 정적 배열에 삽입, 삭제를 못하는 이유

#### 배열에 데이터 삽입을 못하는 이유

```C
int numArray[4];

numArray[0] = 2;
numArray[1] = 3;
numArray[2] = 5;
numArray[3] = 7;
```

배열에 삽입을 못하는 이유는 직관적이다.

이렇게 정수형 데이터 4개를 저장하는 배열을 정의했다고 하자. 배열은 크기가 정해져 있다. 더 많은 데이터 요소들을 저장하고 싶으면 더 큰 배열을 정의해야 한다. 사용하고 싶은 요소 수에 따라 크기를 바꿀 수 있으면 그건 배열이 아니라 동적 배열일 것이다.

크기가 고정돼 있는 배열에는 처음 정한 수보다 더 많은 데이터를 삽입할 수가 없는 것이다.

#### 배열에 데이터 삭제를 못하는 이유

```C
int numArray[4];

numArray[0] = 2;
numArray[1] = 3;
numArray[2] = 5;
numArray[3] = 7;
```

정수 4개를 담을 수 있는 배열에 `2, 3, 5, 7`이 저장돼 있다고 하자. 여기서 [1]에 있는 3을 지우고 싶으면 어떻게 하면 될까?

동적 배열 삭제 연산에서 배웠던 대로 [1] 자리에 [2]를 저장하고, [2] 자리에 [3]을 저장해서 `2, 5, 7, 7`의 형태로 하면 될 것 같아 보이는데, 여기서 문제는 [3]에 저장돼 있던 `7`을 자연스럽게 지울 수 있는 방법이 마땅히 없다. 비었다는 것을 표시하기 위해 Python에서는 `None`, 다른 언어들에서는 `Null` 이런 값을 넣는 걸 생각할 수 있는데, `numArray`는 정수형 데이터 4개를 저장한다. `None`이나 `Null`은 정수형이 아니다. `numArray[3]`에 저장할 수 없다.

즉, 자연스러운 삭제가 불가능하다는 것이다.

#### 동적 배열 삭제와의 차이

동적 배열은, [1]을 삭제할 경우 [1]자리에 [2]의 값을, [2]의 자리에 [3]의 값을 저장한 후에 파이썬 내부적으로 개발자가 접근할 수 있는 범위를 0~2로 만들어 버린다. 더이상 [3]에 접근할 수 없게 하는 것이다.

실제로 [3]에 어떤 값이 저장되어 있든지 상관없이 개발자는 더이상 거기에 접근할 수 없다. 동적 배열에서 접근할 수 있는 데이터가 `2, 5, 7`밖에 없으므로 실질적으로 삭제됐다고 할 수 있는 것이다.

## 링크드 리스트(Linked List)

- 데이터를 순서대로 저장해준다.
- 동적 배열처럼 요소를 계속 추가할 수 있다.
- 노드(Node): data / next(다음 node에 대한 reference)

```python
n_1.next = n_2
```

- n_1.next는 n_2에 대한 레퍼런스이다. (n_2를 가리키고 있으므로)

### 링크드 리스트 **str** 메소드

```Python
class LinkedList:
   """링크드 리스트 클래스"""
   def __init__(self):
      self.head = None # 링크드 리스트의 가장 앞 노드
      self.tail = None # 링크드 리스트의 가장 뒤 노드

   def append(self, data):
      """링크드 리스트 추가 연산 메소드"""
      new_node = Node(data)

      # 링크드 리스트가 비어있으면 새로운 노드가 링크드 리스트의 처음이자 마지막 노드이다.
      if self.head is None:
         self.head = new_node
         self.tail = new_node
      # 링크드 리스트가 비어있지 않으면
      else:
         self.tail.next = new_node # 가장 마지막 노드 뒤에 새로운 노드를 추가하고
         self.tail = new_node # 마지막 노드를 추가한 노드로 바꿔준다.
   def __str__(self):
      """링크드 리스트를 문자열로 표현해서 리턴하는 메소드"""
      res_str = "|"

      # 링크드 리스트 안에 모든 노드를 돌기 위한 변수. 일단 가장 앞 노드로 정의한다.
      iterator = self.head

      while iterator is not None:
         # 각 노드의 데이터를 리턴하는 문자열에 더해준다.
         res_str += f"{iterator.data} |"
         iterator = iterator.next # 다음 노드로 넘어간다.

      return res_str
```

`res_str` 메소드는 문자열을 리턴하니까 일단 리턴 시킬 `res_str` 변수를 빈 문자열로 정의한다. `iterator`을 써서 링크드 리스트를 도는 방법은 이미 배웠다.

- `iterator` 변수를 링크드 리스트의 `head`를 가리키게 한다.
- `iterator` 변수가 `None`이 아닐 때까지 (링크드 리스트의 처음부터 끝 노드까지) `iterator` 변수의 `data`를 `res_str` 변수에 추가해 준다. `iterator` 변수의 `next` 속성을 이용해서 while문을 돌때마다 다음 노드로 넘어간다.
- 링크드 리스트를 다 돈 후에 `res_str` 변수를 리턴한다.

#### 링크드 리스트 접근 연산

- 특정 위치에 있는 `Node`를 리턴하는 연산

#### 링크드 리스트 접근 시간 복잡도

- 인덱스 `x`에 있는 노드에 접근하려면 head에서 다음 노드로 `x`번 가면 됨
- 마지막 노드에 접근하려면 `head`에서 다음 노드로 `n-1`번 가야 됨
- 실행에 걸리는 시간이 n에 비례하기 때문에 최악의 경우 시간 복잡도는 O(n)이다.

#### 노드 뒤에 새로운 데이터 삽입

- 주어진 노드 뒤에 삽입하는 연산

```python
class LinkedList:
   def __init__(self):
      self.head = None
      self.tail = None

   def insert_after(self, previous_node, data):
      """링크드 리스트 주어진 노드 뒤 삽입 연산 메소드"""
      new_node = Node(data)
      # 가장 마지막 순서에 삽입할 때
      if previous_node is self.tail:
         self.tail.next = new_node # 새로운 노드를 self.tail 뒤에다가 저장하는 코드
         self.tail = new_node # 그 다음에 마지막 노드로 들어가게 된 new_node를 self.tail로 지정해준다.
      # 두 노드 사이에 새로운 노드 삽입
      else: # 마지막 순서가 아니므로 else
         new_node.next = previous_node.next # new_node의 다음 node가 previous_node의 다음 node가 되게끔 한 후에(그러니까 둘 다 같은 노드를 바라보게끔 한 다음에)
         previous_node.next = new_node # previous_node의 다음 node로 new_node를 설정해준다.
         # 이렇게 되면, previous_node, new_node, new_node.next의 순서로 node가 정렬된다.
```

#### 링크드 리스트 삭제

```python
class Linkedlist:
   def __init__(self):
      self.head = None
      self.tail = None

   def delete_after(self, previous_node):
      data = previous_node.next.data
      # tail node를 삭제해야 하는 경우
      if previous_node.next is self.tail:
         prevoius_node.next = None
      # 두 node 사이를 지울 경우
      else:
         previous_node.next = previous_node.next.next

      return data
```

#### 링크드 리스트 연산들의 시간 복잡도

##### 접근

[x]에 있는 데이터에 접근하려면, 링크드 리스트의 head 노드부터 x번 다음 노드를 찾아서 가야 한다. 원하는 노드에 접근하는 시간은 몇 번째 인덱스인지에 비례한다. 따라서, [1]은 head에서 한 번, [5]는 head에서 5번, .. 마지막 순서에 있는 노드에 접근해야 되는 최악의 경우엔 head에서 총 `n-1`번 다음 노드로 가야 한다. 걸리는 시간은 n에 비례하므로 접근 연산은 최악의 경우 O(n)의 시간 복잡도를 가진다.

##### 탐색

배열 탐색과 같다. 가장 앞 노드부터 다음 노드를 하나씩 보면서 원하는 데이터를 찾는다. 이를 선형 탐색이라고 했는데, 접근과 마찬가지로 링크드 리스트 안에 찾는 데이터가 없을 경우 또는 찾으려는 데이터가 마지막 노드에 있는 최악의 경우 n개의 노드 모두를 다 봐야 한다. 그러므로 탐색도 접근과 마찬가지로 최악의 경우 O(n)의 시간 복잡도를 갖는다.

##### 삽입/삭제

배열의 삽입/삭제와 조금 다르다. `insert_after`, `delete_after`을 보자.

```python
def insert_after(self, previous_node, data):
   new_node = Node(data) # 새 노드 만들기

   # tail 노드 뒤에 새로운 노드를 삽입할 때
   if previous_node == self.tail:
      previous_node.next = new_node
      self.tail = new_node
   # 두 노드 사이에 새로운 노드를 삽입할 때
   else:
      new_node.next = previous_node.next
      previous_node.next = new_node

def delete_after(self, previous_node):
   data = previous_node.next.data

   # 지우려는 노드가 tail 노드일 때
   if previous_node.next == self.tail:
      self.tail = previous_node
      self.tail.next = None
   # 두 노드 사이를 지움
   else:
      previous_node.next = previous_node.next.next

   return data
```

삽입, 삭제는 그냥 삽입, 삭제할 인덱스의 주변 노드들에 연결된 레퍼런스만 수정한다.

즉, 이 연산들이 실행되는데 걸리는 시간은 특정 값에 비례하지 않고 항상 일정하다. 따라서 O(1)의 시간 복잡도를 갖는다.

##### 시간 복잡도

| 연산 | 시간 복잡도 |
| ---- | ----------- |
| 접근 | O(n)        |
| 탐색 | O(n)        |
| 삽입 | O(1)        |
| 삭제 | O(1)        |

##### 현실적인 삽입/삭제 시간 복잡도

삽입과 삭제 연산들은 특정 노드를 넘겨줘서 이 노드 다음 순서에 데이터를 삽입하거나 삭제했다. 그럼 이 연산들에 넘겨주는 노드, 파라미터 `previous_node`를 먼저 찾아야 한다. head와 tail 노드는 항상 저장해주기 때문에 빨리 찾을 수 있는데, 나머지 노드들은 탐색이나 접근 연산을 통해 갖고 와야 한다.

그러므로, 현실적으로는 이렇게 된다.

| 연산                                | 시간 복잡도 |
| ----------------------------------- | ----------- |
| 접근                                | O(n)        |
| 탐색                                | O(n)        |
| 원하는 노드에 접근 또는 탐색 + 삽입 | O(n+1)      |
| 원하는 노드에 접근 또는 탐색 + 삭제 | O(n+1)      |

##### 삽입 삭제 연산 특수 경우 시간 복잡도

head, tail노드는 항상 한 번에 찾을 수 있었다. 접근 및 연산에 각각 O(1)만큼 걸린다. 그렇기 때문에 이 두 노드와 관련있는 삽입이나 삭제 연산은 O(1)로 할 수 있다.
`append`, `prepend`, `pop_left` 메소드를 살펴보면 head 노드와 tail 노드를 한 번에 가지고 와서 레퍼런스를 바꿔준다.

```python
def pop_left(self):
    """링크드 리스트의 가장 앞 노드를 삭제해주는 메소드, 단 링크드 리스트에 항상 노드가 있다고 가정한다"""
    data = self.head.data  # 삭제할 노드를 미리 저장해놓는다

    # 지우려는 데이터가 링크드 리스트의 마지막 남은 데이터일 때
    if self.head is self.tail:
        self.head = None
        self.tail = None
    else:
        self.head = self.head.next

    return data  # 삭제된 노드의 데이터를 리턴한다


def prepend(self, data):
    """링크드 리스트의 가장 앞에 데이터 삽입"""
    new_node = Node(data)  # 새로운 노드를 만든다

    # 링크드 리스트가 비었는지 확인
    if self.head is None:
        self.head = new_node
        self.tail = new_node
    else:
        new_node.next = self.head   # 새로운 노드의 다음 노드를 head 노드로 정해주고

    self.head = new_node   # 리스트의 head_node를 새롭게 삽입한 노드로 정해준다


def append(self, data):
    """파라미터로 받은 데이터를 갖는 노드를 생성한다"""
    new_node = Node(data)

    # 링크드 리스트가 비어 있으면 새로운 노드가 링크드 리스트의 처음이자 마지막 노드다
    if self.head == None:
        self.head = new_node
        self.tail = new_node
    # 링크드 리스트가 비어 있지 않으면
    else:
        self.tail.next = new_node  # 가장 마지막 노드 뒤에 새로운 노드를 추가하고
        self.tail = new_node  # 마지막 노드를 추가한 노드로 바꿔준다
```

링크드 리스트 안에 몇 개의 노드가 있든지 상관없이 항상 한 번에 받아와서 레퍼런스를 바꿔준다.

| 연산                  | 시간 복잡도 |
| --------------------- | ----------- |
| 가장 앞에 접근 + 삽입 | O(1+1)      |
| 가장 앞에 접근 + 삽입 | O(1+1)      |
| 가장 앞에 접근 + 삽입 | O(1+1)      |

양 끝에서 하는 삽입/연산들 중 유일하게 tail 노드를 삭제하는 경우는 빠졌다.

출처: [코드잇](https://codeit.kr)
