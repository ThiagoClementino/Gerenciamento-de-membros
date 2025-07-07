Gerenciador de Membros e Finanças para Igrejas

Este projeto é uma aplicação web desenvolvida para auxiliar igrejas na gestão de seus membros e finanças. Ele oferece um conjunto de funcionalidades para otimizar a administração e o controle de informações essenciais, desde o cadastro de membros até o acompanhamento de despesas e a visualização de indicadores financeiros.

Visão Geral do Projeto

O Gerenciamento-de-membros é uma solução abrangente que visa simplificar as tarefas administrativas de uma instituição religiosa. A aplicação foi projetada para ser intuitiva e eficiente, permitindo que os usuários gerenciem dados de membros, registrem transações financeiras e obtenham insights através de um dashboard interativo.

Funcionalidades Principais

• Cadastro de Membros: Um formulário intuitivo para adicionar novos membros, coletando dados essenciais de forma segura e organizada.

• Gestão de Despesas: Um sistema prático para registrar e categorizar as despesas da igreja, facilitando o controle financeiro e a prestação de contas.

• Consultas e Relatórios: Uma interface para visualizar todos os cadastros (membros e finanças) em tabelas detalhadas, permitindo buscas e filtros para análises específicas.

• Dashboard de Indicadores: Um painel visual com gráficos e métricas essenciais para monitorar a saúde financeira da igreja e o crescimento da membresia.

• Autenticação de Usuários: Sistema de login para garantir que apenas usuários autorizados possam acessar e gerenciar os dados.

Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

• Frontend:

• React: Biblioteca JavaScript para construção de interfaces de usuário interativas e reativas.

• HTML5 & CSS3: Linguagens fundamentais para a estrutura e estilização da aplicação web.

• Bootstrap: Framework de código aberto para desenvolvimento responsivo e rápido de interfaces.

• Font Awesome: Biblioteca de ícones escaláveis e personalizáveis.

• Axios: Cliente HTTP baseado em Promises para fazer requisições a APIs.
 
• React Hook Form: Biblioteca para gerenciamento de formulários no React, com validação eficiente.

• React Router DOM: Biblioteca para roteamento declarativo no React, permitindo navegação entre as páginas da aplicação.

• React Icons: Biblioteca de ícones populares para React.

• React CSV: Componente para exportar dados de tabelas para arquivos CSV.

• React Input Mask: Componente para aplicar máscaras em campos de entrada.

• Tippy.js / @tippyjs/react: Biblioteca para tooltips interativos.



• Backend (Implícito/API):

• Express: Framework web para Node.js, utilizado para construir a API RESTful que serve os dados para o frontend.

• Body-parser: Middleware para analisar corpos de requisição HTTP.



• Outras Ferramentas e Bibliotecas:

• Zod: Biblioteca de declaração e validação de esquemas TypeScript-first.

• @hookform/resolvers: Integração de validadores de esquema com React Hook Form.

• @fontsource/roboto: Fontes Roboto otimizadas para uso web.

• @fortawesome/fontawesome-svg-core & @fortawesome/free-solid-svg-icons & @fortawesome/react-fontawesome: Integração do Font Awesome com React.

• Web Vitals: Ferramentas para medir e relatar métricas de desempenho web.

• Nodemon: Utilitário que monitora alterações nos arquivos e reinicia automaticamente o servidor Node.js durante o desenvolvimento.



Estrutura do Projeto

A estrutura do projeto segue uma organização modular, facilitando a manutenção e a escalabilidade:

Plain Text


Gerenciamento-de-membros/
├── public/                     # Arquivos estáticos e index.html
├── src/                        # Código fonte da aplicação React
│   ├── App.js                  # Componente principal da aplicação
│   ├── index.js                # Ponto de entrada da aplicação
│   ├── index.css               # Estilos globais
│   ├── App.test.js             # Testes do componente principal
│   ├── reportWebVitals.js      # Relatório de métricas web
│   ├── routes.js               # Definição das rotas da aplicação
│   ├── Components/             # Componentes reutilizáveis da UI
│   ├── Contexts/               # Contextos React para gerenciamento de estado global
│   ├── Pages/                  # Páginas da aplicação (e.g., Login, Dashboard, Membros, Finanças)
│   ├── Charts/                 # Componentes de gráficos para o Dashboard
│   └── css/                    # Arquivos CSS específicos de componentes/páginas
├── package.json                # Metadados do projeto e dependências
├── package-lock.json           # Bloqueio de versões das dependências
├── postcss.config.js           # Configuração do PostCSS
├── tailwind.config.js          # Configuração do Tailwind CSS
└── README.md                   # Este arquivo README


Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento local:

Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

• Node.js (versão 14 ou superior)

• npm (gerenciador de pacotes do Node.js)

• Git (para clonar o repositório)

Instalação

1. Clone o repositório:

2. Navegue até o diretório do projeto:

3. Instale as dependências:

Execução

Para iniciar a aplicação em modo de desenvolvimento:

Bash


npm start


Isso iniciará o servidor de desenvolvimento e abrirá a aplicação no seu navegador padrão em http://localhost:3000 (ou outra porta disponível).

Execução com Nodemon (para desenvolvimento backend)

Se você estiver trabalhando no backend e quiser que o servidor reinicie automaticamente a cada alteração, pode usar o script dev:

Bash


npm run dev


Nota: Este script assume que o ponto de entrada do backend é gerenciador-de-membros/src/index.js. Verifique o package.json para confirmar o caminho correto se houver problemas.

Contribuição

Contribuições são bem-vindas! Se você deseja contribuir com este projeto, por favor, siga estas diretrizes:

1. Faça um fork do repositório.

2. Crie uma nova branch para sua feature (git checkout -b feature/sua-feature).

3. Faça suas alterações e commit (git commit -m 'feat: sua nova feature').

4. Envie para a branch original (git push origin feature/sua-feature).

5. Abra um Pull Request detalhando suas alterações.

Licença

Este projeto está licenciado sob a licença ISC. Veja o arquivo LICENSE (se existir) ou o package.json para mais detalhes.

Autor

Thiago Clementino

•
GitHub

•
Vercel Deployment







