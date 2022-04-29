/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(function() {
        //acessando a aplicação local
        cy.visit('./src/index.html')
      })

    afterEach (function() {
        cy.clearLocalStorage()
    })

    it('verifica o título da aplicação', function() {
        //validando o titulo da page
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        //preenchendo o campo nome
        cy.get('#firstName')
            .should('be.visible')
            .type('Rodrigo')
            .should('have.value', 'Rodrigo')

        //preenchendo o campo sobrenome
        cy.get('#lastName')
            .should('be.visible')
            .type('Silva')

        //preenchendo o campo e-mail
        cy.get('#email')
            .should('be.visible')
            .type('qatest@gmail.com')

        //preenchendo o campo "Como podemos te ajudar"
        cy.get('#open-text-area')
            .should('be.visible')  
            .type('Teste de preenchimento do campo com sucesso!!!')

        //submetendo o formulário
        cy.get('button[type="submit"]')
            .should('be.visible')
            .click()    

        //validando a exibição da msg de sucesso
        cy.get('span[class="success"]')
            .should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        //preenchendo o campo nome
        cy.get('#firstName')
            .should('be.visible')
            .type('Rodrigo')
            .should('have.value', 'Rodrigo')

        //preenchendo o campo sobrenome
        cy.get('#lastName')
            .should('be.visible')
            .type('Silva')

        //preenchendo o campo e-mail
        cy.get('#email')
            .should('be.visible')
            .type('qatest#gmail.com')

        //preenchendo o campo "Como podemos te ajudar"
        cy.get('#open-text-area')
            .should('be.visible')  
            .type('Teste de preenchimento do campo com sucesso!!!')

        //submetendo o formulário
        cy.get('button[type="submit"]')
            .should('be.visible')
            .click()    

        //validando a exibição da msg de sucesso
        cy.get('span[class="error"]')
            .should('be.visible')        
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        //preenchendo o campo nome
        cy.get('#firstName')
            .should('be.visible')
            .type('Rodrigo')
            .should('have.value', 'Rodrigo')

        //preenchendo o campo sobrenome
        cy.get('#lastName')
            .should('be.visible')
            .type('Silva')

        //preenchendo o campo e-mail
        cy.get('#email')
            .should('be.visible')
            .type('qatest@gmail.com')

        //habilitando o checkbox do telefone
        cy.get('#phone-checkbox')
            .should('be.visible')
            .check()

        //preenchendo o campo "Como podemos te ajudar"
        cy.get('#open-text-area')
            .should('be.visible')  
            .type('Teste de preenchimento do campo com sucesso!!!')

        //submetendo o formulário
        cy.get('button[type="submit"]')
            .should('be.visible')
            .click()    

        //validando a exibição da msg de sucesso
        cy.get('span[class="error"]')
            .should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        //preenchendo o campo nome e limpando o campo na sequência
        cy.get('#firstName')
            .should('be.visible')
            .type('Rodrigo')
            .should('have.value', 'Rodrigo')
            .clear()
            .should('have.value', '')

        //preenchendo o campo sobrenome e limpando o campo na sequência
        cy.get('#lastName')
            .should('be.visible')
            .type('Silva')
            .clear()
            .should('have.value', '')


        //preenchendo o campo e-mail e limpando o campo na sequência
        cy.get('#email')
            .should('be.visible')
            .type('qatest@gmail.com')
            .clear()
            .should('have.value', '')


        //habilitando o checkbox do telefone e limpando o campo na sequência
        cy.get('#phone')
            .should('be.visible')
            .type('999999999')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        //submetendo o formulário
        cy.get('button[type="submit"]')
            .should('be.visible')
            .click()    

        //validando a exibição da msg de sucesso
        cy.get('span[class="error"]')
            .should('be.visible')
    })
  })