import {test, expect} from '@playwright/test';
import dotenv from 'dotenv';
import {chromium} from 'playwright-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

dotenv.config({path: './secrets.env'});



const foederLoginEmail = process.env.foederLoginEmail;
const foederLoginPassword = process.env.foederLoginPass;

test.describe("With stealth plugin", () => {
    test.use({ignoreHTTPSErrors: true});

    test('login', async () => {
        chromium.use(StealthPlugin());
        await chromium.launch({headless: true}).then(async browser => {
            const page = await browser.newPage()

            console.log('Test');
            await page.goto('https://localhost:5173/');
            const page1Promise = page.waitForEvent('popup');
            await page.waitForSelector('iframe[title="Knop Inloggen met Google"]');
            await page.locator('iframe[title="Knop Inloggen met Google"]').contentFrame().getByLabel('Inloggen met Google').click();
            console.log('test2');
            const page1 = await page1Promise;
            await page1.getByLabel('Email or phone').click();
            await page1.getByLabel('Email or phone').fill(foederLoginEmail);
            await page1.getByRole('button', { name: 'Next' }).click();
            await page1.getByLabel('Enter your password').click();
            await page1.getByLabel('Enter your password').fill(foederLoginPassword);
            await page1.getByRole('button', { name: 'Next' }).click();
            await page1.getByRole('button', { name: /Doorgaan|Next/ }).click();

            await expect(page.getByRole('paragraph')).toContainText('Welcome TestAccount');
            await browser.close();
        })

    });

    test('add-household', async () => {
        await chromium.launch({headless: true}).then(async browser => {
            const page = await browser.newPage()

            //await login(page, foederLoginEmail, foederLoginPassword);

            await page.getByRole('link', {name: 'Household'}).click();
            await page.getByRole('link', {name: 'Create a household'}).click();
            await page.getByPlaceholder('Household name').click();
            await page.getByPlaceholder('Household name').fill('Test');
            await page.getByRole('button', {name: 'Submit'}).click();
            await expect(page.getByText('Test', {exact: true})).toBeVisible();
            await browser.close()

        })
    })

})



