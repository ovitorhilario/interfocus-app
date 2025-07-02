# Interfocus TodoList

Um aplicativo de lista de tarefas desenvolvido em React Native com autenticação OAuth 2.0, gerenciamento de estado performático e interface moderna com suporte a tema claro/escuro.

## 📱 Sobre o Projeto

Desenvolvi este aplicativo como parte do processo seletivo da Interfocus. É uma solução completa de gerenciamento de tarefas que permite aos usuários:

- Fazer login seguro através do sistema de autenticação OAuth 2.0 da Interfocus (IAS)
- Gerenciar suas tarefas pessoais (adicionar, marcar como concluída, excluir)
- Visualizar tarefas com diferentes filtros (abertas, concluídas, todas)
- Interface responsiva com suporte a tema claro e escuro
- Seleção múltipla de tarefas para ações em lote
- Persistência local dos dados com alta performance

![Diagram](/readme/diagram.jpg)


## 🎨 Ícones e Assets
Desenvolvi ícones personalizados e splash screen para uma experiência completa:

| Concepção | Dark | Light | Tinted |
| ----- | ----- | ---- | ------ |
| ![Image](/readme/image-1.png) | ![Diagram](/src/assets/images/store/ios-dark.png) | ![Diagram](/src/assets/images/store/ios-light.png) | ![Diagram](/src/assets/images/store/ios-tinted.png) |


### Ícones do App
- **iOS**: Ícones adaptativos em múltiplas resoluções
- **Android**: Ícones com suporte a temas adaptativos
- **Splash Screen**: Tela de carregamento personalizada

### Assets Demonstrativos
#### 🌙 Tema Dark
| Tarefas | Seleção | Nova Tarefa | Perfil |
| ----- | ---- | ------ | ------ |
| ![Image](/readme/image-3.jpg) | ![Image](/readme/image-2.jpg) | ![Image](/readme/image-4.jpg) | ![Image](/readme/image-5.jpg) |

#### ☀️ Tema Light
| Tarefas | Seleção | Nova Tarefa | Perfil |
| ----- | ---- | ------ | ------ |
| ![Image](/readme/image-6.jpg) | ![Image](/readme/image-8.jpg) | ![Image](/readme/image-9.jpg) | ![Image](/readme/image-7.jpg) |


## 🚀 Tecnologias Principais

| Dependência | Versão | Propósito |
|-------------|--------|-----------|
| **React Native** | 0.79.4 | Framework principal para desenvolvimento mobile multiplataforma |
| **Expo** | 53.0.15 | Plataforma que facilita o desenvolvimento, build e deploy |
| **React Native Unistyles** | 3.0.0-nightly | Sistema de estilização performático com suporte a temas, variantes e breakpoints |
| **Zustand** | 5.0.6 | Gerenciamento de estado global simples e performático |
| **React Native MMKV** | 3.3.0 | Armazenamento local ultra-rápido e eficiente para persistência |
| **Expo Auth Session** | 6.2.0 | Implementação segura do fluxo OAuth 2.0 |
| **Expo Secure Store** | 14.2.3 | Armazenamento seguro e criptografado para tokens sensíveis |
| **React Navigation** | 7.1.6 | Sistema de navegação robusto e flexível |
| **Date-fns** | 4.1.0 | Biblioteca moderna para manipulação de datas |
| **Expo Haptics** | 14.1.4 | Feedback tátil para melhor experiência do usuário |

## 🏗️ Arquitetura e Boas Práticas

### Estilização com React Native Unistyles
Escolhi o **React Native Unistyles** como sistema de estilização principal, que oferece:
- **Setup extremamente simples**: Configuração minimal com máxima funcionalidade
- **Variantes de cores**: Sistema organizado de cores com suporte automático a tema claro/escuro
- **Responsividade**: Breakpoints para diferentes tamanhos de tela
- **Performance**: Compilação otimizada em tempo de build
- **Temas dinâmicos**: Alternância fluida entre light mode e dark mode

