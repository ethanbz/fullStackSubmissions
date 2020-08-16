describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'admin',
      username: 'root',
      password: 'admin'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('blogs')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
  })

  describe('login', function() {
    it('succeeds with correct credentials', function () {
        cy.contains('log in').click()
        cy.get('#username').type('root')
        cy.get('#password').type('admin')
        cy.get('#login-button').click()

        cy.contains('admin logged-in')
    })

    it('fails with wrong password', function() {
        cy.contains('log in').click()
        cy.get('#username').type('root')
        cy.get('#password').type('adminttt')
        cy.get('#login-button').click()

        cy.contains('invalid username or password')
        cy.get('html').should('not.contain', 'admin logged-in')
    })
  })
  

  describe('when logged in', function() {
    beforeEach(function() {
        cy.login({ username: 'root', password: 'admin' })
    })

    it('a new blog can be created', function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('a blog created by cypress')
        cy.get('#author').type('test')
        cy.get('#url').type('test')
        cy.get('#create-button').click()
        cy.contains('a blog created by cypress')
    })

    describe('and a blog exists', function() {
        beforeEach(function() {
            cy.createBlog({
                title: 'existing blog',
                author: 'root',
                url: 'test.com'
            })
            cy.createBlog({
                title: 'second blog',
                author: 'root',
                url: 'test.com'
            })
            cy.createBlog({
                title: 'third blog',
                author: 'root',
                url: 'test.com'
            })
        })

        it('it can be liked', function() {
            cy.contains('existing blog').contains('view').click()
            cy.contains('likes 0')
            cy.contains('like').click()
            cy.contains('likes 1')
        })

        it('it can be deleted by the user who created it', function() {
            cy.contains('existing blog').contains('view').click()
            cy.contains('remove').click()
            cy.get('html').should('not.contain', 'existing blog')
        })

        it('and blogs are ordered by likes', function() {
            cy.get('.blogContainer').then(blogs => {
                cy.expect(blogs[2]).to.contain('third blog')
            })

            cy.contains('third blog').contains('view').click()
            cy.contains('like').click()
            cy.wait(1000)
            cy.get('.blogContainer').then(blogs => {
                cy.expect(blogs[2]).to.contain('second blog')
            })
        })  
    })

  })
})