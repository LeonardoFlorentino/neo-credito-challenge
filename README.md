# [Neo Crédito](https://neocredito.com.br/) Challenge

<a href="https://neo-credito-challenge.vercel.app/painel" target="_blank">
	<img src="https://img.shields.io/badge/vercel-frontend-success?logo=vercel&labelColor=111111&color=43b581" alt="Vercel Frontend Deploy" />
</a>

## Visão Geral

<p align="center">
	<b>Para testar a aplicação, basta acessar o frontend publicado em:<br/>
	<a href="https://neo-credito-challenge.vercel.app/painel" target="_blank">https://neo-credito-challenge.vercel.app/painel</a></b>
</p>

Este repositório contém o desafio técnico frontend da Neo Crédito, focado no fluxo de validação operacional de propostas, análise de dossiê e acompanhamento de status até a assinatura eletrônica.

<p align="center">
	<b>Stack principal do projeto</b><br/>
	<img src="https://img.shields.io/badge/Platform-Web-0f172a" alt="Web" />
	<img src="https://img.shields.io/badge/Next.js-16.x-000000?logo=next.js" alt="Next.js" />
	<img src="https://img.shields.io/badge/React-19.x-61dafb?logo=react" alt="React" />
	<img src="https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript" alt="TypeScript" />
	<img src="https://img.shields.io/badge/Styled%20Components-6.x-db7093?logo=styledcomponents" alt="Styled Components" />
	<img src="https://img.shields.io/badge/MSW-2.x-ff6a33" alt="MSW" />
	<img src="https://img.shields.io/badge/Jest-30.x-c21325?logo=jest" alt="Jest" />
</p>

## Objetivo

Este repositório foi construído como desafio técnico, com foco em:

- organização de arquitetura frontend;
- modelagem de fluxo de negócio orientado a estados;
- testabilidade e confiabilidade dos fluxos principais;
- legibilidade e evolução contínua do código.

## Decisões Técnicas

### Atomic Design

O projeto organiza componentes por níveis de composição para facilitar reuso e manutenção:

- atoms: blocos básicos visuais e de interação;
- molecules: combinações pequenas e reutilizáveis;
- organisms: seções maiores da interface, com regra de apresentação.

Benefícios práticos:

- reduz duplicação de UI;
- deixa clara a responsabilidade de cada camada;
- melhora a previsibilidade dos testes por nível de componente.

### Styled Components

Styled Components foi adotado para co-localizar estilo e componente, mantendo encapsulamento visual e tema centralizado.

Benefícios práticos:

- estilos com escopo local;
- composição dinâmica de estilos via props;
- manutenção mais simples de tokens e consistência visual.

### MSW (Mock Service Worker)

MSW foi escolhido para simular API de forma realista, tanto no desenvolvimento quanto nos testes.

Benefícios práticos:

- desacoplamento entre frontend e backend real;
- testes de integração mais próximos do comportamento de rede;
- controle claro de cenários de sucesso, loading, erro e retry.

## Diagrama de Máquina de Estados (Status da Proposta)

```mermaid
stateDiagram-v2
		[*] --> Criada
		Criada --> EmAnalise : iniciar_analise
		EmAnalise --> AguardandoDocumentos : solicitar_pendencia
		AguardandoDocumentos --> EmAnalise : reenviar_documentos
		EmAnalise --> AguardandoAssinatura : aprovada
		EmAnalise --> Reprovada : reprovada
		AguardandoAssinatura --> Assinada : assinatura_confirmada
		AguardandoAssinatura --> Expirada : prazo_excedido
		Assinada --> Concluida : formalizacao_final
		Reprovada --> [*]
		Expirada --> [*]
		Concluida --> [*]
```

## Instalação e Execução

### 1. Pré-requisitos

- Node.js 20+;
- npm 10+.

### 2. Instalar dependências

```bash
npm install
```

### 3. Rodar em desenvolvimento

```bash
npm run dev
```

Aplicação disponível em http://localhost:3000.

### 4. Validar qualidade

Checagem de tipos:

```bash
npx tsc --noEmit
```

Lint:

```bash
npm run lint
```

Testes:

```bash
npm test -- --runInBand
```

### 5. Build de produção

```bash
npm run build
npm start
```

## Escopo

Projeto com finalidade avaliativa. Não representa integralmente requisitos de produção, como segurança, compliance, observabilidade e operação em escala.
