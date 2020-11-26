const Url = require("../models/url");
const validator = require("validator");
const adler32 = require("adler32");

exports.shorturl_get = async function(req, res, next) {
    
    const shortUrl = req.params.short_url;

    const existingUrl = await Url.findOne({
        short_url: shortUrl
    });

    if(existingUrl) {

        res.redirect(existingUrl.original_url);

    } else {

        next();

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
                {
                    _id: 0,
                    original_url: 1,
                    short_url: 1
                }
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
            res.status(500).json({
                "error": "unexpected error"
            });
        }

    } else {

        res.status(400).json({
            "error": "invalid url"
        });

    }
    
}