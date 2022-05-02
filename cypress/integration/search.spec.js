
describe('Duck Duck Go Search', () => {
    //variável do texto utilizado na pesquisa
    const searchTerm = 'cypress.io'

    beforeEach(() => {
        //validando o resultado da pesquisa atravé da requisição efetuada
        cy.intercept(
            'GET',
            `**?q=${searchTerm}**` //repassando o valor da variável, através do template do JS "${nome_variável}", quando concatenado com mais info utiliza-se sinal de crase ` ` no inicio e final
        ).as('getSearchResults')  //ALIAS -> apelido para a requisição

        cy.visit('https://duckduckgo.com/')

        //declarando um elemento com ALIAS repetido nos testes
        cy.get('#search_form_input_homepage')
            .as('searchField')  //ALIAS -> apelido para o elemento
            .should('be.visible')
    })

    it('Digita e teclar Enter', () => {
        cy.get('@searchField') //pesquisando o elemento através do ALIAS
            .type(`${searchTerm}{enter}`) //repassando o valor da variável, através do template do JS "${nome_variável}", quando concatenado com mais info utiliza-se sinal de crase ` ` no inicio e final

        cy.wait('@getSearchResults') //validando a requisição citada no "BEFORE"
    })

    it('Digita e clicar na Lupa de pesquisa', () => {
        cy.get('@searchField') //pesquisando o elemento através do ALIAS
            .type(searchTerm) //repassando o valor da variável direto
        cy.get('#search_button_homepage')
            .should('be.visible')
            .click()

        cy.wait('@getSearchResults')  //validando a requisição citada no "BEFORE"
    })

    it('Digita e enviar diretamente o dormulario', () => {
        cy.get('@searchField') //pesquisando o elemento através do ALIAS
            .type(searchTerm) //repassando o valor da variável direto
        cy.get('form').submit()  //utilizando como paramentro o elemento pai e o tipo de elemento de clique

        cy.wait('@getSearchResults')  //validando a requisição citada no "BEFORE"
    })

    it('Efetuando a pesquisa por texto e selecionando a primeira opção da lista', () => {
        cy.get('@searchField')
            .type('cypress.io{downarrow}{enter}', {delay:500}) //{downarrow} refere a simulação de tecla para baixo, alterado o tempo do delay para o navegador poder selecionar o primeiro da lista
    })

    it('Efetuando a pesquisa por texto e selecionando a segunda opção da lista', () => {
        cy.get('@searchField')
            .type('cypress.io{downarrow}{downarrow}{enter}', { delay: 500 }) //{downarrow}2x refere a simulação de tecla para baixo 2x, alterado o tempo do delay para o navegador poder selecionar o primeiro da lista
    })

    it('Efetuando a pesquisa por texto e selecionando a terceira opção da lista', () => {
        cy.get('@searchField')
            .type('cypress.io{downarrow}{downarrow}{downarrow}{enter}', { delay: 500 }) //{downarrow}2x refere a simulação de tecla para baixo 2x, alterado o tempo do delay para o navegador poder selecionar o primeiro da lista
    })
})