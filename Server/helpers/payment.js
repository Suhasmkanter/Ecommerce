require('dotenv').config();
const paypal = require("paypal-rest-sdk");

paypal.configure({
    mode: 'sandbox', // 'sandbox' or 'live'
    client_id: "AYyqXfRMfTuBYqCXkPpxsSLoco3Hz6kdpWZnGcS0NNNtZa30_hGkqKKPGwhmMP6QbXMobJGLfoBVWpgc",
    client_secret: "EBET8Rcnc5ux2QP_d_JYiPCgI7MIui_TtVk9nBdC3K3ZcwHbXrumDbJD_ahupSeIqwR6K_lHz4dFh3ha"
});

module.exports = paypal;