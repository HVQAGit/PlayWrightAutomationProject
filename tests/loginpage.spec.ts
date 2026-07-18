

import { test, expect } from '@playwright/test';
import { loginPage} from '../src/pages/LoginPage';
import { asyncWrapProviders } from 'node:async_hooks';

let LoginPage:loginPage;



test('login page test',async({page})=>{

let LoginPage = new loginPage(page);
await LoginPage.goToLoginPage();
await LoginPage.getLoginPageTitle();
const pageTitle=await LoginPage.getLoginPageTitle();
console.log('login page Title', pageTitle);
await LoginPage.performDoLogin('metal-leather@5t4sxhkg.mailosaur.net','Hitachi#123');

//expect(pageTitle).toBe('Hitachi Vantara xGS TEST');
expect(pageTitle).toContain('Hitachi Vantara xGS TEST');
await page.pause();
//LoginPage.performDoLogout();
LoginPage.ClickResellerRequestsTab();



await page.waitForTimeout(15000); 
});
