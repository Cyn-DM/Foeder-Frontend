import { test, expect } from '@playwright/test';
require('dotenv').config({ path: './secrets.env' });

const foederLoginEmail = process.env.foederLoginEmail;
const foederLoginPassword = process.env.foederLoginPass;

test('login', async ({page}) => {
    await page.goto('https://localhost:5173/');
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