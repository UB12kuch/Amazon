'use strict';
let webdriver = require('selenium-webdriver');
let {
    describe,
    it,
    after,
} = require('selenium-webdriver/testing');
let By = webdriver.By;
let until = webdriver.until;
let browser;
let amazon = require('./../controls/amazonProduct.js');
let chai = require('chai');
let assert = chai.assert;
chai.use(require('chai-string'));
let waitTime = 2000;

describe('navigate to www.amazon.co.uk and add the following books to Amazon basket', function () {
    this.timeout(50000);

    var chromeCapabilities = webdriver.Capabilities.chrome();
    //setting chrome options to start the browser fully maximized
    var chromeOptions = {
        'args': ['--start-fullscreen']
    };
    chromeCapabilities.set('chromeOptions', chromeOptions);
    browser = new webdriver.Builder().withCapabilities(chromeCapabilities).build();
    browser.get('https://www.amazon.co.uk/');
    let azProducts = new amazon(browser);
    let book1 = 'Experiences of Test Automation: Case Studies of Software Test Automation'
    let book2 = 'Agile Testing: A Practical Guide for Testers and Agile Teams'
    let book3 = 'Selenium WebDriver 3 Practical Guide: End-to-end automation testing for web and mobile browsers with Selenium WebDriver, 2nd Edition'
    let runs = [
        book1,
        book2,
        book3
    ]
    runs.forEach(function (run) {
        it("should search and add "+ run +" to basket", function (done) {
        azProducts.searchBook(run).then(function (element) {
            azProducts.addBook(element).then(function (message) {
                assert.equal('book added to the basket',message);
                 done();
            }, function (message) {
                 assert.equal('could not add book to basket',message);
            });
        }, function (message) {
            assert.equal('could not found the book ' + run,message);
        });
        })
    });
    it("it should list all books in Edit basket", function () {
      let editBasket = browser.wait(until.elementLocated(By.xpath("//div[contains(@id,'huc-v2-order-row-container')]//a[contains(text(),'Edit basket')]")));
    editBasket.click().then(function () {
       let subTotalElement = browser.wait(until.elementLocated(By.xpath("//span[@id='sc-subtotal-label-activecart']")));
        subTotalElement.getText().then(function(text){
            assert.startsWith(text,'Subtotal (3 items):'); 
        });
    })
    })
    it("Edit basket, it should save "+ book1 +" for later", function (done) {
      let saveForLater = browser.wait(until.elementLocated(By.xpath("//input[contains(@aria-label,'Save for later " + book1 + "')]"))) //.book1));
        saveForLater.click().then(function () {
        let savedBook = browser.wait(until.elementLocated(By.xpath("//*[@id='savedCartViewForm']//a//span[contains(text(),'"+book1+"')]")));
        savedBook.getText().then(function(text){
           assert.equal(book1,text);
            done();
        })    
    });
    })
    
    it("Edit basket, it should delete "+book2+" book", function (done) {
      let deleteBook = browser.wait(until.elementLocated(By.xpath("//input[contains(@aria-label,'Delete " + book2 + "')]")));
         browser.sleep(waitTime);
         deleteBook.click().then(function () {
            
             let navCart = browser.wait(until.elementLocated(By.id("nav-cart-count")));
              navCart.getText().then(function (count) {
                assert.equal("2", count);
                   done();
            });
        });
    })

   

    it("Edit basket, it should set quantity to three for "+book3, function (done) {
        browser.sleep(waitTime);
        var xx =  browser.wait(until.elementLocated(By.xpath("//form[@id='activeCartViewForm']//span[@class='a-button-text a-declarative']")))//form[@id='activeCartViewForm']//select")))
        browser.wait(until.elementIsEnabled(xx));
        xx.click();
        let quantityButton  = browser.wait(until.elementLocated(By.xpath("//form[@id='activeCartViewForm']//select//option[contains(text(),3)]")));
     
        quantityButton.click().then(function(){
              
               //until.elementTextIs 
               browser.wait(until.elementTextMatches(By.xpath("//span[@id='sc-subtotal-label-activecart']"),/(3 items)/));
               let subTotalElement = browser.wait(until.elementLocated(By.xpath("//span[@id='sc-subtotal-label-activecart']")));
              // 
              subTotalElement.then(()=>{
                    subTotalElement.getText().then(function(text){
                       //expect(element.getText()).toEqual("3 items");
                        assert.startsWith(text,'Subtotal (3 items):'); 
                         done();
                });
            });
                
            });
       
    })
    
    it("Edit basket, it should mark book 3 as a gift item", function (done) {
        let giftCheckBox  = browser.wait(until.elementLocated(By.xpath("//form[@id='activeCartViewForm']//div[contains(@class,'a-checkbox sc-gift-option')]//input")));
           browser.sleep(waitTime);
              giftCheckBox.click().then(function(){
                  giftCheckBox.isSelected().then(function(bool){
                      assert.equal(bool,true); 
                       done();
                  });
          });
         
      })
    
    it("Edit basket, it should delete book 3 ", function (done) {
      let deleteBook = browser.wait(until.elementLocated(By.xpath("//input[contains(@aria-label,'Delete " + book3 + "')]")));
         browser.sleep(waitTime);
         deleteBook.click().then(function () {
             
             let navCart = browser.wait(until.elementLocated(By.id("nav-cart-count")));
              navCart.getText().then(function (count) {
                assert.equal("0", count);
                  done();
            });
        });
    })
    after(function () {
        setTimeout(function () {
        driver.quit();
    }, waitTime);

})

});
