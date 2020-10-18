export default class BannerExpandable {

    /**
     * Constructor of the Module
     * 
     * @param {string} divId Name of the div where the banner will be display
     * @param {array} ressources The 2 ressources, 1rst:small-image / 2nd:big-image
     * @param {object} options List of options wich could be initialize
     */
    constructor(divId, ressources, options=null) {
        this.divId = divId;
        this.ressources = ressources;
        this.options = options || {
            "elastic": false,
            "duration-animation": 1
        };

        this.nodeDivId = document.getElementById(this.divId);
        this.idBannerImg = "banner__img";

        this.imagesInfo = {
            "small": {
                "width": null,
                "height": null,
                "node": null
            },
            "big": {
                "width": null,
                "height": null,
                "node": null
            }
        }

        this.ratioInfo = {
            "ratio": null,
            "smallHeight": null,
            "bigHeight": null
        };

        this.listOfClass = {
            INCREASE: "increase",
            DECREASE: "decrease"
        };
        
        this.ressourcesValidation();
        this.createBanners();
        this.setEventListener();
        this.setCssTransformation();
    }

    /**
     * Checks if the arguments passed in the constructor are correct
     */
    ressourcesValidation() {
        if (typeof this.divId !== "string") {
            throw new Error("'divId' must be to type 'string'");
        }
        if (this.divId.length <= 0) {
            throw new Error("'divId' must contain at least 1 character");
        }

        if (!Array.isArray(this.ressources)) {
            throw new Error("'ressources' must be to type 'array'");
        }
        if (this.ressources.length !== 2) {
            throw new Error("'ressources' must contain exactly 2 items, 1rst: small_image - 2nd: big_image");
        }

        if (this.options
            && (Array.isArray(this.options) || typeof this.options === 'string')
            ) {
            throw new Error("'options' must be to type 'object'");
        }
        if (this.options
            && (Object.keys(this.options).length <= 0 || Object.keys(this.options).length === undefined)
            ) {
            throw new Error("'options' can't be empty");
        }

        this.setOptionsInfo();
    }

    /**
     * Set all options if defined, otherwise set default options
     */
    setOptionsInfo() {
        if (this.options["duration-animation"]) {
            this.options["duration-animation"] = this.options["duration-animation"];
        } else {
            this.options["duration-animation"] = 1;
        }

        if (this.options["elastic"]) {
            this.options["elastic"] = this.options["elastic"];
        } else {
            this.options["elastic"] = false;
        }
    }

    /**
     * Create the two banners with all styles needed
     */
    createBanners() {
        let index = 0;
        
        for (let key of Object.keys(this.imagesInfo)) {
            this.imagesInfo[key]["node"] = document.createElement("img");
            this.imagesInfo[key]["node"].src = this.ressources[index];
            this.imagesInfo[key]["node"].setAttribute("id", this.idBannerImg);
            this.imagesInfo[key]["node"].style.width = "100%";
            this.setDimensionInformations(this.imagesInfo[key]["node"], index);
            index++;
        }

        this.setRatioInformations();

        this.nodeDivId.style.overflow = "hidden";
        this.nodeDivId.appendChild(this.imagesInfo["small"]["node"]);
    }

    /**
     * Define all the dimensions of images
     * 
     * @param {HTMLElement} imgElement Image element
     * @param {number} index Image index in ressource's tab
     */
    setDimensionInformations(imgElement, index) {
        if (index === 0) {
            this.imagesInfo["small"]["height"] = imgElement.naturalHeight;
            this.imagesInfo["small"]["width"] = imgElement.naturalWidth;
        } else {
            this.imagesInfo["big"]["height"] = imgElement.naturalHeight;
            this.imagesInfo["big"]["width"] = imgElement.naturalWidth;
        }
    }

    /**
     * Calcule the ratio of image and set the height
     */
    setRatioInformations() {
        this.ratioInfo["ratio"] = (this.nodeDivId.offsetWidth / this.imagesInfo["small"]["width"]).toFixed(2);
        this.ratioInfo["smallHeight"] = (this.imagesInfo["small"]["height"] * this.ratioInfo["ratio"]).toFixed(2);
        this.ratioInfo["bigHeight"] = (this.imagesInfo["big"]["height"] * this.ratioInfo["ratio"]).toFixed(2);
    }

    /**
     * Add the event on the banners when mouse over and out
     */
    setEventListener() {
        this.imagesInfo["small"]["node"].addEventListener("mouseover", () => {
            if (this.options["elastic"]) {
                document.getElementById(this.idBannerImg).src = this.ressources[1];
                (this.imagesInfo["small"]["node"].classList) ? this.imagesInfo["small"]["node"].classList.remove(this.listOfClass["DECREASE"]) : "";
                this.imagesInfo["small"]["node"].classList.add(this.listOfClass["INCREASE"]);
            } else {
                document.getElementById(this.idBannerImg).src = this.ressources[1];
                let value = (this.nodeDivId.offsetWidth / this.imagesInfo["small"]["width"]).toFixed(2);
                this.nodeDivId.style.height = (this.imagesInfo["small"]["height"] * value) + "px";
                (this.nodeDivId.classList) ? this.nodeDivId.classList.remove(this.listOfClass["DECREASE"]) : "";
                this.nodeDivId.classList.add(this.listOfClass["INCREASE"]);
            }
        });

        this.imagesInfo["small"]["node"].addEventListener("mouseout", () => {
            if (this.options["elastic"]) {
                (this.imagesInfo["small"]["node"].classList) ? this.imagesInfo["small"]["node"].classList.remove(this.listOfClass["INCREASE"]) : "";
                this.imagesInfo["small"]["node"].classList.add(this.listOfClass["DECREASE"]);
                
                let timeOut = setTimeout( () => {
                    document.getElementById(this.idBannerImg).src = this.ressources[0];
                    clearTimeout(timeOut);
                }, this.options["duration-animation"] * 1000);
            } else {
                (this.nodeDivId.classList) ? this.nodeDivId.classList.remove(this.listOfClass["INCREASE"]) : "";
                this.nodeDivId.classList.add(this.listOfClass["DECREASE"]);
                let timeOut = setTimeout( () => {
                    document.getElementById(this.idBannerImg).src = this.ressources[0];
                    clearTimeout(timeOut);
                }, this.options["duration-animation"] * 1000);
            }
        });
    }

    /**
     * Create Stylesheet with banner's animations
     */
    setCssTransformation() {
        let styles  = `
            .${this.listOfClass["INCREASE"]} {
                animation: ${this.options["duration-animation"]}s;
                animation-name: increase-banner;
                animation-fill-mode: forwards;
            }
            @keyframes increase-banner {
                from {
                    height: ${this.ratioInfo["smallHeight"]}px;
                }
                to {
                    height: ${this.ratioInfo["bigHeight"]}px;
                }
            }

            .${this.listOfClass["DECREASE"]} {
                animation: ${this.options["duration-animation"]}s;
                animation-name: decrease-banner;
                animation-fill-mode: forwards;
            }
            @keyframes decrease-banner {
                from {
                    height: ${this.ratioInfo["bigHeight"]}px;
                }
                to {
                    height: ${this.ratioInfo["smallHeight"]}px;
                }
            }
        `;

        let myStyleSheet = document.createElement("style")
        myStyleSheet.type = "text/css"
        myStyleSheet.innerText = styles
        document.head.appendChild(myStyleSheet)
    }

};