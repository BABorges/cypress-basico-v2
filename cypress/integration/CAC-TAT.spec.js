/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function(){
    this.beforeEach(function(){
        cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function(){
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
    
    it('preencha os campos obrigatórios e envie o formulário', function(){
        cy.get('#firstName').type('Bruno')
        cy.get('#lastName').type('Borges')
        cy.get('#email').type('bruno@teste.com')
        cy.get('#open-text-area').type('Fazendo o curso de Cypress básico')
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formato inválido', function(){
        cy.get('#firstName').type('Bruno')
        cy.get('#lastName').type('Borges')
        cy.get('#email').type('bruno.teste.com')
        cy.get('#open-text-area').type('Fazendo o curso de Cypress básico')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não numérico', function(){
        cy.get('#phone')
        .type('dajdaa')
        .should('have.value', (''))
    })

    it('exibe mensagem de erro quando o telefone se tornar obrigatório mas não for preenchido', function(){
        cy.get('#firstName').type('Bruno')
        cy.get('#lastName').type('Borges')
        cy.get('#email').type('bruno.teste.com')
        cy.get('#open-text-area').type('Fazendo o curso de Cypress básico')
        cy.get('#phone-checkbox').click()
        cy.get('button[type="submit"]').click()
        cy.get('.phone-label-span').should('be.visible')
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome e telefone', function(){
        cy.get('#firstName').type('Bruno').should('have.value','Bruno')
        cy.get('#lastName').type('Borges').should('have.value','Borges')
        cy.get('#phone').type('123456789').should('have.value','123456789')
        cy.get('#open-text-area').type('Fazendo o curso de Cypress básico')
        cy.get('#firstName').clear().should('have.value','')
        cy.get('#lastName').clear().should('have.value','')
        cy.get('#phone').clear().should('have.value','')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('#open-text-area').type('Fazendo o curso de Cypress básico', {delay:0})
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formulário com suceso uando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('preencha os campos obrigatórios e envie o formulário', function(){
        cy.get('#firstName').type('Bruno')
        cy.get('#lastName').type('Borges')
        cy.get('#email').type('bruno@teste.com') 
        cy.get('#open-text-area').type('Fazendo o curso de Cypress básico')
        cy.contains('button','Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"][value="ajuda"]')
        .check()
        .should('be.checked')

        cy.get('input[type="radio"][value="elogio"]')
        .check()
        .should('be.checked')

        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento 2', function(){
        cy.get('input[type="radio"]')
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        }) 
    }) 

    it('marca ambos checkboxes, depois desmarcar o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .last()
        .uncheck()
        .should('not.be.checked')
    })

    it('exibe mensagem de erro quando o telefone se tornar obrigatório mas não for preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Bruno')
        cy.get('#lastName').type('Borges')
        cy.get('#email').type('bruno@teste.com')
        cy.get('#open-text-area').type('Fazendo o curso de Cypress básico!')
        cy.get('#phone-checkbox').check()
        cy.get('button[type="submit"]').click()
        cy.get('.phone-label-span').should('be.visible')
        cy.get('.error').should('be.visible')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($file){
            expect($file[0].files[0].name).to.equal("example.json")
        })
    })

    it('seleciona um arquivo simulando drag-and-drop', function(){
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($file){
            expect($file[0].files[0].name).to.equal("example.json")
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('samplefile')
        .get('#file-upload')
        .selectFile('@samplefile')
        .should(function($file){
            expect($file[0].files[0].name).to.equal("example.json")
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
            cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
        })

    it('acessa a página de política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('CAC TAT - Política de privacidade')
    })

    it('testa a página da política de privacidade de forma idependente', function(){
        cy.get('#privacy a')
        .click()
    })

    it('novo teste para testar o push', function(){
        cy.get('#firstName').should('not.have.value')
    })

    it('preencha os campos obrigatórios e envie o formulário utilizando "cy.clock" e "cy.tick"', function(){
        cy.get('#firstName').type('Bruno')
        cy.get('#lastName').type('Borges')
        cy.get('#email').type('bruno@teste.com') 
        cy.get('#open-text-area').type('Fazendo o curso de Cypress básico')
        cy.clock()
        cy.contains('button','Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
    })

    it('exibe mensagem de erro quando o telefone se tornar obrigatório mas não for preenchido antes do envio do formulário utilizando "cy.clock" e "cy.tick"', function(){
        cy.get('#firstName').type('Bruno')
        cy.get('#lastName').type('Borges')
        cy.get('#email').type('bruno@teste.com')
        cy.get('#open-text-area').type('Fazendo o curso de Cypress básico!')
        cy.get('#phone-checkbox').check()
        cy.clock()
        cy.get('button[type="submit"]').click()
        cy.get('.phone-label-span').should('be.visible')
        cy.get('.error').should('be.visible')
        cy.tick(3000)
        cy.get('.error').should('not.be.visible')
    })

    Cypress._.times(3, function(){
        it.only('repete o teste quantas vezes for informado na linha de cima', function(){
            cy.get('#firstName').type('Bruno')
            cy.get('#lastName').type('Borges')
            cy.get('#email').type('bruno@teste.com')
            cy.get('#open-text-area').type('Fazendo o curso de Cypress básico!')
            cy.get('#phone-checkbox').check()
            cy.clock()
            cy.get('button[type="submit"]').click()
            cy.get('.phone-label-span').should('be.visible')
            cy.get('.error').should('be.visible')
            cy.tick(3000)
            cy.get('.error').should('not.be.visible')
        })
    })
})