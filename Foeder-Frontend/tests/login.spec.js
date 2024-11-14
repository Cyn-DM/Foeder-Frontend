import { test as base, expect } from '@playwright/test';
import dotenv from 'dotenv';
import {chromium} from 'playwright-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

dotenv.config({ path: './secrets.env' });

chromium.use(StealthPlugin());

const test = base.extend({
    browser: async ({}, use) => {
        const browser = await chromium.launch({
            headless: true,
        });
        await use(browser);
        await browser.close();
    },
});

const foederLoginEmail = process.env.foederLoginEmail;
const foederLoginPassword = process.env.foederLoginPass;

test.describe("With stealth plugin", () => {
    test.use({ignoreHTTPSErrors: true});

    test('login', async (browser) => {
        const page = await browser.newPage();
        await page.goto('https://localhost:5173/');
        await page.setViewportSize({ width: 1600, height: 900 }); // Adjust to your preference

        const page1Promise = page.waitForEvent('popup');
        await page.locator('iframe[title="Knop Inloggen met Google"]').contentFrame().locator('#container').click();
        const page1 = await page1Promise;
        await page1.getByLabel('Email or phone').click();
        await page1.getByLabel('Email or phone').fill(foederLoginEmail);
        await page1.getByRole('button', { name: 'Next' }).click();
        await page1.getByLabel('Enter your password').click();
        await page1.getByLabel('Enter your password').fill(foederLoginPassword);
        await page1.getByRole('button', { name: 'Next' }).click();
        await page1.getByRole('button', { name: /Doorgaan|Next/ }).click();
        await expect(page.getByRole('paragraph')).toContainText('Welcome TestAccount');
    });
})

