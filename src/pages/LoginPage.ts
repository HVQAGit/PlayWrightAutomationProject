import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import dotenv from 'dotenv';



import nodemailer from 'nodemailer';
import fs from 'fs';
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
    super(page)   // // by mentioning super we are telling to call parent class constructor
    this.email=page.getByRole('textbox', {name:'Email address'});
    this.password=page.getByRole('textbox',{name:'Password'});
   // this.Logoutbtn=page.getByRole('img', { name: 'NewHitachiVantaraLogo' });
     //this.Logoutbtn=page.getByRole('img', { name: 'xGS Demo CPQDEMOQA' });
      this.Logoutbtn=page.getByRole('button', { name: '<img src=x onerror=alert(\'' });
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
  
 //await this.page.goto(process.env.BASE_URL!);

   
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


 
  
  async  sendEmailReport() {
    console.log("inside sendemil");
  // 1. Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
  
   // host: process.env.SMTP_HOST,
    host: "smtp.gmail.com",
   // port: parseInt(process.env.SMTP_PORT || '587'),
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      //user: process.env.SMTP_USER,
      //pass: process.env.SMTP_PASS,

      user: "jenkins.frameworkdemo@gmail.com",
      pass: "mfbiolihnawimdhs",

    },
  });
  
  const __dirname = 'reports/';
  const reportPath = path.join(__dirname, 'html-report', 'index.html');

  const inlineHtmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #1a73e8; margin-top: 0;">Playwright Test Execution Summary</h2>
      <p style="font-size: 14px; color: #333;">The automated test suite has finished executing.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <thead>
          <tr style="background-color: #f8f9fa; border-bottom: 2px solid #dee2e6;">
            <th style="padding: 10px; text-align: left; font-size: 13px; color: #495057;">Metric</th>
            <th style="padding: 10px; text-align: left; font-size: 13px; color: #495057;">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #dee2e6;">
            <td style="padding: 10px; font-size: 14px; color: #212529;">Overall Suite Result</td>
            <td style="padding: 10px; font-size: 14px; font-weight: bold; color: #28a745;">PASSED</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;

  // 2. Define Email layout options
  const mailOptions = {
    //from: `"Playwright Automation" <${process.env.SMTP_USER}>`,
    from: `"Playwright Automation" jenkins.frameworkdemo@gmail.com`,

   
   // to: process.env.EMAIL_TO,
    to: "jenkins.frameworkdemo@gmail.com",
    subject: `Playwright Test Execution Report - ${new Date().toLocaleDateString()}`,
   
    html: inlineHtmlContent,
    

    attachments: fs.existsSync(reportPath) ? [
      {
        //filename: 'playwright-report.html',
        filename: 'index.html',
        path: reportPath,
      }
    ] : [],
  };

  // 3. Send out the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email report sent successfully: %s', info.messageId);
  } catch (error) {
    console.error('❌ Failed to send email report:', error);
  }
}







}

