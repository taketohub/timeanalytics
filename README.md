# TimeAnalytics - Sistema de Análise de Banco de Horas

![TimeAnalytics Logo](public/placeholder-logo.svg)

O TimeAnalytics é uma aplicação web moderna desenvolvida para auxiliar na análise e gestão de banco de horas de colaboradores. Projetado especificamente para atender às necessidades do Grupo Mateus, o sistema oferece uma interface intuitiva e ferramentas poderosas para visualização e análise de dados.

## 🚀 Funcionalidades

### 📊 Dashboard Analítico
- **KPIs em Tempo Real:**
  - Total de colaboradores
  - Somatório de horas negativas
  - Somatório de horas positivas
  - Número de setores ativos

### 📈 Visualizações Gráficas
- **Top 10 Colaboradores:**
  - Ranking de horas negativas
  - Ranking de horas positivas
- **Análise por Setor:**
  - Distribuição de horas negativas por setor
  - Distribuição de horas positivas por setor

### 🔍 Filtros Avançados
- Filtro por período (data inicial/final)
- Filtro por setor
- Filtro por CD (Centro de Distribuição)
- Busca por colaborador

### 📑 Importação de Dados
- Suporte para arquivos Excel (.xlsx, .xls)
- Suporte para arquivos CSV
- Validação automática de dados
- Detecção de colunas obrigatórias

### 📤 Exportação de Relatórios
- Exportação em PDF com gráficos e métricas
- Exportação em CSV para análises externas
- Exportação individual de gráficos em PNG

## 💻 Tecnologias Utilizadas

- **Frontend:**
  - Next.js 14
  - React
  - TypeScript
  - Tailwind CSS
  - Shadcn/ui
  - Recharts

- **Processamento de Dados:**
  - XLSX
  - jsPDF
  - html2canvas

## 🛠️ Requisitos do Sistema

- Node.js 18.x ou superior
- NPM ou PNPM como gerenciador de pacotes
- Navegador moderno com suporte a ES6+

## 🚀 Como Iniciar

1. Clone o repositório:
\`\`\`bash
git clone https://github.com/taketohub/timeanalytics.git
\`\`\`

2. Instale as dependências:
\`\`\`bash
cd timeanalytics
pnpm install
\`\`\`

3. Inicie o servidor de desenvolvimento:
\`\`\`bash
pnpm dev
\`\`\`

4. Acesse a aplicação em \`http://localhost:3000\`

## 📄 Formato dos Dados

O sistema espera arquivos com as seguintes colunas:

| Coluna | Descrição | Obrigatório |
|--------|-----------|-------------|
| Nome do Colaborador | Nome completo | Sim |
| Setor | Setor/Departamento | Sim |
| Filial | Centro de Distribuição | Não |
| Saldo Negativo | Horas negativas (HH:MM) | Não |
| Saldo Positivo | Horas positivas (HH:MM) | Não |
| Data Início | Data inicial do período | Não |
| Data Fechamento | Data final do período | Não |

## 👥 Equipe

- [Gideony Silva](https://github.com/taketohub)

## 📝 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---