export const login = async (page, foederLoginEmail, foederLoginPassword) => {

    let docker = false;
    docker = Boolean(import.meta.env.VITE_DOCKER);
    let backendUrl;
    if (docker) {
        backendUrl =  'https://backend:7058/api';
    } else {
        backendUrl =  'https://localhost:7058/api';
    }
    await page.goto(backendUrl);
    await page.waitForTimeout(2000);
    const page1Promise = page.waitForEvent('popup', {});
    const lang = await page.locator('html').getAttribute('lang');


    await page.locator('iframe[title*="Google"]').contentFrame().getByRole('button').click();


    await page.waitForLoadState('networkidle');
    const page1 = await page1Promise;
    await page1.getByLabel('Email or phone').click();
    await page1.getByLabel('Email or phone').fill(foederLoginEmail);
    await page1.getByRole('button', { name: 'Next' }).click();
    await page1.getByLabel('Enter your password').click();
    await page1.getByLabel('Enter your password').fill(foederLoginPassword);
    await page1.getByRole('button', { name: 'Next' }).click();
    await page1.getByRole('button', { name: /Doorgaan|Next/ }).click();
}



export const loginFoeder = async (page) => {
    await page.goto('https://localhost:5173/');
    await page.waitForTimeout(2000);
    const page1Promise = page.waitForEvent('popup');

    await page.locator('iframe[title*="Google"]').contentFrame().getByRole('button').click();


    const page1 = await page1Promise;

    await page1.waitForSelector('[role="link"][data-identifier="testfoeder@gmail.com"]');
    await page1.getByRole('link', { name: 'TestAccount testfoeder@gmail.' }).click();
    await page1.getByRole('button', { name: 'Doorgaan' }).click();
}