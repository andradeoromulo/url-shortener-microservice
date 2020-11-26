const Url = require("../models/url");
const validator = require("validator");
const adler32 = require("adler32");

exports.shorturl_get = async function(req, res) {
    
    const shortUrl = req.params.short_url;

    const existingUrl = await Url.findOne({
        short_url: shortUrl
    });

    if(existingUrl) {

        res.redirect(existingUrl.original_url);

    } else {

        res.send("No such url");

    }

};

exports.shorturl_post = async function(req, res) {

    const urlInput = req.body.url;

    const validUrl = validator.isURL(urlInput, {
        require_protocol: true
    });

    if(validUrl) {

        try {

            let responseJson;
    
            const existingUrl = await Url.findOne(
                {
                    original_url: urlInput
                },
                "original_url short_url"
            );
        
            if(existingUrl) {
                
                responseJson = existingUrl;
            
            } else {
    
                const urlData = Buffer.from(urlInput);
                const hash = adler32.sum(urlData);

                responseJson = {
                    original_url: urlInput,
                    short_url: String(hash)
                };
    
                await Url.create(
                    responseJson, 
                    (err, urlObj) => {
                        if(err)
                            throw new Error(err);
                    }
                );
            
            }

            res.json(responseJson);

        } catch(err) {
            console.log(err);
        }

    } else {

        res.json({
            "error": "invalid url"
        });

    }
    
}