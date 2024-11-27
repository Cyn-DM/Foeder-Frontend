export const login = async (page, foederLoginEmail, foederLoginPassword) => {
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
}