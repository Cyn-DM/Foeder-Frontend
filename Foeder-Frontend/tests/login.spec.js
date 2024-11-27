import {test, expect} from '@playwright/test';
import dotenv from 'dotenv';
import {chromium} from 'playwright-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import {login} from "./login-helper.js";

dotenv.config({path: './secrets.env'});



const foederLoginEmail = process.env.foederLoginEmail;
const foederLoginPassword = process.env.foederLoginPass;

test.describe("With stealth plugin", () => {
    test.use({ignoreHTTPSErrors: true});

    test('login', async () => {
        chromium.use(StealthPlugin());
        await chromium.launch({headless: false}).then(async browser => {
            const page = await browser.newPage()

            await login(page, foederLoginEmail, foederLoginPassword);

            await expect(page.getByRole('link', { name: 'Recipes' })).toBeVisible();
            await browser.close();
        })

    });

    test('add-household', async () => {
        await chromium.launch({headless: false}).then(async browser => {
            const page = await browser.newPage()

            await login(page, foederLoginEmail, foederLoginPassword);

            await page.waitForTimeout(3000);
            await page.getByRole('link', {name: 'Household'}).click();
            await page.getByRole('link', {name: 'Create a household'}).click();
            await page.getByPlaceholder('Household name').click();
            await page.getByPlaceholder('Household name').fill('Test');
            await page.getByRole('button', {name: 'Submit'}).click();
            await expect(page.getByText('Test', {exact: true})).toBeVisible();
            await browser.close()

        })
    })

    test('view-recipes', async () => {
        await chromium.launch({headless: false}).then(async browser => {
            const page = await browser.newPage()

            await login(page, foederLoginEmail, foederLoginPassword);

            await page.waitForTimeout(3000);
            await page.getByRole('link', {name: 'Recipes'}).click();
            await page.waitForTimeout(2000);
            await expect(page.getByText('Spaghetti Bolognese', {exact: true})).toBeVisible();
            await browser.close()

        })
    })
})



