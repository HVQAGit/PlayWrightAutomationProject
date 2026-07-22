import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import dotenv from 'dotenv';



import path from 'path';




export class loginPage extends BasePage{
//private  locators 


private readonly email:Locator;  // locator is type of the variable
private readonly password:Locator;
private readonly continuebtn:Locator;
private readonly Logoutbtn:Locator;
private readonly Logoutlink:Locator;
private readonly HomePageBtn:Locator;
private readonly LogoutXpath:Locator;
private readonly LogoutAltText:Locator; 
private readonly ResellerReqTab:Locator;
private readonly ResellerReqTab2:Locator;
private readonly LoginPageAfterLogout:Locator;

constructor(page:Page){  // //constructor is public because to allow other/external file to create object 
    super(page)    // by mentioning super we are telling to call parent class constructor
    this.email=page.getByRole('textbox', {name:'Email address'});
    this.password=page.getByRole('textbox',{name:'Password'});
   // this.Logoutbtn=page.getByRole('img', { name: 'NewHitachiVantaraLogo' });
     this.Logoutbtn=page.getByRole('img', { name: 'xGS Demo CPQDEMOQA' });
     this.HomePageBtn=page.getByRole('img', { name: 'NewHitachiVantaraLogo' });
    this.LogoutXpath=page.locator(`//img[@class='MuiAvatar-img hv-1hy9t21']`)
   
    this.Logoutlink=page.getByRole('link', { name: 'Logout' })
    this.continuebtn=page.getByRole('button', { name: 'Continue', exact: true });
    this.LogoutAltText=page.getByRole('option').getByAltText('Logout');
    this.ResellerReqTab=page.getByText('Reseller Requests', { exact: true });
    this.ResellerReqTab2=page.locator("//span[text()='Reseller Requests']");
    this.LoginPageAfterLogout=page.getByRole('button', { name: 'Continue', exact: true });
    
   
}


async goToLoginPage():Promise<void> {

   
   
  await this.page.goto(process.env.BASE_URL_YML!);

   
}

async getLoginPageTitle():Promise<string>{

 return await this.page.title();


}

//process.env.USERNAME!
async performDoLogin(username : string, password : string ){


  const usernameStr: string = String(process.env.USERNAME_YML!); 
  const passwordStr: string = String(process.env.PASSWORD_YML); 
   console.log('usernameStr===');
   console.log(`Current Username: ${usernameStr}`);

   
 //console.log(`user creds: ${username}:${password}`);
 //await this.email.fill(username);
 await this.email.fill(usernameStr);
 await this.continuebtn.click();
 //await this.password.fill(password);
 await this.password.fill(passwordStr);
 await this.continuebtn.click();
 
}

async performDoLogout( ){
 
    await this.Logoutbtn.click();
    await this.Logoutlink.click();
    //await this.page.waitForURL('https://auth-stage.hitachivantara.com/');
   // const Tabstext: string = await this.ResellerReqTab2.textContent() ?? "";
      const LoginPageAfterLogoutText: string = await this.LoginPageAfterLogout.textContent() ?? "";
    console.log(`Home Page Button After Logout: ${LoginPageAfterLogoutText}`);
  
}

async ClickHomePageButton():Promise<string>{
 
  //  return await this.HomePageBtn.getByTitle();
    await this.HomePageBtn.click();
    return await this.page.title();
  
  
}
async ClickResellerRequestsTab(){
 
  
     
   this.ResellerReqTab2.click();
   this.ResellerReqTab2.allTextContents();
   this.page.pause();
   
  
// 2. Extract and store the text as a string
const Tabstext: string = await this.ResellerReqTab2.textContent() ?? "";

// 3. You can now use or print your string variable
console.log(`Stored String Value: ${Tabstext}`);

}





}

