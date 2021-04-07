# 운영체제 - 컴퓨터 시스템 오버뷰

컴퓨터를 들여다보면, 많은 하드웨어들이 있다. CPU, GPU, HDD/SSD, 랜선 등 네트워크 장치들도 있다. 이것들을 효율적으로 활용할 수 있게 도와주는 운영체제, 즉 operating system이 필요하다. OS가 뭔지 간단하게 정의를 내려보면..

<img width="1116" alt="스크린샷 2021-04-07 오전 10 20 08" src="https://user-images.githubusercontent.com/61453718/113796722-e0ef6b00-978a-11eb-9520-6e4a362fa118.png">

```
1. 하드웨어를 효율적으로 관리하고, 이를 토대로
2. 사용자, 응용프로그램 등에게 서비스를 제공하는 역할을 하는 것. 그런 소프트웨어
```

이라고 내릴 수 있겠다. 좀 더 추상화된 정의가 되어갈 수 있지만 일단 이정도로 생각하면 될 것 같다.

컴퓨터 하드웨어는 크게 세 가지로 나눌 수 있다.

![스크린샷 2021-04-07 오전 10 15 45](https://user-images.githubusercontent.com/61453718/113796463-3c6d2900-978a-11eb-9099-c81da27af552.png)

# 프로세서

- 쉽게 말하면, 계산하는 장치이다.
  ex) CPU, 그래픽카드(GPU), 응용 전용 처리장치(특별한 목적을 위해 개발된 계산장치) 등

# 메모리

- 쉽게 말하면, 무언가를 저장하는 장치이다.
  ex) DRAM, Disk 등

# 주변장치

- 키보드 / 마우스 등 입력장치
- 모니터 / 프린터 등 출력장치
- 네트워크 모뎀 등

이제 각각에 대해 알아보자.

## 1. 프로세서 (Processor)

- 컴퓨터의 두뇌 (중앙처리장치)
  - 연산을 수행하고
  - 컴퓨터의 모든 장치의 동작을 제어한다.

<img width="678" alt="스크린샷 2021-04-07 오전 9 47 35" src="https://user-images.githubusercontent.com/61453718/113794777-4a20af80-9786-11eb-9d74-1d7252191500.png">

장치 안을 보면 연산장치와 제어장치가 있는데, 그 외에 '레지스터'도 있다.

### 레지스터 (Register)

- **프로세서 내부**에 있는 메모리.

  - 프로세서가 사용할 데이터를 저장하고,
  - 컴퓨터에서 가장 빠른 메모리이다.

- 레지스터의 종류
  - 용도에 따른 분류
    - 전용(정해진 용도로 쓰는)레지스터, 범용(일반적인 목적의) 레지스터
  - 사용자가 정보를 변경할 수 있는가?에 따른 분류
    - 가능한 것이 사용자 가시 레지스터, 불가한 것은 사용자 불가시 레지스터
  - 저장하는 정보에 따른 분류
    - 데이터 레지스터, 주소 레지스터, 상태 레지스터

<img width="777" alt="스크린샷 2021-04-07 오전 9 45 54" src="https://user-images.githubusercontent.com/61453718/113794678-0ded4f00-9786-11eb-8181-5dce8e758b89.png">

사용자 가시 레지스터인데, 이 중에서

- 데이터 레지스터는 데이터를,
- 주소 레지스터는 주소를 저장하는 레지스터이다.
  이 정도만 알아둬도 문제 없을 듯.

<img width="784" alt="스크린샷 2021-04-07 오전 9 46 53" src="https://user-images.githubusercontent.com/61453718/113794731-31b09500-9786-11eb-996a-a092d1d12825.png">

반면에 사용자가 볼 수 없는, 불가시 레지스터들은 이에 해당한다.

### 프로그램 카운터

- 우리가 이 다음에 실행할 명령어의 위치가 어딘지를 가리키고 있는 레지스터이다. (주소를 갖고 있음)

### 명령어 레지스터

우리가 수행한 PC를 통해서 가져온 명령어가 들어가는 레지스터이다.

### 누산기

데이터를 일시적으로 저장하는 레지스터이다.

<img width="538" alt="스크린샷 2021-04-07 오전 9 49 04" src="https://user-images.githubusercontent.com/61453718/113794871-7f2d0200-9786-11eb-92ca-647a511b2a69.png">

계산하는 ALU 연산장치가 있고, 실제로 연산시엔 옆에 PC, MAR와 같은 다양한 레지스터들을 통해 연산이 이뤄진다.

### 운영체제와 프로세서의 관계?

