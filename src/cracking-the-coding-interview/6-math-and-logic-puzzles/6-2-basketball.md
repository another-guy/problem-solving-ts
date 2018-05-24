# Basketball Game

Let $p$ is the probability of a single successful throw.

Therefore, to win in a two-out-of-three-throws game, one of the following outcomes must happen:

* hit+hit+hit $P_{allThree} = p*p*p = p^3$ ;
* hit+hit+miss OR hit+miss+hit OR miss+hit+hit $P_{twoOnly} = 3 * [p * p * (1-p)] = 3 p^2 (1-p)$ .

The likelyhood of the win in such game is $p^3 + 3p^2(1-p)$

In order for two-out-of-three-throws to be more appealing, the following inequality must be solved:

| . | . |
|:--:|:--:|
| $p^3 + 3p^2(1-p) > p$ | divide by $p$ |
| $p^2 + 3p(1-p) > 1$ | |
| $p^2 +3p - 3p^2 - 1 > 0$ | |
| $-2p^2 + 3p - 1 > 0$ | multiply by $-1$ |
| $2p^2 - 3p + 1 < 0$ | |
| $(p - 1)(p - \frac{1}{2}) < 0$ | |

From the graph below it's clear that the inequation holds for range of $0.5 < p < 1$:

[![graph][1]][1]

  [1]: https://i.imgur.com/sl1XcnN.png