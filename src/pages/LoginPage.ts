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
    
   
}


async goToLoginPage():Promise<void> {

    console.log("BASE_URL==");
   console.log(process.env.BASE_URL!.length);
   console.log("BUSERNAME==");
   console.log(process.env.USERNAME!.length);
   console.log("PASiSWORD==");
   console.log(process.env.PASSWORD!.length);
      
  
   
  await this.page.goto(process.env.BASE_URL!);

   
}

async getLoginPageTitle():Promise<string>{

 return await this.page.title();


}

//process.env.USERNAME!
async performDoLogin(username : string, password : string ){


  const usernameStr: string = String(process.env.USERNAME); 
  const passwordnameStr: string = String(process.env.USERNAME); 
   console.log('usernameStr===');
   console.log(`Current Username: ${usernameStr}`);

   
 //console.log(`user creds: ${username}:${password}`);
 //await this.email.fill(username);
 await this.email.fill(usernameStr);
 await this.continuebtn.click();
 //await this.password.fill(password);
 await this.password.fill(passwordnameStr);
 await this.continuebtn.click();
 
}

async performDoLogout( ){
 
    await this.Logoutbtn.click();
  
     //comments

    await this.Logoutlink.click();
    await this.page.waitForURL('https://auth-stage.hitachivantara.com/');
  
  
  
}

async ClickHomePageButton():Promise<string>{
 
  //  return await this.HomePageBtn.getByTitle();
    await this.HomePageBtn.click();
    return await this.page.title();
  
  
}
async ClickResellerRequestsTab(){
 
  //  return await this.HomePageBtn.getByTitle();
 //   await this.ResellerReqTab.innerText();
   // return await this.ResellerReqTab.innerText();

    // const TabName = await this.ResellerReqTab.click();//  Pauses until the title string returns
     //console.log('TabName:', TabName); 
     
   this.ResellerReqTab2.click();
      this.ResellerReqTab2.allTextContents();
   //this.ResellerReqTab2.getByTitle();
   //console.log('ResellerReqTab2:',this.ResellerReqTab2.getByTitle("Reseller Requests")); 
   this.page.pause();
   //span[text()='Reseller Requests']
  
}





}

