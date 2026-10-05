# portifolio
 Portifólio contruido com a semana FrontWeek segunda edicição com Nasser Yousef


## Manutenção do site

Site estático: a página principal é `index.html`. O CSS original compilado permanece em
`css/style.css`; os ajustes da PK Films ficam em `css/refresh.css`, carregado depois.
Não é necessário instalar dependências nem executar um build para publicar.

Para conferir localmente, execute `python3 -m http.server 8000` na raiz e abra
`http://localhost:8000`. Verifique desktop e celular, os atalhos Trabalhos/Sobre/Contato,
o vídeo, o WhatsApp e o Instagram @__pkfilms.

Testes estruturais (não substituem a revisão visual no navegador):

- `python3 -m unittest discover -s tests`
- `node --check js/index.js`
- `node tests/test_script.cjs`
- `git diff --check`

O workflow existente `.github/workflows/static.yml` publica no GitHub Pages quando
`main` recebe um push. Uma branch de revisão não publica o site. O domínio, a
configuração de publicação e os arquivos de imagem não fazem parte desta atualização.
