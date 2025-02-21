/// <reference types="cypress" />

const JUISIEST_LINK = 'juiciest-link';
const JUISIEST_LINK_MOB = 'juiciest-link-mobile';
const VEGAN = 'vegan-cuisine';
const HEADER = 'header';

const resolutionFull = [
    { width: 360, height: 1080 },
    { width: 768, height: 1080 },
    { width: 1920, height: 750 },
];

describe('App Component', () => {
    function takeScreenshots(screenshotName: string, resolution = resolutionFull) {
        cy.wait(1000);
        for (let i = 0; i < resolution.length; i++) {
            const capture = resolution[i].width < 1920 ? 'fullPage' : 'viewport';
            cy.viewport(resolution[i].width, resolution[i].height);

            if (resolution[i].width === 1920) {
                cy.screenshot(`${screenshotName}_${resolution[i].width}x${resolution[i].height}`, {
                    capture,
                });
                cy.scrollTo('bottom');
                cy.screenshot(`${screenshotName}_${resolution[i].width}x${resolution[i].height}`, {
                    capture,
                });
                cy.scrollTo('top');
            } else {
                cy.getByTestId('header').invoke('css', 'position', 'absolute');
                cy.getByTestId('footer').invoke('css', 'position', 'absolute');
                cy.screenshot(`${screenshotName}_${resolution[i].width}x${resolution[i].height}`, {
                    capture,
                });
                cy.getByTestId('header').invoke('css', 'position', 'fixed');
                cy.getByTestId('footer').invoke('css', 'position', 'fixed');
            }
        }
    }

    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('should take a screenshot of the app', () => {
        cy.getByTestId(HEADER).should('contain', 'Главная').click();
        takeScreenshots('Главная страница');

        cy.getByTestId(JUISIEST_LINK_MOB).should('not.be.visible');
        cy.getByTestId(JUISIEST_LINK).click();
        cy.getByTestId(HEADER).should('contain', 'Самое сочное');
        cy.scrollTo('top');
        takeScreenshots('Страница Самое сочное');

        cy.getByTestId(VEGAN).click();
        cy.getByTestId(HEADER).should('contain', 'Веганская кухня');
        takeScreenshots('Страница Веганская кухня');
    });
});
