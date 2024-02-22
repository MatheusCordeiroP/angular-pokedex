# AngularPokedex

Esse projeto é uma Pokedex que lista os pokemons em sua página principal, usando uma paginação que limita a 20 pokemons por página, e que permite que você observe detalhes de um pokemon buscando-o pela barra de pesquisa pelo nome ou número, ou clicando em cima do nome de algum dos pokemons.

### Cuidados Adicionais

O projeto teve alguns pontos além do proposto inicialmente.

- Foi adicionado uma página de detalhes, conforme sugerido na milha extra.
- Foi adicionado a função de gerar ação ao interagir com um pokemon na lista, no caso, a ação escolhida de ir para a tela de detalhes foi colocada apenas ao clicar no nome do pokemon, ao invés de ser no componente inteiro.
- Na tela de detalhes, é possível ver a tipagem do pokemon, os atributos base dele, e a cor das tipagens são geradas dinamicamente de acordo com uma constante listando as cores para cada um dos tipos.
- Foi adicionado uma verificação na busca de pokemons, onde ele sequer faz a requisição se o campo estiver vazio, para evitar consumo de api e de dados desnecessários.
- No botão de troca de páginas, além de ser desabilitado se você já estiver na primeira ou última página, também é feito um cálculo que oferece redundância a não surgir bugs por causa disso.
- O texto de descrição do pokémon está limitada a 3 linhas, com reticências ao final, para evitar textos grandes demais de ocuparem toda a tela.
- Ao trocar de página, a tela sobe ao topo, para que o usuário possa visualizar os pokémons da nova página sem a necessidade de ficar subindo manualmente a cada página.
- A barra de pesquisa não é caseSensitive, então buscar "eevee", "Eevee" ou "eeVeE" vai retornar o pokémon corretamente.
- Ao clicar no svg do logo da empresa, você retornará para a página principal, você pode usar isso como uma alternativa ao invés de usar o botão de retornar.

### Pontos de Melhorias Identificadas

- Eu gostaria de ter usado uma váriavel de controle de isLoading para deixar um componente de carregamento no template da página enquanto as informações dos pokémons não estão carregadas, para evitar casos das informações irem se sobreescrevendo na tela em tempo real. Não tive tempo de implementar, entretanto.
- Eu gostaria de usar uma dropbox no título "Olá, Matheus Cordeiro" para realmente executar alguma função, como a de alterar a tela para modo noturno, mas também não cheguei a aplicar.

## Executando o Projeto

Execute `npm install` para instalar as dependencias.

Execute o comando `ng serve` para criar um servidor local.
Acesse pelo seu navegador o link `http://localhost:4200/`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

# AngularPokedex

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.0.

## Running Project

Run `npm install` to install dependecies.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

Você pode acompanhar com um pouco mais de detalhes alguns commits feitos no projeto pela página do github:
https://github.com/MatheusCordeiroP/angular-pokedex