### Gerenciamento de Estado e Persistência
**Implementei MMKV + Zustand Persist** pelas seguintes razões:
- **MMKV**: Escolhido por ser extremamente leve (~30KB), até 10x mais rápido que AsyncStorage, com sincronização instantânea e sem overhead de JSON
- **Zustand**: Estado global simples de configurar, sem boilerplate, com excelente performance e DevTools integrado
- **Persistência automática**: Dados salvos automaticamente sem impacto na performance

### Autenticação e Segurança
**Implementei uma arquitetura bem estruturada**:
- **Context API**: Gerenciamento da sessão do usuário de forma centralizada
- **Expo Secure Store**: Criptografia de tokens e dados sensíveis usando keychain/keystore nativo
- **Modularização**: Lógica OAuth dividida entre serviços, hooks e contexto para melhor manutenibilidade
- **Variáveis de ambiente**: Chaves e URLs sensíveis isoladas em arquivo de configuração

## 🔧 Configuração do Ambiente

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI
- Android Studio (para Android) ou Xcode (para iOS)

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/ovitorhilario/interfocus-app.git
cd interfocus-app
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configuração das variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:
> **⚠️ Importante**: As chaves de produção foram omitidas do código público como boa prática de segurança. É necessário inserir o **CLIENT_ID** e **CLIENT_SECRET**.

```env
# .env.local
EXPO_PUBLIC_AUTHORIZE_URL=https://ias.interfocus.com.br/authorize
EXPO_PUBLIC_TOKEN_URL=https://auth.interfocus.com.br/api/oauth/token
EXPO_PUBLIC_OAUTH_CLIENT_ID=
EXPO_PUBLIC_OAUTH_CLIENT_SECRET=
```

### Gerando build de desenvolvimento
```bash
# p/ android
npx expo prebuild --platform android

# p/ ios
npx expo prebuild --platform ios
```

### Executando no dispositivo
- Nesse momento, certifique-se que seu dispositivo real ou virtualizado está ativo.
```bash
# p/ android
npx expo run:android

# p/ ios
npx expo run:ios
```


## 📱 Funcionalidades

### Autenticação
- Login através do sistema OAuth 2.0 da Interfocus
- Armazenamento seguro de tokens
- Sessão persistente entre inicializações do app

### Gerenciamento de Tarefas
- **Criação**: Adicionar novas tarefas com título, descrição e timestamp
- **Visualização**: Interface limpa com possibilidade de expandir detalhes
- **Filtros**: Visualizar tarefas abertas, concluídas ou todas
- **Seleção múltipla**: Long press para ativar modo de seleção em lote
- **Ações em lote**: Marcar como concluída ou excluir múltiplas tarefas
- **Ordenação**: Tarefas ordenadas por data de criação (crescente)
- **Geração automática**: 50 tarefas aleatórias para novos usuários


## 🧪 Estrutura do Projeto

```
src/
├── app/                # Rotas (expo-router)
├── assets/             # Images, fontes e arquivos
├── components/         # Componentes reutilizáveis
├── context/            # Context providers
├── hooks/              # Custom hooks
├── services/           # Serviços (API, OAuth, etc.)
├── stores/             # Stores do Zustand + Persist (MMKV)
├── types/              # Definições TypeScript
└── utils/              # Utilitários e helpers
lib/
├── unistyles           # Configuração de temas e cores.
```

## 🔄 Fluxo OAuth 2.0

1. **Autorização**: Redirecionamento para o IAS da Interfocus
2. **Callback**: Recebimento do authorization code
3. **Token Exchange**: Troca do code por access token
4. **Armazenamento**: Token salvo de forma segura
5. **Sessão**: Manutenção da sessão do usuário


## 🤝 Sobre o Desenvolvimento

Este projeto foi desenvolvido como parte da avaliação técnica para a vaga de desenvolvedor mobile na Interfocus. Durante o desenvolvimento, busquei aplicar as melhores práticas e demonstrar conhecimento em:

- Arquitetura de aplicações React Native
- Implementação segura de OAuth 2.0
- Gerenciamento de estado performático
- Design system e responsividade
- Experiência do usuário (UX/UI)
- Código limpo e bem documentado

**Desenvolvido por Vitor Hilário para o processo seletivo da Interfocus**