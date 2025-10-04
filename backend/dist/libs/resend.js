"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendClient = void 0;
const resend_1 = require("resend");
const config_1 = require("../config/config");
exports.resendClient = new resend_1.Resend(config_1.resend_api_key);
// (async function () {
//   const { data, error } = await resend.emails.send({
//     from: 'Acme <onboarding@resend.dev>',
//     to: ['delivered@resend.dev'],
//     subject: 'Hello World',
//     html: '<strong>It works!</strong>',
//   });
//   if (error) {
//     return console.error({ error });
//   }
//   console.log({ data });
// })();
