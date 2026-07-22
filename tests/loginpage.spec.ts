

import { test, expect } from '@playwright/test';
import { loginPage} from '../src/pages/LoginPage';
import { asyncWrapProviders } from 'node:async_hooks';
import dotenv from 'dotenv';
import 'dotenv/config';
import path from 'path';

let LoginPage:loginPage;

test('login page test',async({page})=>{

let LoginPage = new loginPage(page);


//
//console.log('Env Variable Value inside login spec', process.env); 
await LoginPage.goToLoginPage();
await LoginPage.getLoginPageTitle();
const pageTitle=await LoginPage.getLoginPageTitle();
console.log('login page Title', pageTitle);
const username: string = process.env.USER_NAME!;
const password: string = process.env.PASSWORD!;

console.log("*******************checking in login spec file start ****************");
console.log("USER_NAME=");
console.log(username);
console.log("PASSWORD=");
console.log(password);
console.log("*******************checking in login spec file end****************");



//await LoginPage.performDoLogin('metal-leather@5t4sxhkg.mailosaur.net','Hitachi#123');
await LoginPage.performDoLogin(process.env.USER_NAME! ,process.env.PASSWORD!);
//expect(pageTitle).toBe('Hitachi Vantara xGS TEST');
expect(pageTitle).toContain('Hitachi Vantara xGS TEST');
await page.pause();
//LoginPage.performDoLogout();
LoginPage.ClickResellerRequestsTab();

// remove comment

await page.waitForTimeout(15000); 
});
