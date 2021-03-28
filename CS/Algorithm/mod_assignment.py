def exp(x, n):
    # n은 0 이상 정수
    if n == 0:
        return 1
    else:
        return x * exp(x, n - 1)


M, e, n, d = map(int, input().split())


def mod(w, x, y):
    if x == 1:
        return w % y
    elif x % 2 == 0:
        return exp(exp(w, x / 2) % y, 2) % y
    else:
        return w * (exp(w, x - 1) % y) % y


# def mod2(C, d, n):
#     if d == 1:
#         return C % n
#     elif d % 2 == 0:
#         return exp(exp(C, d / 2) % n, 2) % n
#     else:
#         return C * (exp(C, d - 1) % n) % n

print(mod(M, e, n))
print(mod(mod(M, e, n), d, n))
