# Rate Limiter Algorithms

# 1. Fixed Window

Rule: - Limit = 5 requests - Window = 60 sec

Window fixed hoti hai.

    10:00:00 -------- 10:00:59

Request flow:

    Req1 -> Count=1 ✅
    Req2 -> Count=2 ✅
    Req3 -> Count=3 ✅
    Req4 -> Count=4 ✅
    Req5 -> Count=5 ✅
    Req6 -> Count=6 ❌

60 sec baad Redis key expire ho jati hai aur counter 0 se start.

Redis: - Key: rate:user123 - Value: count - TTL: 60 sec

Problem:

    10:00:59 -> 5 requests
    10:01:00 -> 5 requests

2 sec me 10 requests allow.

------------------------------------------------------------------------

# 2. Sliding Window

Rule: - Limit = 3 requests - Window = 10 sec

Current Time = 20

Stored timestamps:

    8
    12
    15

Window nikalo:

    20 - 10 = 10

Sirf last 10 sec dekho.

Delete:

    8  ❌
    12 ✅
    15 ✅

Count = 2

Nayi request:

    12
    15
    20

Count = 3

✅ Allow

Ab agar isi waqt ek aur request aaye:

    12
    15
    20

Count already 3 hai.

Nayi request -\> Count 4

❌ Reject

Sliding naam isliye kyunki:

    20 -> Window 10-20
    21 -> Window 11-21
    22 -> Window 12-22

Window move karti rehti hai.

Redis: - Har request ka timestamp store hota hai. - Generally Sorted Set
(ZSET).

------------------------------------------------------------------------

# 3. Token Bucket

Socho bucket me 5 tokens hain.

    ● ● ● ● ●

1 request = 1 token.

5 request ke baad:

    Empty

6th request:

❌ Reject

Refill:

Capacity = 5

Refill = 1 token every 10 sec

    0 sec  -> ●●●●●
    Use all

    10 sec -> ●
    20 sec -> ●●
    30 sec -> ●●●

Redis me: - Tokens remaining - Last refill time

Algorithm: 1. Current time lo. 2. Refill calculate karo. 3. Capacity se
jyada token mat hone do. 4. Token hai to consume karo. 5. Nahi hai to
429.

------------------------------------------------------------------------

# Comparison

  Algorithm        Memory   Accuracy   Burst
  ---------------- -------- ---------- ---------
  Fixed Window     Low      Low        No
  Sliding Window   High     High       Limited
  Token Bucket     Low      High       Yes
