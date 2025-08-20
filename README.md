#  Cypress testy pre prihlasovaciu stranku https://www.saucedemo.com

Tento projekt obsahuje testy v Cypresse, ktore overuju zakladnu funkcionalitu prihlasovacej stranky aplikacie https://www.saucedemo.com. 
Testy pokryvaja happy path scenare, negativne pripady a validaciu roznych vstupovu.


# Struktura projektu

-- cypress/e2e/login-page.spec.cy.js – hlavny testovaci subor
-- package.json – zavislosti 

# Instalacia projektu

1. Klonuj repozitar:
  bash
git clone https://github.com/gabikalipowskaqa/Swag-Labs
  cd Swag-Labs
2. Uisti sa ze mas nainstalovany Node.js
  npm install
3. Spusti testy
 npx cypress run --spec "cypresse2e/login-page.spec.cy.js" 
