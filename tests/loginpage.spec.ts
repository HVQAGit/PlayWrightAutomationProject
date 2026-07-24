

import { test, expect } from '@playwright/test';
import { loginPage} from '../src/pages/LoginPage';
import { asyncWrapProviders } from 'node:async_hooks';
import dotenv from 'dotenv';
import 'dotenv/config';
import path from 'path';

let LoginPage:loginPage;

test('login page test',async({page})=>{

let LoginPage = new loginPage(page);



//console.log('Env Variable Value inside login spec', process.env); 
await LoginPage.goToLoginPage();
await LoginPage.getLoginPageTitle();
const pageTitle=await LoginPage.getLoginPageTitle();
console.log('login page Title', pageTitle);
const username: string = process.env.USERNAME_YML!;
const password: string = process.env.PASSWORD_YML!;
//


await LoginPage.performDoLogin(process.env.USERNAME_YML! , process.env.PASSWORD_YML!);
//expect(pageTitle).toBe('Hitachi Vantara xGS TEST');
expect(pageTitle).toContain('Hitachi Vantara xGS TEST');
await page.pause();
//LoginPage.performDoLogout();
LoginPage.ClickResellerRequestsTab();
LoginPage.performDoLogout();
LoginPage.sendEmailReport();

// remove comment

await page.waitForTimeout(15000); 
});
