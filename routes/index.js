const router = require("express").Router();
const urlController = require("../controllers/urlController");

// Get redirected trough shortened url
router.get("/:short_url", urlController.shorturl_get);

// Post url to be shortened
router.post("/new", urlController.shorturl_post);

module.exports = router;
