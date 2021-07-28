# VivaForms

**Escola Politécnica da Universidade de São Paulo<br/>
PCS3434 - Laboratório de Engenharia de Software<br/>
PCS3443 - Laboratório de Redes de Computadores**

**Grupo 6:**

**10337425** Gabriel Marton Desiderá <br/>
**10769789** Juliana Marques da Cruz <br/>
**10773120** Leonardo Cazarine de Araujo <br/>
**10774329** Miguel Nunes Ferreira <br/>
**10774159** Otávio Henrique Monteiro

## Links Úteis

[Vídeo Explicativo](https://www.youtube.com/watch?v=QCry0VASrbw)

[Ambiente em Produção](https://projeto-labs-eng-soft-redes.vercel.app/) (Funcionalide de leitura QrCode desabilitado)

<br/>

## Instalação do Ambiente

### Visão Geral
Para iniciar o desenvolvimento da aplicação é necessário ter instalado os softwares Git, um editor de texto como VSCode, a linguagem Python e Node. Ter uma conta no Github também é recomendada. Para execução do backend também é necessário ter instalado o pipenv, um gerenciador de dependências do Python.

### Obtendo o Código
Tendo instalado o ambiente de desenvolvimento especificado na Visão Geral podemos realizar os seguinte passos. Podemos iniciar clonando o repositório em um diretório local por meio de um terminal de sua escolha.

    git clone https://github.com/OtvMonteiro/ProjetoLabsEngSoftRedes.git

Agora entre no diretório do projeto no seu computador.

    cd ProjetoLabsEngSoftRedes

Para executar o código localmente existe um branch dedicado para a esse fim. Para entrar nesse branch execute:

    git checkout final

Pronto, você já está no branch para desenvolvimento. Agora podemos seguir para a execução do código.

### Executando o Backend
Para garantir o correto funcionamento do ambiente virtual gerado pelo gerenciador de pacotes pipenv é necessário que o arquivo Pipfile contenha a versão do Python instalada na sua máquina. Para isso, você pode conferir a sua versão através do comando:

    python --version
    3.9.1

No arquivo Pipfile, presente na pasta backend, em python_version insira a versão correspondente à instalada na sua máquina.

    [requires]
    python_version = "3.9"

A partir do diretório inicial do projeto podemos realizar o seguinte comando para nos direcionar para a pasta do backend:

    cd backend

Com isso, é possível então iniciar um shell do pipenv e instalar as depedências do projeto.

    pipenv shell
    pipenv install

Antes de iniciar faça uma cópia do arquivo .env.example da seguinte forma:

    cp .env.example .env

Assim, podemos executar o backend.

    python app.py

No windows pode aparecer uma mensagem do firewall solicitando acesso a sua rede. Permita o acesso.

### Executando o Frontend
Abra um novo terminal no diretório raiz do projeto e execute o seguinte comando:

    cd frontend

Antes de iniciar faça uma cópia do arquivo .env.example da seguinte forma:

    cp .env.example .env

Como já temos o Node.js instalado podemos executar:

    npm install
    npm run dev

A operação de instalar as dependências pode demora um pouco. Ao final copie a página indicada no terminal: http://localhost:3000. Abra essa página no seu navegador de preferência.

## Apresentação
Ao abrir a página em seu navegador a tela de login será apresentada. Nessa tela estão exibidos os campos de login, senha e tipo de usuário. 

![](docs/ImagensReadme/Tela%20Login.png)

O acesso ao site pode ser feito através dos usuários indicados na tabela abaixo. Observe que o tipo faz com que o usuário tenha acesso a diferentes escopos da aplicação.

| Usuário            | Senha | Tipo   |
|:------------------:|:-----:|:------:|
|Barueri             | senha | Criar  |
|Lorena              | senha | Criar  |
|posto_de_vacinacao  | senha | Enviar |
|digitador           | senha | Digitar|
|digitador2          | senha | Digitar|
|digitador3          | senha | Digitar|

### Envio de Imagens
Escolhendo o usuário do tipo Enviar você terá acesso a seguinte tela:

![](docs/ImagensReadme/Tela%20de%20Carregar%20Imagem.png)

Para facilitar a sua experiência você, na pasta Teste/Formulários preenchidos (escaneados), tem acesso a algumas fotos de formulário já preenchidos manualmente. Adicione uma dessas imagens conforme apresentado abaixo e faça seu envio:

![](docs/ImagensReadme/Tela%20de%20Carregar%20Imagem%20-%20Procurando%20a%20Imagem.png)

Imagem Selecionada   |  Imagem Enviada
:-------------------------:|:-------------------------:
![](docs/ImagensReadme/Tela%20de%20Carregar%20Imagem%20-%20Imagem%20selecionada.png)  |  ![](docs/ImagensReadme/Tela%20de%20Carregar%20Imagem%20-%20Mensagem%20de%20sucesso.png)

Note que está disponível para o envio uma imagem rotacionada. Nossa aplicação é capaz de corrigir a angulação da imagem a fim de exibi-lá corretamente na seção de digitação, como veremos a seguir.

Ao final clique no botão de sair para voltar a tela de login.

### Digitação
O processo de digitação pode ser realizado por mais de um usuário de forma simultânea. Para isso, a seguir é exemplificado esse processo com duas contas diferentes.

![](docs/ImagensReadme/Tela%20Login%20-%20Tipo%203%20(Simultâneo).png)

Ao logar no sistema cada usuário recebe um formulário que ainda não foi digitado. É interessante destacar que nunca dois usuários receberão formulários iguais. Como veremos a seguir.

![](docs/ImagensReadme/Tela%20de%20Digitacao%20-%20Simultanea.png)

Ao finalizar o processo de digitação é exibido uma mensagem de confirmação do envio.

![](docs/ImagensReadme/Tela%20de%20Digitacao%20-%20Dados%20Preenchidos.png)

Para receber um novo formulário o usuário deve recarregar a página (F5). Caso não haja mais formulários a seguinte mensagem é exibida:

![](docs/ImagensReadme/Tela%20de%20Digitacao%20-%20Acabou%20formulário.png)

### Criação de Formulário
Por fim, se logarmos com uma conta do tipo Criar seremos redicionados para a seguinte tela:

![](docs/ImagensReadme/Tela%20de%20Criar%20Formulário.png)

Na tela acima é apresentado uma tabela com alguns exemplos  de campos obrigatórios que são exigidos pelas esferas públicas superiores. Esses campos estão presentes em todos os formulários criados. 

Caso o usuário já tenha um formulário criado, é possível recuperá-lo através do botão RECUPERAR que fará a abertura desse formulário numa nova janela do navegador.

![](docs/ImagensReadme/Formulário%20Recuperado.png)

No caso de não existir um formulário, o botão de recuperação fica desativado. O usuário pode criar novo formulário através das caixas de textos presentes abaixo da tabela fazendo a adição de campos extras.

![](docs/ImagensReadme/Tela%20de%20Criar%20Formulário%20-%20Inserindo%20Campos.png)

Note que:

- Campos repetidos são ignorados indepedentemente da forma de escrita (maiúsculo e minúsculo);
- Campos em vazio também são ignorados;
- Espaços antes e depois do nome são ignorados.

Assim o formulário a seguir é criado:

![](docs/ImagensReadme/Formulário%20Gerado.png)

Ao final podemos fazer o LogOut e retornar para a tela de login.