- 운영체제는 프로세스에게 처리할 작업을 할당하고 관리한다.

  - 프로세스(Process = Program) 생성 및 관리

- 프로그램의 프로세서 사용 제어
  - 프로그램의 프로세서 사용 시간 관리.
  - 여러 개의 프로그램이 하나의 프로세서를 사용하려고 할 때 이를 제어하는 역할도 한다.

## 2. 메모리(Memory)

- 쉽게 말하면, **데이터를 저장하는 장치**이다. (기억장치)
  - 프로그램(OS, 사용자 SW 등), 사용자 데이터 등

<img width="850" alt="스크린샷 2021-04-07 오전 8 31 25" src="https://user-images.githubusercontent.com/61453718/113790159-a6ca9d00-977b-11eb-9425-648e875f1420.png">

메모리의 종류는 크게 네 가지로 구분이 된다. 이는 **레지스터**, **캐시**, **메인 메모리**, **보조기억장치**이다.

1. 레지스터: 이미 봄

2. 캐시: CPU 안에 있는 것인데, 레지스터보다 코어에서 멀리 떨어져 있다.

3. 메인 메모리: DRAM이 들어간다.

4. 보조기억장치: 하드디스크 등이 들어간다.

4에서 1로 갈수록 속도가 빨라지고, 빨라지니까 비싸고, 비싸지므로 용량은 작아진다. 반면에 1에서 4로 내려갈수록 속도는 느려지고, 느려지니까 싸고, 싸니까 용량이 커진다.

굳이 계층을 둔 이유는: 레지스터를 1테라를 쓰면 되겠으나, 이는 현실적으로 불가능하고, 최소의 비용으로 최고의 성능을 내기 위해 조합을 하다가 이러한 계층 관계가 생기게 되었다.

### 메모리의 종류: 2-1. 주기억장치 (Main memory)

- 우리가 흔히 말하는 메모리이다. DRAM.
- 프로세서가 수행할 프로그램과 데이터를 저장한다.
- DRAM을 주로 사용하는데, 이는
  - 용량이 크고 가격이 저렴하기 때문
- **디스크 입출력 병목현상(I/O bottlenectk)**을 해소한다.

<img width="821" alt="스크린샷 2021-04-07 오전 8 36 03" src="https://user-images.githubusercontent.com/61453718/113790418-4b4cdf00-977c-11eb-845d-8028ddfa6dc3.png">

> 디스크에서 바로 가져다 쓰지 않고, 메인 메모리를 거쳐서 사용하는 이유는 뭘까? 이는 하드웨어적인 관점에서 봐야 한다. 컴퓨터가 최초에 탄생을 하고, 디스크와 CPU의 속도 차이를 보면, 디스크는 속도가 천천히 빨라졌으나 CPU는 빠르게 발전했다. 어느 시점 이후부터 갭이 생기게 되었고, CPU는 빠른데 메모리가 느려서 문제가 되는 상황이 발생함. 그래서 이를 해결하기 위해 **디스크보다는 용량이 작으나, 접근 속도는 빠른 무언가**를 놓자고 얘기하게 되었고, CPU가 일을 하는 동안 그 사이에 필요한 데이터를 미리 가져다 놓음으로써 CPU가, 실제로 그 다음 데이터가 필요할 때 메모리로부터 가져감으로써 속도의 gap을 메울 수 있다. 그래서 메인 메모리를 거치는 것이다.

### 2-2. 캐시 (Cache)

- 프로세서 내부에 있는 메모리이다. (L1, L2 캐시 등)
  - 속도가 빠르지만 가격이 비싸다.

<img width="858" alt="스크린샷 2021-04-07 오전 8 40 34" src="https://user-images.githubusercontent.com/61453718/113790720-ee9df400-977c-11eb-8e91-e134db51c69f.png">

상기했듯 레지스터가 코어에 훨씬 더 가까이 있기 때문에 더 빠르고, 반면에 더 멀리 있는 캐시는 사이즈는 커지고 속도는 느려진다. 그럼 얘는 왜 있어야 할까?

    * 메인 메모리를 넣으믕로써 간격을 메꿨는데, 그래도 간격이 커서 성능 차이가 많이 났다. 그래서 또 비슷한 방법을 선택한 것이다.
    * 메인 메모리보다 더 빠른 것을 넣으면 어떨까? 라고 생각해서 갭을 더 완화하기 위해 들어간 것이다.

    -> 즉, 메인 메모리의 입출력 병목현상을 해소하기 위한 것.

