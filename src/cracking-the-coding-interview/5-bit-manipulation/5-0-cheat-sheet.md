# Bit Manipulation Cheat Sheet

- [Bit Manipulation Cheat Sheet](#bit-manipulation-cheat-sheet)
    - [Rules](#rules)
    - [Recipes](#recipes)
    - [Arithmetic (`>>`) vs Logical (`>>>`) Shifts](#arithmetic-vs-logical-shifts)

## Rules

| XOR (`^`)        | AND (`&`)          | OR (`\|`)           |
| ---------------- | ------------------ | ------------------- |
| `x ^ 0000 == x`  | `x & 0000 == 0000` | `x \| 0000 == x`    |
| `x ^ 1111 == ~x` | `x & 1111 == 1111` | `x \| 1111 == 1111` |
| `x ^ x == 0`     | `x & x == x`       | `x \| x == x`       |

## Recipes

| Task                                                   | Recipe                                                         |
| -----------------------------------------------------: | :------------------------------------------------------------- |
| Number with all bits set to `1`                        | `~0`                                                           |
| Number with `n` LOW bits set to `0` and rest to `1`    | `~0 << n`                                                      |
| Number with `n` LOW bits set to `1` and rest to `0`    | `(1 << n) - 1`                                                 |
| Get bit in position `i`                                | `x & (1 << i)`                                                 |
| Set bit in position `i` to `1`                         | `x = x | (1 << i)`                                             |
| Clear bit in position `i` to `0`                       | `x = x & ~(1 << i)`                                            |
| Negate bit in position `i`                             | `x = x ^ (1 << i)`                                             |
| Count all set bits `1` in `x`                          | `let c = 0; for (n = x; n !== 0; n = n >>> 1) c += (n & 1); c` |

## Arithmetic (`>>`) vs Logical (`>>>`) Shifts

Arithmetic shift preserves the sign.

* `1111 >> 1 == 1111`
* `1010 >> 1 == 1101`
* `0010 >> 1 == 0001`

Logical shift overrides the highest bit (thus affecting the sign of the result).

* `1111 >>> 1 == 0111`
* `1010 >>> 1 == 0101`
* `0010 >>> 1 == 0001`
