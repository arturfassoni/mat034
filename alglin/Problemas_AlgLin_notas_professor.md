# Problemas de Álgebra Linear – valores de referência e roteiro oral (uso do professor)

Valores calculados com NumPy/SciPy. Pequenas diferenças são esperadas conforme as escolhas de implementação.

## Problema 1 – PageRank

- PageRank com $\alpha = 0{,}85$: C 0,229 · A 0,220 · B 0,118 · E 0,117 · H 0,098 · G 0,094 · D 0,065 · F 0,058 (igual ao `nx.pagerank`).
- C recebe mais links (de A, B, D e E), mas A, com um único link de entrada, fica em 2º lugar porque recebe **todo** o PageRank de C. Ótimo ponto para a oral.
- $|\lambda_2(H)| \approx 0{,}722$ e $|\lambda_2(G)| \approx 0{,}6135 = 0{,}85 \times 0{,}722$. O método das potências converge em 46 iterações (tolerância $10^{-10}$), próximo de $\ln(10^{-10})/\ln(0{,}6135) \approx 47$.
- Iterações por $\alpha$: 0,5 → 22 · 0,7 → 33 · 0,85 → 46 · 0,9 → 53 · 0,95 → 60 · 0,99 → 68. Para $\alpha = 0{,}99$, A passa C. Com $\alpha \to 0$ todas as páginas tendem a $1/n$; com $\alpha \to 1$ a convergência fica lenta e o ranking fica sensível à estrutura (e à manipulação).
- Fazenda de links:
  - **Estratégia 1:** D sobe até o 3º lugar (com $k \geq 4$) e estaciona; parte do ganho "vaza" para C e G pelos links de D.
  - **Estratégia 2:** com uma única página falsa, D já fica em 1º (PageRank ≈ 0,21; com $k = 10$, ≈ 0,35). D e as páginas falsas formam um grupo fechado que só "perde" navegantes pelos saltos aleatórios ($1-\alpha$).

**Perguntas para a oral:** Por que o vetor do método das potências continua somando 1? O que aconteceria sem o termo $(1-\alpha)/n$? Por que a página F (sem links) não "some" com o navegante?

## Problema 2 – Placa

- Matriz de $N=3$: blocos tridiagonais $9 \times 9$, com 4 na diagonal e no máximo 4 entradas $-1$ por linha. A fração de não nulos é $\approx 5/N^2$ (1,2% para $N=20$; 0,14% para $N=60$).
- $T(0{,}5;\ 0{,}75)$ pela série ≈ 54,0529. Erros: $N=3$ → 1,37 · 7 → 0,445 · 15 → 0,120 · 31 → 0,031 · 63 → 0,0077. Ordem 2 (o erro cai cerca de 4 vezes a cada vez que $h$ cai pela metade).
- Centro = 25 °C exatamente: somando as 4 rotações do problema, a borda inteira fica a 100 °C, logo a soma é $T \equiv 100$; no centro, as 4 rotações têm o mesmo valor. O argumento vale também para o problema discreto com $N$ ímpar.
- Tempos (máquina de referência): densa $N=60$ ≈ 0,8 s; esparsa $N=60$ ≈ 0,006 s. A matriz densa com $N=200$ teria $40\,000^2 = 1{,}6 \times 10^9$ entradas, cerca de 12,8 GB: não cabe no Colab.
- Jacobi (tolerância $10^{-6}$): $N=10$ → 347 iterações · 20 → 1160 · 40 → 3978. $\rho(J)$ para $N=10$: 0,95949 = $\cos(\pi/11)$. Como $\cos(\pi/(N+1)) \approx 1 - \frac{\pi^2}{2(N+1)^2}$, o número de iterações cresce como $N^2$.
- Projeto: borda direita a ≈ **53,7 °C** (combinação de duas soluções: $T = 100\,u_{topo} + T_d\,u_{dir}$, com $u_{topo} \approx 0{,}068$ e $u_{dir} \approx 0{,}432$ no ponto).

**Perguntas para a oral:** Por que a matriz é simétrica? Por que o critério de parada do Jacobi (mudança $< 10^{-6}$) não garante erro $< 10^{-6}$? O que muda se a placa for retangular?

## Problema 3 – Órbita

- Dados gerados a partir de: $a = 3$ UA, $e = 0{,}6$, $\omega = 40°$, arco de 240° de anomalia verdadeira, ruído $\sigma = 0{,}03$ UA.
- Cônica geral: $\mathbf{c} \approx [0{,}2160;\ -0{,}0889;\ 0{,}2409;\ 0{,}4748;\ 0{,}4041]$; centro $\approx (-1{,}322;\ -1{,}083)$; $a \approx 2{,}900$, $b \approx 2{,}363$, $e \approx 0{,}580$; um dos focos fica em $\approx (0{,}018;\ -0{,}067)$, perto do Sol. Periélio ≈ 1,22 UA, afélio ≈ 4,58 UA, período ≈ 4,94 anos.
- $\kappa(M) \approx 8{,}2$ e $\kappa(M^TM) \approx 66{,}6 = \kappa(M)^2$.
- Modelo focal: $p \approx 1{,}909$, $e \approx 0{,}603$, $\omega \approx 40{,}6°$, $a \approx 2{,}999$, período ≈ 5,19 anos (bem mais próximo dos valores verdadeiros).
- Monte Carlo (mediana de $a$, faixa de 10% a 90%):

  | Arco | Cônica geral | Modelo focal |
  |---|---|---|
  | 300° | 3,00 [2,98–3,03] | 3,00 [2,98–3,03] |
  | 180° | 3,29 [2,4–6,4] | 2,98 [2,78–3,21] |
  | 90° | falha (≈ 78% dos ajustes não são elipses) | 2,3 [1,8–3,7] |
  | 45° | falha | 0,9 [0,8–1,2] |

**Perguntas para a oral:** Por que o eixo maior corresponde ao **menor** autovalor de $Q$? Por que o modelo focal tem só 3 parâmetros? Por que mesmo o modelo focal falha com 45° de arco?

## Problema 4 – Tartarugas

- $\lambda \approx 0{,}9450$ (declínio de cerca de 5,5% ao ano), confirmado pela simulação ($N_{k+1}/N_k \to 0{,}9450$).
- Distribuição estável (soma 1): [0,207; 0,670; 0,115; 0,0066; 0,0004; 0,0003; 0,0018].
- Valor reprodutivo ($v_1 = 1$): [1; 1,4; 6,0; 116; 569; 507; 588].
- Elasticidades: maiores em $a_{77}$ (0,23), $a_{22}$ (0,18), $a_{44}$ (0,14) e $a_{33}$ (0,12). Somas: fecundidades 0,051 · permanências 0,667 · transições 0,282.
- Sensibilidade de $a_{32}$: ≈ 0,9917, tanto pela fórmula quanto por diferenças finitas.
- Ovos com 100% de sobrevivência: $\lambda \approx 0{,}965$, que **não** basta.
- Aumento de sobrevivência necessário para $\lambda = 1$: estágio 2 → +20,0% · estágio 3 → +27,4% (máximo possível: +48%) · estágio 4 → +24,4% · estágio 7 → +17,0%. Estágios 1, 5 e 6 são impossíveis. Fecundidade: seria preciso multiplicá-la por ≈ 2,73.

**Perguntas para a oral:** Por que a soma das elasticidades é 1? Por que a distribuição estável tem tão poucos adultos? Se a população fosse aumentada em 50% em todos os estágios, $\lambda$ mudaria?