<img width="317" alt="스크린샷 2021-04-07 오전 8 43 45" src="https://user-images.githubusercontent.com/61453718/113790894-60763d80-977d-11eb-93a1-ad33177dd768.png">

CPU-Z를 통해 캐시를 확인할 수 있다.

```
L1: 4 * 32KB = 128KB
```

이 조그마한 크기로 병목 현상을 제어할 수 있을까? 가능하다.

#### 캐시의 동작

- 일반적으로 하드웨어적으로 관리가 된다. 어떻게 관리를 할까?

<img width="384" alt="스크린샷 2021-04-07 오전 10 18 27" src="https://user-images.githubusercontent.com/61453718/113796639-ac7baf00-978a-11eb-941d-5429667f0d3e.png">

프로세서가 일을 하다보면 데이터가 필요할 것이다. 아래쪽 진한 색의 데이터가 필요하다고 할 경우.

1. 캐시가 없을 경우엔: 프로세서가 바로 메인 메모리에 가서 읽는다.

2. 캐시가 있을 경우: 먼저 캐시에 가서, 이 데이터가 있는지 확인하고 있으면, 이를 **캐시 히트(Cache hit)**라고 한다. 이제 메인 메모리에 갈 시간을 절약할 수 있다. 이로 인해 이득이 생긴다.

3. 캐시가 있는데 캐시에서 이 데이터를 갖고 있지 않으면 캐시가 메인 메모리에 가서 진한 색의 데이터를 캐시 안으로 갖고 들어온다. 그 다음에 가져온 데이터를 프로세서에게 전달한다. 이를 **캐시 미스(Cache miss)**라고 한다. 이게 없다면 오히려 손해이다. 한 번에 갔다 오면 되는데, 캐시를 통해 다시한번 왔다갔다 하는 것이기 때문에 비효율적인 것으로 보인다.

**128KB**로 캐시 히트를 통해 효과를 볼 수 있을까? 이게 가능한 이유는..

#### 지역성 (Locality)

1. 공간적 지역성 (Spatial locality)

   - 참조한 주소와 인접한 주소를 참조하는 특성
     - ex) 순차적 프로그램 수행.

2. 시간적 지역성 (Temporal locality)
   - 한 번 참조한 주소를 곧 다시 참조하는 특성
     - ex) For문 등의 순환문: i가 1일 때 참조했으면 i가 2일 때도 참조함

- 캐시는 공간적, 시간적 지역성을 모두 갖고 있다. **지역성은 캐시 적중률(cache hit ratio)**과 밀접함. 따라서 128KB와 같은 작은 메모리로도 병목 현상을 해소시켜줄 수 있다.
  - 알고리즘 성능 향상을 위한 중요한 요소 중 하나이다.

#### 그럼, 이게 왜 우리에게 중요할까?

```java
for (i=0; i<=n; i++) {
    for (j=0; j<m; j++) {
        x = x + (a[i][j]); // A
        // or
        x = x + (a[j][i]); // B
    }
}
```

A와 B 중에 무엇을 선택할까? 우선 이를 판단하기 전에, 캐시가 메인 메모리에서 위 그림에서 **진한 색**만 가져오는 건 아니고, 몇 개의 블록을 함께 가져와서 캐시의 일부분을 채워준다. 이 크기를 우리는 **cache line(block)**의 크기라고 한다. 이렇게 해야 공간적 지역성이 말이 된다.

<img width="510" alt="스크린샷 2021-04-07 오전 9 52 05" src="https://user-images.githubusercontent.com/61453718/113795074-fa8eb380-9786-11eb-9f4d-2d0aed6537f4.png">

1. B
   `A[0][0]`, `A[1][0]`, ..., 이렇게 읽어갈텐데 해당 부분(`...`)은 현재 캐시에 없다. 그러므로 캐시 미스이다. 그리하여, 해당 부분을 메모리에서 가져와서 프로세서에 전달한다.
   그 다음은, `A[2][0]`, ... 이렇게 읽어갈텐데 이 역시 캐시에 없으므로 메인 메모리에서 가져와서 프로세서에 전달한다.
   이렇게 하면 .. 계속 미스가 난다. 이 경우는 차라리 캐시가 없는 게 낫다.

2. A
   처음에 `A[0][0]`은 마찬가지로 미스가 날 것이고, 그에 따라 캐시에 `A[0][0]`을 올려 둘 것이다. 이 과정을 반복하여 `A[0][15]`까지 올려 둔다.
   이후에 `A[0][1]`을 읽을 것인데, 이는 캐시에 현재 존재하므로 캐시 히트가 발생한다. `A[0][2]` 또한 있다. 이런 식으로 총 15회의 히트가 난다. 그 이후로 `A[0][16]`으로 넘어갈 때 미스가 난다.
   즉, **15번동안 메인 메모리까지 가는 시간을 줄였고, 그만큼 성능이 향상**될 수 있다는 것을 볼 수 있다.

