# Costs

Aplicação web completa de **gerenciamento de projetos e serviços** desenvolvida com **React**, **JavaScript** e **JSON Server** para simulação de backend.

---

## ⚙️ Funcionalidades Principais

### 📝 Cadastro de Projeto

* Campos obrigatórios: **nome**, **orçamento total**
* Seleção de **categoria** a partir de uma lista
* Validação de orçamento e campos obrigatórios

### 🛠️ Gerenciamento de Serviços

* Adição de serviços vinculados a projetos
* Cada serviço possui **nome**, **custo** e **descrição**
* Validação para não ultrapassar o orçamento do projeto
* Listagem de serviços adicionados
* Remoção de serviços

### 🔐 Mensagens e Feedback

* Mensagens de sucesso e erro para operações de cadastro, edição e adição de serviços
* Feedbacks temporizados desaparecendo automaticamente após 3 segundos

---

## 🧰 Tecnologias Utilizadas

* **React 18**
* **React Router DOM** (para navegação)
* **UUID** (geração de IDs únicos para serviços)
* **CSS Modules** (estilização modular)
* **JSON Server** (simulação de backend REST)
* **React Icons** (ícones)

---

## 🧩 Requisitos

* Node.js 18+
* npm ou yarn

---

## 🚀 Instalação e Execução

1️⃣ **Clonar o repositório**

```bash
git clone https://github.com/SeuUsuario/costs.git
cd Costs
```

2️⃣ **Instalar dependências**

```bash
npm install
```

3️⃣ **Iniciar JSON Server** (simulação de backend)

```bash
npx json-server --watch db.json --port 5000
```

4️⃣ **Rodar a aplicação**

```bash
npm start
npm run backend
```

Acesse em: [http://localhost:3000](http://localhost:3000)
e o BackEnd: [http://localhost:5000](http://localhost:5000)

---

## 🧠 Destaques Técnicos

* Boas práticas de **gerenciamento de estado e componentes React**
* **Modularidade** e organização de componentes
* Validação de formulário e mensagens de erro/sucesso
* **Controle de orçamento de projetos**
* **Gerenciamento de serviços vinculados a projetos**
