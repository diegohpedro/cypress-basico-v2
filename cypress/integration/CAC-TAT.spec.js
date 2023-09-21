// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
        //o before it vai visitar esse link antes de  cada teste, para que não
        // precise escrever o cy.visit dentro de cada teste, o beforeEach('antes de cada') vai executar esse cy.visit
        // É importante ter blocos beforeEach, com pré condições que devem acontecer antes de cada teste seja independente, esse beforeEach e usado em teste que sao dessa forma individuais

    })
    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
        //poderia usar o it.only() realiza a execução apenas deste testes, deve ser usado 
        // quando quer realizar somente esse teste quando há muitos testes no codigo
        // ao usar o cy.only ele visita de forma rapida somente esse bloco de teste.
        //porem ja vai estár na pagina informada no beforeEach

    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        //.should (have.value', 'Diego') está validando que o valor digitado de fato é Diego
        const textao = 'Ótimo curso de automação de testes, que eu vou destruir e serei um monstro nos testes, se liga!'
        cy.get('#firstName').click().type('Diego').should('have.value', 'Diego')
        cy.get('#lastName').click().type('Pedro').should('have.value', 'Pedro')
        cy.get('#email').click().type('diegohpedro@gmail.com').should('have.value', 'diegohpedro@gmail.com'),
        //cy.get('Como podemos te ajudar').should('be.visible')
        cy.get('#open-text-area').type(textao, { delay: 0 }).should('have.value', 'Ótimo curso de automação de testes, que eu vou destruir e serei um monstro nos testes, se liga!').should('be.visible')
        cy.contains('button,', 'Enviar').click()// é um button, porem só isso é generico e pode ter outros na pagina, então usa o tipo dele que é submite

        cy.get('.success > strong').should('be.visible')// verifica um resultado esperadp que no caso
        //era uma mensagem de: "Mensagem enviada com sucesso"       

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').click().type('Diego').should('have.value', 'Diego')
        cy.get('#lastName').click().type('Pedro').should('have.value', 'Pedro')
        cy.get('#email').click().type('diegohpedrogmail.com').should('have.value', 'diegohpedrogmail.com'),
        cy.contains('Como podemos te ajudar').should('be.visible')
        cy.get('#open-text-area').type('textao').should('be.visible')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')

    })

    it('validar se letras no campo telefone permanecem vazio', function () {
        cy.get('input[type="number"]').type('oxi').should('have.value', '')
        // have value, '' significa que ta validando que o valor está vazio

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').click().type('Diego').should('have.value', 'Diego')
        cy.get('#lastName').click().type('Pedro').should('have.value', 'Pedro')
        cy.get('#email').click().type('diegohpedrogmail.com').should('have.value', 'diegohpedrogmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('textao').should('be.visible')
        cy.contains('button,', 'Enviar').click()
        cy.get('.error').should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName').click().type('Diego').should('have.value', 'Diego').clear().should('have.value', '')
        cy.get('#lastName').click().type('Pedro').should('have.value', 'Pedro').clear().should('have.value', '')
        cy.get('#email').click().type('diegohpedrogmail.com').should('have.value', 'diegohpedrogmail.com').clear().should('have.value', '')
        cy.get('#open-text-area').type('textao').should('be.visible').clear().should('have.value', '')

        

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function () {
        cy.contains('button,', 'Enviar').click()
        cy.get('.error').should('be.visible')

    })

    it('fillMandatoryFieldsAndSubmit', function () {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.error').should('be.visible')


    })

    it('selecionaUmProdutoYouTubePorSeuTexto', function () {
        cy.selecionaUmProdutoYouTubePorSeuTexto()
    })

    it('selecionaUmProdutoMentoriaPorSeuValorValue', function () {
        cy.selecionaUmProdutoMentoriaPorSeuValorValue()
    })

    it('selecionaUmProdutoBlogPorindice', function () {
        cy.selecionaUmProdutoBlogPorindice()
    })

   

    it.only('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"][value="feedback"]')
         .check()
         .should('have.value', 'feedback')
     //o .check() deve ser utilizado para marcar um radio, o .click() tambem pode
    // ser usado, porem por questao de semantica, nesses tipos de botao o que deve
    // ser usado e o .check()


    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]').should('have.length', 3) // pega o tipo do botao e depois valida que ele deve ter o tamnanho de 3 que no caso e cada um dos checkbox
        .each(function($radio){ //passa por cada um dos tipos de atendimento
            cy.wrap($radio).check() //encapsula todos os nomes de atendimentos do cac-tat
            cy.wrap($radio).should('be.checked') //checa se cada um dos botao radio foram testados

        })


    })

    it('marca ambos checkboxes, depois desmarca o ultimo', function(){ //sempre deve usar o check e o ancheck para desmarcar e uma alternativa ao click, sempre deve ser usado em checkbox
        cy.get('input[type="checkbox"]')
        .check()
        .last()
        .uncheck()
        .should('not.be.checked')
       
        

    })

    it.only ('seleciona um arquivo dentro da pasta fixture', function () {
        cy.get('input[type="file"]') // pega o input do tipo file
        .should('not.have.value') // verifica que não tem nenhum valor ainda
        .selectFile('./cypress/fixtures/example.json')//faz o upload do arquivo passando o caminho relativo ao arquivo
        .should(function($input) { //recebe uma função de callback que recebe um elemento com qeu foi retornado pelo cy.get e foi feito a verificação com o expect
            expect($input[0].files[0].name).to.equal('example.json')
        })




    })




})
