describe('login page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should login with valid email and password', () => {
    cy.login('test@test.com', 'test')

    cy.contains('Добро пожаловать test@test.com').should('be.visible')
  })

  it('should not login with empty email', () => {
    cy.login(null, 'test')

    cy.get('#mail').then((elements) => {
      expect(elements[0].checkValidity()).to.be.false
      expect(elements[0].validationMessage).to.be.eql('Заполните это поле.')
    })
  })

  it('should not login with empty password', () => {
    cy.login('test@test.com', null)

    cy.get('#pass').then((elements) => {
      expect(elements[0].checkValidity()).to.be.false
      expect(elements[0].validationMessage).to.be.eql('Заполните это поле.')
    })
  })
})

  describe('test book list', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.login('test@test.com', 'test')
    })

    const book1 = {
      title: "Волхв",
      description: "Роман",
      author: "Джон Фаулз"
    }

    const book3 = {
      title: "Авиатор",
      description: "Современная проза",
      author: "Евгений Водолазкин"
    }

  it('should add book to list', () => {
    cy.addBook(book1)
    cy.get('.card-title').should('contain.text', book1.title)
  })

  it('should add book to favorite', () => {
    cy.contains('Add to favorite').click()
    cy.contains('Favorites').click()
    cy.get('.card-title').should('contain.text', book1.title)
  })

  it('should delete book from favorite', () => {
    cy.contains('Delete from favorite').click()
    cy.contains('Favorites').click()
    cy.contains('Please add some book to favorit on home page!').should('be.visible')
  })

  it('should add new book to favorite', () => {
    cy.addFavoriteBook(book3)
    cy.contains('Favorites').click()
    cy.get('.card-title').should('contain.text', book3.title)
  })
})