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

test.describe("With stealth plugin", () => {
    test.use({ignoreHTTPSErrors: true});

    test('login', async () => {
            const browser = await chromium.launch({headless: true});
            const context = await browser.newContext({storageState: 'auth.json'});
            const page = await context.newPage();

            await loginFoeder(page, foederLoginPassword);
            await page.waitForTimeout(2000);
            await page.waitForSelector('a:has-text("Recipes")');
            await expect(page.getByRole('link', {name: 'Recipes'})).toBeVisible();
            await browser.close();
    });

    test('add-household', async () => {

            const browser = await chromium.launch({headless: true});
            const context = await browser.newContext({storageState: 'auth.json'});
            const page = await context.newPage();
            await page.waitForTimeout(1000);
            await loginFoeder(page, foederLoginPassword);
            await page.waitForTimeout(2000);
            await page.getByRole('link', {name: 'Household'}).click();
            await page.waitForTimeout(2000);
            await page.getByRole('link', {name: 'Create a household'}).click();
            await page.getByPlaceholder('Household name').click();
            await page.getByPlaceholder('Household name').fill('Test');
            await page.getByRole('button', {name: 'Submit'}).click();
            await expect(page.getByText('Test', {exact: true})).toBeVisible();
            await browser.close()


    });

    test('view-recipes', async () => {

        const browser = await chromium.launch({headless: true});

            const context = await browser.newContext({storageState: 'auth.json'});
            const page = await context.newPage();
            await page.waitForTimeout(1000);
            await loginFoeder(page, foederLoginPassword);
            await page.waitForTimeout(2000);
            await page.getByRole('link', {name: 'Recipes'}).click();
            await page.waitForSelector(':has-text("Spaghetti Bolognese")');
            await expect(page.getByText('Spaghetti Bolognese', {exact: true})).toBeVisible();
            await browser.close()

    })

   /* test('manual-test-login', async () => {
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



