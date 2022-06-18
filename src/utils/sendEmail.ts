// import Mailgun from "mailgun.js";
// import formData from "form-data";

import UniSender from "unisender"

const uniSender = new UniSender({
    api_key: process.env.UNISENDER_API_KEY,
    lang: 'ru'
})



// const mailGun = new Mailgun(formData)

// const mg = mailGun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || '' });


const sendEmail = (subject: string, html: string) => {
    // const emailData = {
    //     from: "rigidum.by@gmail.com",
    //     to: "rigidum.by@gmail.com",
    //     subject,
    //     html
    // }
    const emailData = {
        email: "rigidum.by@gmail.com",
        sender_name: "TestNuber",
        sender_email: "rigidum.by@gmail.com",
        subject,
        body: html,
        list_id: 1
    }
    uniSender.sendEmail(emailData)

    // return mg.messages.create(process.env.MAILGUN_DOMAIN || "", emailData)
}

export const sendVerificationEmail = (fullName: string, key: string) => {
    const emailSubject = `Hello ${fullName}, please verify your email`;
    const emailBody = `Verify yuor email by code ${key} `

    return sendEmail(emailSubject, emailBody)
}


// from: fromEmail,
// to: toEmails,
// subject: 'Hello',
// html: '<img src="cid:mailgun.png" width="200px"><br><h3>Testing some Mailgun awesomness!</h3>',
// text: 'Testing some Mailgun awesomness!',
// inline: [mailgunLogo],
// attachment: [rackspaceLogo]