캐시를 이해하면 우리의 프로그램을 더 효율적으로 짤 수 있으므로, 중요하다.

### 2-3. 보조기억 장치 (Auxiliary memory / secondary memory / storage)

- CD/DVD, SD카드 정도가 있다.
- 프로그램과 데이터를 저장한다.
- 프로세스가 직접 접근할 수 없다. (주변장치)
  - 주기억장치를 거쳐서 접근한다.
  - 실행하려는 프로그램이 20GB이고, 메모리가 8GB일 때, 이를 어떻게 실행하는가?
    - 가상 메모리(Virtual memory): 하드디스크의 일부를 메모리처럼 사용. 이를 통해 메모리보다 더 큰 프로그램을 올려서 사용할 수 있다.
- 용량이 크고, 가격이 매우 저렴하다.

### 메모리와 운영체제

- 메모리의 할당 및 관리

  - 프로그램의 요청에 따른 메모리 할당 및 회수
  - 할당된 메모리 관리
  - 이후에 함

- 가상 메모리 관리

  - 가상 메모리 생성 및 관리
  - 논리 주소를 -> 물리 주소로 변환
  - 이후에 함

### 시스템 버스 (System Bus)

- 리소스들이 서로 같이 일을 하려면, 대화를 나눠야 한다. 즉 통신이 필요한데, 이 통신을 하는 통로이다. 데이터 및 신호를 주고받는다.

<img width="323" alt="스크린샷 2021-04-07 오전 9 32 29" src="https://user-images.githubusercontent.com/61453718/113793838-2d837800-9784-11eb-9f35-b23bfeb130da.png">

1. 데이터 버스: 프로세서와 메인 메모리, 주변장치 사이에서 데이터를 전송한다. 데이터 버스를 구성하는 배선 수는 프로세서가 한 번에 전송할 수 있는 비트 수를 결정하는데, 이를 워드라고 한다.

2. 주소 버스: 프로세서가 시스템의 구성 요소를 식별하는 주소 정보를 전송한다. 주소 버스를 구성하는 배선 수는 프로세서와 접속할 수 있는 메인 메모리의 최대 용량을 결정한다.

3. 제어 버스: 프로세서가 시스템의 구성 요소를 제어하는 데 사용한다. 제어 신호로 연산장치의 연산 종류와 메인 메모리의 읽기나 쓰기 동작을 결정한다.

<img width="598" alt="스크린샷 2021-04-07 오전 9 35 43" src="https://user-images.githubusercontent.com/61453718/113794041-a1be1b80-9784-11eb-92ff-bee9e94dd2de.png">

PC가 특정 주소를 가리키고 있고, 이를 읽어야 한다고 할 때, MAR(Memory Address Register)에 넣어주면 주소는 주소 버스로 전달이 되고, 이 주소 버스를 통해 메모리에게 어느 주소를 읽어야 하는 지를 알려준다. 동시에 제어 장치가 제어 신호를 발생시키고, 이 제어 신호가 메모리에게 특정 부분을 읽어달라고 말을 함으로써 주소 내 명령어가 읽어지면서 데이터 버스를 타게 된다. 데이터 버스를 타다가 MBR(Memory Buffer Register)에서 내려서 프로세서 안으로 들어가게 된다. 이게 실제 IR(Instruction Register)로 들어가서, 다음에 수행할 명령어가 최종적으로 저장되게 된다. ex) `A = B + C`

이제 B와 C에 대한 과정이 또 반복적으로 이뤄질 것이다. ~~~

## 3. 주변 장치

- 프로세서와 메모리를 제외한 하드웨어들. 실제로 뭔가를 계산할 때 꼭 필요한 건 아닌 것들이라고 생각하면 된다.

  - 입력장치: 터치 인터페이스, 마우스 키보드 등
  - 출력장치: 스피커, 프린터, 모니터 등
  - 저장장치: 보조기억장치들

### 주변 장치와 운영체제

1. 장치드라이버 관리

   - 어떤 하드웨어를 사용하기 위한 인터페이스 제공

2. 인터럽트 (Interrupt) 처리

   - 주변 장치의 요청 처리
   - 이후에 함

3. 파일 및 디스크 관리

   - 파일 생성 및 삭제
   - 디스크 공간 관리 등
   - 이후에 함