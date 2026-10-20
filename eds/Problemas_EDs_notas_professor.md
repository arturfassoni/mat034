# Problemas de EDs – valores de referência e roteiro oral (uso do professor)

Valores calculados com `odeint`/`brentq`. Pequenas diferenças são esperadas conforme o método e a malha usados.

## Problema 1 – RK4

- Item 2: se $f = f(t)$, então $k_2 = k_3 = f(t_n + h/2)$ e $y_{n+1} = y_n + \frac{h}{6}\left(f(t_n) + 4f(t_n + h/2) + f(t_{n+1})\right)$, que é a regra de Simpson.
- Item 3: inclinações ≈ 1 (Euler), 2 (Heun) e 4 (RK4). Erros em $t=5$ ($e^5 \approx 148{,}4$):

  | N | Heun | RK4 |
  |---|---|---|
  | 100 | 0,30 | 3,7e-5 |
  | 200 | 0,076 | 2,4e-6 |
  | 1000 | 0,0031 | 3,8e-9 |

- Item 4: erro de $10^{-6}$ exige cerca de 250 passos de RK4 (≈ 1000 avaliações). Heun precisaria de cerca de 55 000 passos (≈ 110 000 avaliações) e Euler, muito mais.
- Item 5: com $h=0{,}01$ por 10 anos, Euler tem variação relativa de energia ≈ 67% e termina com raio ≈ 2,4 UA (a órbita "foge" em espiral). RK4: ≈ 1,7e-6. Como a variação de Euler cai só linearmente com $h$, ele precisaria de passos da ordem de $10^{-7}$ para chegar perto do RK4.
- Item 6: órbita circular de raio 1 com $v = 2\pi$ → período de 1 ano; Kepler: $T^2 = a^3$ (com $G m_S = 4\pi^2$).

**Perguntas para a oral:** Por que o RK4 usa pesos 1, 2, 2, 1? Por que a energia de Euler cresce (e não decresce)? O que muda na sua função para aceitar sistemas?

## Problema 2 – SIR

- $\mathcal{R}_0 = 3{,}5$. Pico ≈ 357 infectados no dia ≈ 31,8; $S$ no pico ≈ 285,7 = $N/\mathcal{R}_0$.
- Tamanho final: $1 - s_\infty \approx 96{,}6\%$ (equação e simulação coincidem).
- Atenção: $s = 1$ é sempre raiz da equação do tamanho final. Para $\mathcal{R}_0 > 1$ é preciso escolher um intervalo que exclua $s = 1$ (ex.: $[10^{-9}, 0{,}999]$). Para $\mathcal{R}_0 < 1$ só existe a raiz $s = 1$: não há epidemia. **Ótimo ponto para a oral.**
- Vacinação: $p \approx 40{,}6\%$ mantém o pico em 100. Imunidade de rebanho: $p_c = 1 - 1/3{,}5 \approx 71{,}4\%$.
- Discussão esperada: $p$ do item 5 só "achata a curva" (protege o sistema de saúde, mas ainda há muitos infectados); $p_c$ impede que a epidemia cresça.

**Perguntas para a oral:** Por que a raiz trivial $s=1$ aparece? O que acontece com o pico se $\gamma$ dobrar? Por que `pico(p)` é uma função "cara" de avaliar?

## Problema 3 – Lorenz

- $\rho = 0{,}5$: converge para a origem. $\rho = 10$: converge para $C_+ = (4{,}899;\ 4{,}899;\ 9)$ a partir de `[1,1,1]`. $\rho = 28$: não converge (atrator caótico, a trajetória alterna em torno de $C_\pm$).
- Distância entre A e B: ultrapassa 1 por volta de $t \approx 19{,}3$ e depois satura no tamanho do atrator.
- Expoente de Lyapunov: o valor da literatura é ≈ 0,906; o ajuste com uma só perturbação dá algo entre 0,5 e 0,9, dependendo da janela. Previsão útil: $t \approx \ln(1/\delta)/\lambda$, de modo que reduzir o erro de $10^{-5}$ para $10^{-10}$ apenas **dobra** o horizonte de previsão.
- Item 5: mudar só a tolerância já faz as soluções se separarem perto de $t \approx 19$. O que continua confiável é a forma do atrator e as estatísticas da solução, não a trajetória individual.

**Perguntas para a oral:** Por que a distância satura? Por que dobrar a precisão não dobra o horizonte? Para qual equilíbrio a solução converge com `u0 = [-1,-1,1]` e $\rho=10$?

## Problema 4 – Amortecimento não linear

- $b|y'|y'$ mantém a força sempre oposta ao movimento; $b(y')^2$ teria sempre o mesmo sinal.
- $\frac{dE}{dt} = y'(my'' + ky) = -b|y'|^3 \le 0$.
- Picos de 0 a 60 s:
  - não linear: inclinação ≈ −1 no log-log → amplitude $\propto 1/t$ (o produto amplitude × $t$ tende a ≈ 1,45);
  - linear: inclinação ≈ −0,5 no semilog → amplitude $\propto e^{-ct/2m} = e^{-0{,}5t}$ (o ajuste numérico dá ≈ −0,46, porque os picos finais ficam muito pequenos).
- As forças são iguais quando $c|y'| = b(y')^2$, ou seja, $|y'| = c/b = 2$. Abaixo dessa velocidade, o amortecimento linear é mais forte; acima, o não linear.

**Perguntas para a oral:** Por que a amplitude decai como $1/t$ (pense em $dE/dt \propto -E^{3/2}$)? A energia numérica pode aumentar em algum momento? O que acontece com $b \to 0$?
