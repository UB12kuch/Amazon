let webdriver = require('selenium-webdriver');
By = webdriver.By;
until = webdriver.until;

function Products(){
var that = this;
let browser;
this.addBook = function(browser,book){
    browser = browser;
    if(browser == null || browser == undefined){
        console.log('browser object is not defined......')
        return false;
    }
    if(book == null || book == undefined || book == ""){
        console.log('book is not specifed')
        return false;
    }
   
    browser.findElement(By.id("twotabsearchtextbox")).sendKeys(book).then(function(){
        browser.findElement(By.xpath("//*[@value='Go']")).click().then(function(){

let book1Element = browser.wait(until.elementLocated(By.xpath("//a[contains(@title,'"+book+"')]")))
let bookTitle;

book1Element.getText().then(function(title){
    bookTitle = title;
    console.log(bookTitle);
    book1Element.click().then(function(){
        browser.wait(until.elementLocated(By.xpath("//div[contains(@class,'a-modal-scroller a-declarative')]")),6000).then(function(element1){
        browser.wait(until.elementIsVisible(element1)).then(function(){
          console.log('enabled ...dimmable item..')
            //a-modal-scroller a-declarative
            var popup = browser.wait(until.elementLocated(By.xpath("//div[contains(@class,'a-popover-wrapper')]")));
                popup.then(function(){
                 console.log('popup appeared....');
                    browser.wait(until.elementLocated(By.xpath("//span[contains(@id ,'p2dPopoverID-no-button')]//input[contains(@class,'a-button-input')]")));
                //browser.wait(until.elementIsVisible(popup));
                   //browser.executeScript("document.getElementById('p2dPopoverID-no-button').click()").then(function(){
                   element1 = browser.wait(until.elementLocated(By.xpath("//header[contains(@class,'a-popover-header')]/button")))//span[contains(@id ,'p2dPopoverID-no-button')]")));
                   element1.click().then(function(){
                                console.log('poupup closed. ')
                                    let dimmableElement = browser.wait(until.elementLocated(By.id('a-popover-lgtbox')))//"//div[contains(@class,'a-modal-scroller a-declarative')]"))); 
                                            browser.wait(until.elementIsNotVisible(dimmableElement)).then( () => {
                                                console.log('dimmable gone....');
                                                let addButton = browser.wait(until.elementLocated(By.id("add-to-cart-button")));
    browser.wait(until.elementIsVisible(addButton)).then( () => {
         addButton.click().then(function(){  
              console.log(' book added to the basket'); 
            


     })
 })

                            });

                })
            });

        })
    },function(){
        console.log('no popup manchi nayalaaa...');
        let addButton = browser.wait(until.elementLocated(By.id("add-to-cart-button")));
        browser.wait(until.elementIsVisible(addButton)).then( () => {
             addButton.click().then(function(){  
                  console.log(' book added to the basket'); 
                
    
    
         })
     })
        return true;
    });
});
});
});



})
}

this.addToCart = function(){
    let addButton = browser.wait(until.elementLocated(By.id("add-to-cart-button")));
    browser.wait(until.elementIsVisible(addButton)).then( () => {
         addButton.click().then(function(){  
              console.log(' book added to the basket'); 
            


     })
 })
}

}

module.exports = new Products();