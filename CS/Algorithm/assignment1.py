a = int(input())
b = list(map(int, input().split()))
b_max = max(b)
b_min = min(b)
if 2 <= a <= 100000:
    for i in range(0, a):
        for j in range(i, len(b)):
            if b[i] == b_min:
                b = b[i:]
            b_max = max(b)
            benefit = b_max - b_min
if benefit > 0:
    print(benefit)
    print(b_min, b_max)
else:
    print(-1)