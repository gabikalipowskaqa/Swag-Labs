describe('Testovanie prihlasovacej stránky - saucedemo.com', () => {
  
  // nakonfigurovala som konstanty
  const baseUrl = 'https://www.saucedemo.com/';
  const validInputPassword = 'secret_sauce';
  const validUsernames = [
    'standard_user',
    'problem_user',
    'performance_glitch_user',
    'error_user',
    'visual_user'
  ];

  const invalidUsername = 'locked_out_user';
  const invalidInputPasswords = [
    'secretsauce',
    'secretSauce',
    'secret-sauce',
    'Secret_sauce',
    'SECRET_sauce',
    'secret_SAUCE',
    'SECRETSAUCE',
    'SECRET_SAUCE',
    'standard_user',
    '12345678910',
    'secret_sauce ',
  ];

  const longUsername = 'a'.repeat(1000);
  const longPassword = 'b'.repeat(1000);
  const specialUsername = '*]<user>alert("error")</glitch-+>';
  const specialPassword = '!@#$%^&*()_+{}[]|\\:";\'<>?,./';
  const sameValue = 'standard_user';


  // pred kazdym testom nacitame zakladnu stranku
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  // Happy path - uspesne prihlasenie pre vsetkych userov
  // Tento scenar je najdolezitejsi, stale je potrebne overit zakladnu funkcionalitu.
  it('Login for valid users', () => {
    validUsernames.forEach((username) => {
      cy.get('[data-test="username"]').clear().type(username);
      cy.get('[data-test="password"]').clear().type(validInputPassword);
      cy.get('[data-test="login-button"]').click();
      cy.url().should('include', '/inventory.html');
      cy.get('.inventory_list').should('be.visible');
      cy.get('#react-burger-menu-btn').click();
      cy.get('#logout_sidebar_link').click();
      cy.url().should('include', 'saucedemo.com/');
    });
  });

  // Happy path - specificky pouzivatel (locked out)
  // V tomto scenari overujem, ze system neumoznil specifickemu pouzivatelovi pristup ani so spravnym heslom.
  it('Login for locked out user', () => {
    cy.get('[data-test="username"]').type(invalidUsername);
    cy.get('[data-test="password"]').type(validInputPassword);
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should('contain', 'Sorry, this user has been locked out.');
  });

  // Negative scenario - nespravne heslo
  // V tomto scenari overujem, ze ziadna kombinacia platneho mena ale nespravneho hesla neumozni prihlasenie pouzivatela.
  it('Login with invalid password for each valid username', () => {
    validUsernames.forEach((username) => {
      invalidInputPasswords.forEach((invalidInputPassword) => {
        cy.log(`Testujem kombináciu: ${username} / ${invalidInputPassword}`);

        cy.get('[data-test="username"]').clear().type(username);
        cy.get('[data-test="password"]').clear().type(invalidInputPassword);
        cy.get('[data-test="login-button"]').click();
        cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service');
      });
    });
  });

  // Negative scenario - nespravne pouzivatelske meno
  // V tomto scenari overujem, ze system nepusti login nespravneho mena ani so spravnym heslom.
  it('Login with invalid username and valid password', () => {
    cy.get('[data-test="username"]').type('standarduser'); 
    cy.get('[data-test="password"]').type(validInputPassword);
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service');
  });

  // Negative scenario - chybajuce vstupne udaje
  // V tomto scenari overujem, že login neprebehne bez zadania údajov.
  it('Empty values entry', () => {
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should('contain', 'Username is required');
  });

  // Negative scenario - extremne dlhe vstupne stringy
  // V tomto scenari overujem, ako by system reagoval pri vlozeni velkeho mnoztva hodnot
  it('Extremely long entry', () => {
    cy.get('[data-test="username"]').type(longUsername);
    cy.get('[data-test="password"]').type(longPassword);
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service');
  });

  // Negative scenario - specialne znaky
  // V tomto scenari overujem, ako by system reagoval na vlozenie specialnych znakov
  it('Login with special characters', () => {
    cy.get('[data-test="username"]').type(specialUsername);
    cy.get('[data-test="password"]').type(specialPassword);
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service');
  });

  // Negative scenario - rovnaky text v oboch poliach
  // Tento test je dolezity lebo overujem spravnu validaciu kombinacie vstupov.
  it('Login with same text for username and password', () => {
  
    cy.get('[data-test="username"]').type(sameValue);
    cy.get('[data-test="password"]').type(sameValue);
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service');
});

});