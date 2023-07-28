const scrapper = (config: any) => {
    console.log("🚀 ~ file: scrapper.js ~ line 2 ~ scrapper ~ config", config);
    let dataSet;
    dataSet = Array.from(document.querySelectorAll(config.wrapper)).map(
      (htmlElem, index) => {
        let elemData: any = {};
        for (const key in config) {
          if (config[key] && typeof config[key] == "object") {
            elemData[key] = getElemData(htmlElem, config[key]);
          }
        }
        elemData["key"] = index;
        return elemData;
      }
    );
  };
  
  const getElemData = (htmlElem: any, elemConfig: any) => {
    const elem =
      elemConfig.nth == 0
        ? htmlElem
        : htmlElem.querySelector(elemConfig.selector);
    if (!elem) {
      return null;
    }
  
    switch (elemConfig.type) {
      case "text":
        return elem.innerText?.length ? elem.innerText : null;
      case "attribute":
        return elem.getAttribute(elemConfig.attribute);
      case "html":
        return elem;
      case "node":
        return elem;
      default:
        throw new Error(
          "Unspecified type for element data. It must be either text or attribute"
        );
    }
  };
  