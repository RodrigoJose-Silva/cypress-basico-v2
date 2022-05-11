/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {

    const THREE_SECONDS_IN_MS = 3000

    beforeEach(function () {

        //acessando a aplicação local
        cy.visit('./src/index.html')
    })

    afterEach(function () {
        cy.clearLocalStorage()
    })

    it('verifica o título da aplicação', function () {
        //validando o titulo da page
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    Cypress._.times(5, () => { // funçao de repetição do teste
        it('preenche os campos obrigatórios e envia o formulário', function () {
            cy.clock()

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
                .type('Teste de preenchimento do campo com sucesso!!!', { delay: 0 })

            //submetendo o formulário
            cy.get('button[type="submit"]')
                .should('be.visible')
                .click()

            //validando a exibição da msg de sucesso
            cy.get('span[class="success"]')
                .should('be.visible')

            cy.tick(THREE_SECONDS_IN_MS)

            cy.contains('.success', 'Mensagem enviada com sucesso')
                .should('not.be.visible') // verificação de que a mensagem de sucessso não está mais visível
        })
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {


        const longText = 'Teste de preenchimento do campo com sucesso!!! Teste de preenchimento do campo com sucesso!!! Teste de preenchimento do campo com sucesso!!! Teste de preenchimento do campo com sucesso!!! Teste de preenchimento do campo com sucesso!!! Teste de preenchimento do campo com sucesso!!! Teste de preenchimento do campo com sucesso!!! Teste de preenchimento do campo com sucesso!!! Teste de preenchimento do campo com sucesso!!! Teste de preenchimento do campo com sucesso!!! Teste de preenchimento do campo com sucesso!!! Teste de preenchimento do campo com sucesso!!! Teste de preenchimento do campo com sucesso!!! Teste de preenchimento do campo com sucesso!!! '

        cy.clock()

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
            .type(longText, { delay: 0 }) // objeto que input um texto longo de uma única vez

        //submetendo o formulário
        cy.get('button[type="submit"]')
            .should('be.visible')
            .click()

        //validando a exibição da msg de sucesso
        cy.get('span[class="error"]')
            .should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.contains('span[class="error"]', 'Valide os campos obrigatórios!')
            .should('not.be.visible') // verificação de que a mensagem de sucessso não está mais visível
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {

        cy.clock()

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
            .type('Teste de preenchimento do campo com sucesso!!!', { delay: 0 })

        //submetendo o formulário
        cy.get('button[type="submit"]')
            .should('be.visible')
            .click()

        //validando a exibição da msg de sucesso
        cy.get('span[class="error"]')
            .should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.contains('span[class="error"]', 'Valide os campos obrigatórios!')
            .should('not.be.visible') // verificação de que a mensagem de sucessso não está mais visível
    })

    it('campo de telefone continua vazio quando preenchido com dados não-numéricos', function () {
        cy.get('#phone')
            .should('be.visible')
            .type('asdfghj')
            .should('have.value', '')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
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

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.clock()

        //submetendo o formulário
        cy.get('button[type="submit"]')
            .should('be.visible')
            .click()

        //validando a exibição da msg de sucesso
        cy.get('span[class="error"]')
            .should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.contains('span[class="error"]', 'Valide os campos obrigatórios!')
            .should('not.be.visible') // verificação de que a mensagem de sucessso não está mais visível
    })

    it('envia o formulario com sucesso usando um comando customizado', function () {
        cy.fillMadatoryFieldsAndSubmit() //utilizando o comando customizado pelo arquivo "commands.js"

        cy.clock()

        //validando a exibição da msg de sucesso
        cy.get('span[class="success"]')
            .should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('span[class="success"]')
            .should('not.be.visible')
    })

    it('utilizando a função "cy.contains"', function () {
        cy.clock()

        //submetendo o formulário
        cy.contains('button', 'Enviar')
            .should('be.visible')
            .click()

        //validando a exibição da msg de sucesso
        cy.get('span[class="error"]')
            .should('have.contain', 'Valide os campos obrigatórios!')

        cy.tick(THREE_SECONDS_IN_MS)

        cy.get('span[class="error"]')
            .should('not.be.visible')

    })

    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        const produto = 'mentoria';

        cy.get('#product')
            .select(produto)
            .should('have.value', produto)
    })

    it('marca o tipo de atendimento "Feedback', function () {
        cy.get('input[value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .then(input => {
                expect(input[0].files[0].name).to.equals('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: "drag-drop" }) // ação qeu simula arrastar um arquivo no local de upload
            .should(input => {
                expect(input[0].files[0].name).to.equals('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('example')

        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('@example')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equals('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.contains('a', 'Política de Privacidade')
            .should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function () {
        cy.contains('a', 'Política de Privacidade')
            .invoke('removeAttr', 'target') //anula a função da page abrir em outra aba
            .click()

        cy.contains('Talking About Testing')
            .should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')

        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', () => {
        const longText = Cypress._.repeat('0123456789', 20)

        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
    })
})