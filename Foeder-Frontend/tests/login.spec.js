import {test, expect} from '@playwright/test';
import dotenv from 'dotenv';
import {chromium} from 'playwright-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import {login, loginFoeder} from "./login-helper.js";

dotenv.config({path: './secrets.env'});

const stealthPlugin = StealthPlugin();
stealthPlugin.enabledEvasions.delete('iframe.contentWindow');
stealthPlugin.enabledEvasions.delete('navigator.plugins');

chromium.use(stealthPlugin);

const foederLoginEmail = process.env.foederLoginEmail;
const foederLoginPassword = process.env.foederLoginPass;

test.describe.serial("With stealth plugin", () => {
    test.use({ignoreHTTPSErrors: true});

    test('login', async () => {
            const browser = await chromium.launch({headless: true});
            const context = await browser.newContext({storageState: 'auth.json', ignoreHTTPSErrors: true});
            const page = await context.newPage();

            await loginFoeder(page, foederLoginPassword);
            await page.waitForTimeout(2000);
            await expect(page.getByRole('link', {name: 'Recipes'})).toBeVisible();
            await browser.close();
    });

    test('add-household', async () => {

            const browser = await chromium.launch({headless: true});
            const context = await browser.newContext({storageState: 'auth.json', ignoreHTTPSErrors: true});
            const page = await context.newPage();
            await page.waitForTimeout(1000);
            await loginFoeder(page, foederLoginPassword);
            await page.waitForTimeout(2000);
            await page.getByRole('link', {name: 'Household'}).click();
            await page.waitForTimeout(2000);
            await page.getByRole('link', {name: 'Create a household'}).click();
            await page.getByPlaceholder('Household name').click();
            await page.getByPlaceholder('Household name').fill('Test');
            await page.getByRole('button', {name: 'Save'}).click();
            await expect(page.getByText('Test', {exact: true})).toBeVisible();
            await browser.close()


    });

    test('add-recipe', async () => {

        const browser = await chromium.launch({headless: true});

        const context = await browser.newContext({storageState: 'auth.json', ignoreHTTPSErrors: true});
        const page = await context.newPage();
        await page.waitForTimeout(1000);
        await loginFoeder(page, foederLoginPassword);
        await page.waitForTimeout(2000);
        await page.getByRole('link', { name: 'Recipes' }).click();
        await page.getByRole('button', { name: 'Add Recipe' }).click();
        await page.getByPlaceholder('Title').click();
        await page.getByPlaceholder('Title').fill('Spaghetti Bolognese');
        await page.getByPlaceholder('Description').click();
        await page.getByPlaceholder('Description').fill('Spaghetti');
        await page.getByRole('button', { name: 'Add an ingredient' }).click();
        await page.getByPlaceholder('Ingredient').fill('Spaghetti');
        await page.getByPlaceholder('Amount').click();
        await page.getByPlaceholder('Amount').fill('6 sticks');
        await page.getByRole('button', { name: 'Add a step' }).click();
        await page.getByPlaceholder('Step').fill('Cook the spaghetti');
        await page.getByRole('button', { name: 'Save' }).click();
        await expect(page.getByText('Successfully added recipe.')).toBeVisible();
    })
    
    test('view-recipes', async () => {

        const browser = await chromium.launch({headless: true});

        const context = await browser.newContext({storageState: 'auth.json', ignoreHTTPSErrors: true});
        const page = await context.newPage();
        await page.waitForTimeout(1000);
        await loginFoeder(page, foederLoginPassword);
        await page.waitForTimeout(2000);
        await page.getByRole('link', {name: 'Recipes'}).click();
        await page.waitForSelector(':has-text("Spaghetti Bolognese")');
        await expect(page.getByRole('link', { name: 'Spaghetti Bolognese' }).first()).toBeVisible();
        await browser.close()

    })



/*    test('manual-test-login', async () => {
        await chromium.launch({headless: false}).then(async browser => {
            const context = await browser.newContext();
            const page = await context.newPage();
        await page.goto('https://localhost:5173/');
        await page.waitForTimeout(2000);
        const page1Promise = page.waitForEvent('popup');


            await page.locator('iframe[title="Knop Inloggen met Google"]').contentFrame().getByRole('button').click();


        await page.waitForLoadState('networkidle');
        const page1 = await page1Promise;
        await page1.getByLabel('Email or phone').click();
        await page1.getByLabel('Email or phone').fill(foederLoginEmail);
        await page1.getByRole('button', { name: 'Next' }).click();
        await page1.getByLabel('Enter your password').click();
        await page1.getByLabel('Enter your password').fill(foederLoginPassword);
        await page1.getByRole('button', { name: 'Next' }).click();
        await page1.getByRole('button', { name: /Doorgaan|Next/ }).click();

        await context.storageState({path: 'auth.json'});
        browser.close()
    })

    })*/


})

test.describe.serial("Recipes", async () => {

})


