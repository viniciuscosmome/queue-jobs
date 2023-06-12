# Queue JOBS

### Meu objetivo
* Estudar filas de trabalho (Queue Jobs)
* Estudar desenvolvimento guiado por testes (TDD)
* Estudar banco de dados *NoSQL* chave-valor

### Fucionalidades
- [x] Executar trabalhos em paralelo (worker_threads):
  * Criar um arquivo que será utilizado para executar os trabalhos lentos;
- [ ] Controlar filas:
  * Inicializar as configurações das filas, essas configurações terão um valor padrão, mas podem ser modificadas pelo usuário;
  * Armazenar os trabalhos que serão executados em algum lugar;
  * Permitir tentar executar novamente os trabalhos que derem erros;
- [ ] Armazenar fila em um banco de dados (chave-valor):
  * Armazenar as informações necessárias para a execução do trabalho;
