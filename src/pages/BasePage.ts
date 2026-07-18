import { Page } from "@playwright/test";

export class BasePage{

protected readonly page: Page;  // import to resolve error
                                // portected, so the only methods within this class
                                // or child of the Baseclass can access this reference 

constructor (page:Page){

    this.page=page;
}

}