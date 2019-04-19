import * as assert from "power-assert"
import ip from 'ip';
import express from 'express';
import webdriver, {promise, WebElement} from 'selenium-webdriver';
import getPort from 'get-port';
import * as http from 'http';

function sleep(millis: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, millis));
}

async function hasUsedPort(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = http.createServer();
    server.on('error', () => {
      resolve(true);
    });
    server.listen(port,  '0.0.0.0', () => {
      server.close();
      resolve(false);
    });
  });
}

/**
 * Create server and driver
 */
async function createServerAndDriver(): Promise<{server: http.Server, serverPort: number, driver: webdriver.WebDriver}> {

  const driverPort = 4444;
  if(!await hasUsedPort(driverPort)) {
    throw new Error(`Driver is not running on ${driverPort}\nYou can run a driver by \`docker run --rm -it -p 4444:4444 -p 5901:5900 selenium/standalone-chrome-debug:3.141.59\``);
  }

  // Console log setting
  // (from: https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/lib/logging.html)
  const prefs = new webdriver.logging.Preferences();
  prefs.setLevel(webdriver.logging.Type.BROWSER, webdriver.logging.Level.DEBUG);
  const caps = webdriver.Capabilities.chrome();
  caps.setLoggingPrefs(prefs);

  const driver: webdriver.WebDriver = await new webdriver.Builder()
    .usingServer(`http://localhost:${driverPort}/wd/hub`)
    .withCapabilities(caps)
    .build();

  const serverPort = await getPort();
  const app = express();
  app.use(express.static('./dist'));
  const server = app.listen(serverPort);

  return {
    server: server,
    serverPort: serverPort,
    driver: driver
  }
}


function getInputTextarea(driver: webdriver.WebDriver): promise.IThenable<WebElement>  {
  return driver.findElement(webdriver.By.xpath(`//*[@id="app"]/div/form[3]/textarea[1]`));
}

function getOutputTextarea(driver: webdriver.WebDriver): promise.IThenable<WebElement>  {
  return driver.findElement(webdriver.By.xpath(`//*[@id="app"]/div/form[3]/textarea[2]`));
}

describe('Nipp', () => {
  it('display page title from URL fragment', async () => {
    // Create server and driver
    const {server, serverPort, driver} = await createServerAndDriver();

    const url = `http://${ip.address()}:${serverPort}#Text_Length//K9YrzqxKBQA=`;
    await driver.get(url);
    const title = await driver.getTitle();
    assert.strictEqual(title, "Text Length");

    await new Promise(resolve => server.close(resolve));
    await driver.quit();
  });

  it('calculate text-length', async () => {
    // Create server and driver
    const {server, serverPort, driver} = await createServerAndDriver();

    const url = `http://${ip.address()}:${serverPort}#Text_Length//K9YrzqxKBQA=`;
    await driver.get(url);

    // Input a text
    const inputTextarea = await getInputTextarea(driver);
    inputTextarea.sendKeys("hello, world");

    // Get output
    const outputTextarea = await getOutputTextarea(driver);
    const outputText: string = await outputTextarea.getAttribute("value");

    // Output should be 12
    assert.strictEqual(outputText, "12");

    await new Promise(resolve => server.close(resolve));
    await driver.quit();
  });
});
